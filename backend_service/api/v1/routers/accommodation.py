from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from backend_service.core.data.database import get_db
from backend_service.core.services.hotel_search import HotelSearch
from backend_service.core.services.geolocation import GeoLocation

router = APIRouter(
    prefix='/accommodation',
    tags=['Accommodation']
)


@router.get("/searchlocation")
def search_hotel(arrival_date, departure_date, place, guests, db: Session = Depends(get_db)):
    hotel_search = HotelSearch(db)
    #try get location from place name
    geo_locate = GeoLocation()
    latitude, longitude = geo_locate.geo_locate(place)

    hotels = hotel_search.get_accommodation(arrival_date, departure_date, latitude, longitude, guests)
    if hotels is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation not found")
    return hotels

@router.get("/featured")
def featured_hotes(no_results, db: Session = Depends(get_db)):
    hotel_search = HotelSearch(db)
    hotels = hotel_search.get_featured_accommodation(no_results)
    if hotels is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation not found")
    return hotels