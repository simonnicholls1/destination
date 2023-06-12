from typing import List
from fastapi import APIRouter,Depends,HTTPException, Response,status
from sqlalchemy.orm.session import Session
from backend_service.core.data.database import get_db
from backend_service.core.security import oauth2
from backend_service.core.data import models, schemas

router=APIRouter(
    prefix='/posts',
    tags=['Post']

)

@router.get('/')
def get_posts(db:Session=Depends(get_db)):
    ps=db.query(models.Post).order_by(models.Post.date_added).limit(30).all()
    return ps

@router.get('/featured')
def get_featured_posts(no_results, db: Session = Depends(get_db)):
    ps=db.query(models.Post).limit(no_results).all()
    return  ps
    
@router.post("/")
def post_list(post: schemas.PostCreate, db:Session=Depends(get_db), current_user: int =Depends(oauth2.get_current_user)):
    new_post= models.Post(user_id=current_user.id, ** post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.get("/{id}")
def get_post_by_id(id:int, db:Session=Depends(get_db), current_user: int =Depends(oauth2.get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND ,
        detail=f"post with id {id} not found")
    return post

@router.put("/{id}",status_code=status.HTTP_200_OK)
def update_list(id:int, updated_list: schemas.PostCreate, db:Session=Depends(get_db), current_user: int =Depends(
    oauth2.get_current_user)):
    post_query=db.query(models.Post).filter(models.Post.id == id)
    post=post_query.first()
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND ,detail=f"post with id {id} not found")
    post_query.update(updated_list.dict(),synchronize_session=False)
    db.commit()
    return post_query.first()

@router.delete("/{id}" ,status_code=status.HTTP_204_NO_CONTENT)
def delete_list(id:int, db:Session=Depends(get_db), current_user: int =Depends(oauth2.get_current_user)):
    post_query=db.query(models.Post).filter(models.Post.id == id)
    post=post_query.first()
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND ,detail=f"post with id {id} not found")
    post_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)