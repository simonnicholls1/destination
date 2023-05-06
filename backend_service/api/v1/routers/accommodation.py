from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from backend_service.core.data.database import get_db
from backend_service.core.services.hotel_search import HotelSearch
from backend_service.core.services.geolocation import GeoLocation
from backend_service.core.services.hotel_reviews import HotelReviews
from backend_service.core.services.hotel_facilities import HotelFacilities
from backend_service.core.services.hotel_rooms import HotelRooms
from backend_service.core.services.hotel_photos import HotelPhotos

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


@router.get("/hotelbyid")
def hotel_by_id(hotel_id, db: Session = Depends(get_db)):
    hotel_search = HotelSearch(db)
    hotel_id = int(hotel_id)
    hotel = hotel_search.get_accommodation_by_id(hotel_id)
    if hotel is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation not found")
    return hotel

@router.get("/hotelphotos")
async def hotel_photos(hotel_id):
    photo_service = HotelPhotos()
    hotel_id = int(hotel_id)
    hotel_photos = await photo_service.fetch_photos(hotel_id)
    if hotel_photos is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Photos not found")
    return hotel_photos

@router.get("/hotelrooms")
async def hotel_rooms(hotel_id, departure_date, arrival_date, guest_number, no_rooms):
    room_service = HotelRooms()
    hotel_id = int(hotel_id)
    hotel_rooms = await room_service.fetch_rooms(hotel_id, departure_date, arrival_date, guest_number, no_rooms)
    if hotel_rooms is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Rooms not found")
    return hotel_rooms

@router.get("/hotelfacilities")
async def hotel_facilities(hotel_id):
    facilities_service = HotelFacilities()
    hotel_id = int(hotel_id)
    hotel_facilities = await facilities_service.fetch_facilities(hotel_id)
    if hotel_facilities is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Facilities not found")
    return hotel_facilities

@router.get("/hotelreviews")
async def hotel_reviews(hotel_id: int):
    review_service = HotelReviews()
    hotel_reviews = await review_service.fetch_reviews(hotel_id)
    if hotel_reviews is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Facilities not found")
    return hotel_reviews