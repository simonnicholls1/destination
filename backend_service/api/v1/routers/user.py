from typing import List
from fastapi import status, HTTPException, Depends, APIRouter, Request
from sqlalchemy.orm import Session
from backend_service.core import utils
from backend_service.core.data import models, schemas
from backend_service.core.security import oauth2, confirmation_tokens
from backend_service.core.data.database import get_db
from datetime import datetime
from backend_service.core.services.mail import Emailer
from backend_service.config import settings

router = APIRouter(
    prefix="/users",
    tags=['Users']
)


# /users/
# /users


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserCreated)
def create_user(request: Request, user: schemas.UserCreate, db: Session = Depends(get_db)):
    # hash the password - user.password
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send confirmation email
    year = str(datetime.today().year)
    token = confirmation_tokens.generate_confirmation_token(user.email)
    confirmation_url = str(request.url) + 'confirm/' + token
    template_content = {'year': year, 'confirmation_url': confirmation_url}
    template_id = settings.email_template_id
    Emailer.send_template(user.email, "Destination Surf - Confirm your Email Address", template_id, template_content)

    # Create access token
    access_token = oauth2.create_access_token(data={"user_id": new_user.id})
    token = {"access_token": access_token, "token_type": "bearer"}
    created_user = schemas.UserCreated(user=new_user, confirmation_url=confirmation_url, token=token)
    return created_user


@router.get('/confirm/{token}', response_model=schemas.Confirmed)
def confirm_email(token: str, db: Session = Depends(get_db)):
    try:
        email = confirmation_tokens.confirm_token(token)
    except:
        return {'api_status': 'error', 'confirmed': False,
                'message': 'The confirmation link is invalid or has expired.'}
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        return {'api_status': 'error', 'confirmed': False, 'message': 'Email does not exist please register again'}
    if user.confirmed:
        return {'api_status': 'error', 'confirmed': False, 'message': 'Account already confirmed. Please login.!'}
    else:
        user.confirmed = True
        db.commit()

    return {'api_status': 'ok', 'confirmed': True, 'message': ''}


@router.post('/reconfirm', response_model=schemas.UserReConfirm)
def reconfirm(request: Request, email: str, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        return {'api_status': 'error', 'message': 'User not in database call register instead!',
                'confirmation_url': '', 'email': email}

    # Check if user already confirmed
    if user.confirmed:
        return {'api_status': 'error', 'message': 'User already confirmed!', 'confirmation_url': '', 'email': email}

    # Send confirmation email
    year = str(datetime.today().year)
    token = confirmation_tokens.generate_confirmation_token(user.email)
    confirmation_url = str(request.url) + 'confirm/' + token
    template_content = {'year': year, 'confirmation_url': confirmation_url}
    template_id = settings.email_template_id
    Emailer.send_template(user.email, "Destination Surf - Confirm your Email Address", template_id, template_content)

    output = {'api_status': 'ok', 'confirmation_url': confirmation_url, 'message': '', 'email': email}

    return output


@router.get('/status')
def login_status():
    if oauth2.get_current_user():
        return {'api_status': 'ok', 'logged-in': True}
    else:
        return {'api_status': 'ok', 'logged-in': False}


@router.get('/{id}', response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} does not exist")

    return user


@router.get('/', response_model=List[schemas.UserOut])
def get_user_all(db: Session = Depends(get_db)):
    user = db.query(models.User).all()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=" no user for now")

    return user
