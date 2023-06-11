from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from backend_service.core.data import models
from backend_service.core.data.database import get_db
from backend_service.core.security import oauth2

router = APIRouter(
    prefix='/destination',
    tags=['destination']
)


@router.get("/details/{id}")
def get_destination_details_by_id(id: int, db: Session = Depends(get_db)):
    destination = db.query(models.DestinationSurfDetails).filter(
        models.DestinationSurfDetails.destination_id == id).first()
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"destination details with id {id} not found")
    return destination


@router.get("/featured")
def get_featured_destination(no_results: int, db: Session = Depends(get_db)):
    # create a joined query
    joined_query = db.query(models.Destination, models.DestinationSurfDetails). \
        outerjoin(models.DestinationSurfDetails, models.Destination.id == models.DestinationSurfDetails.destination_id)

    # execute the query and fetch all results
    destination = joined_query.limit(no_results).all()
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"destinations not found")
    return destination


@router.get("/{id}")
def get_destination_by_id(id: int, db: Session = Depends(get_db)):
    destination = db.query(models.Destination).filter(models.Destination.id == id).first()
    if destination is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"destination with id {id} not found")
    return destination
