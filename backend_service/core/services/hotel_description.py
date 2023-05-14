import requests
from backend_service.core.services.hotel_availability import HotelAvailability


class HotelDescription:
    def __init__(self):
        self.avail_service = HotelAvailability()
        self.headers = {
            'X-RapidAPI-Key': '7fc59bc869mshf413bded09697a6p12e80djsnfbd1bae47b0b',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        }
        self.url = "https://apidojo-booking-v1.p.rapidapi.com/properties/get-description"

    def get_accomodation_description(self, hotel_id: int):
        print('Getting hotel description')
        hotels_photo_urls = self.fetch_description(hotel_id)
        return hotels_photo_urls

    async def fetch_description(self, hotel_id: int):
        description = {}

        querystring = {"hotel_ids": hotel_id, "languagecode": "en-us"}

        try:
            response = requests.get(self.url, params=querystring, headers=self.headers)
            description_json = response.json()

            for desc in description_json:
                if desc['descriptiontype_id'] == 6:
                    description['main'] = desc['description']
                elif desc['descriptiontype_id'] == 7:
                    description['house_rules'] = desc['description']
                else:
                    description['other'] = desc['description']

        except Exception as error:
            print("Error fetching description:", error)


        return description
