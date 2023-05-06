import requests
from backend_service.core.services.hotel_availability import HotelAvailability


class HotelReviews:
    def __init__(self):
        self.avail_service = HotelAvailability()
        self.headers = {
            'X-RapidAPI-Key': '7fc59bc869mshf413bded09697a6p12e80djsnfbd1bae47b0b',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        }
        self.url = "https://apidojo-booking-v1.p.rapidapi.com/reviews/get-scores"

    def get_accomodation_photo_reviews(self, hotel_id: int):
        print('Getting hotel reviews')
        hotels_photo_urls = self.fetch_photos(hotel_id)
        return hotels_photo_urls

    async def fetch_reviews(self, hotel_id: int):
        reviews = []

        querystring = {"hotel_ids": hotel_id, "languagecode": "en-us"}

        try:
            response = requests.get(self.url, params=querystring, headers=self.headers)
            reviews = response.json()

        except Exception as error:
            print("Error fetching photos:", error)

        return reviews
