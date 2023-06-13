import requests
import httpx
from backend_service.core.services.hotel_availability import HotelAvailability


class HotelFacilities:
    def __init__(self):
        self.avail_service = HotelAvailability()
        self.url = "https://apidojo-booking-v1.p.rapidapi.com/properties/get-facilities"
        self.headers = {
            'X-RapidAPI-Key': '7fc59bc869mshf413bded09697a6p12e80djsnfbd1bae47b0b',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        }

    def get_accommodation_facilities(self, hotel_id: int):
        print('Getting hotel photos')
        hotels_photo_urls = self.fetch_facilities(hotel_id)
        return hotels_photo_urls

    async def fetch_facilities_old(self, hotel_id: int):
        querystring = {"hotel_ids": hotel_id, "languagecode": "en-us"}

        try:
            response = requests.get(self.url, headers=self.headers, params=querystring)
            facilities_data = response.json()

        except Exception as error:
            print("Error fetching photos:", error)

        return facilities_data

    async def fetch_facilities(self, hotel_id: int):
        querystring = {"hotel_ids": hotel_id, "languagecode": "en-us"}
        facilities_data = None

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.url, headers=self.headers, params=querystring)
                facilities_data = response.json()

        except Exception as error:
            print("Error fetching photos:", error)

        return facilities_data
