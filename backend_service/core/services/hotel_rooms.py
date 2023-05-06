import requests
from backend_service.core.services.hotel_availability import HotelAvailability


class HotelRooms:
    def __init__(self):
        self.avail_service = HotelAvailability()
        self.headers = {
            'X-RapidAPI-Key': '7fc59bc869mshf413bded09697a6p12e80djsnfbd1bae47b0b',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        }
        self.url = "https://apidojo-booking-v1.p.rapidapi.com/properties/v2/get-rooms"

    def get_accomodation_rooms(self, hotel_id: int, departure_date, arrival_date, guest_number: int, no_rooms: int):
        print('Getting hotel photos')
        hotels_photo_urls = self.fetch_rooms(hotel_id, departure_date, arrival_date, guest_number, no_rooms)
        return hotels_photo_urls

    async def fetch_rooms(self, hotel_id: int, departure_date, arrival_date, guest_number: int, no_rooms: int, currency: str = "GBP"):
        querystring = {"hotel_id": hotel_id, "departure_date": departure_date, "arrival_date": arrival_date,
                       "rec_guest_qty": guest_number, "rec_room_qty": no_rooms, "currency_code": currency, "languagecode": "en-us",
                       "units": "imperial"}

        rooms = []

        try:
            response = requests.get(self.url, params=querystring, headers=self.headers)
            room_data = response.json()

        except Exception as error:
            print("Error fetching photos:", error)

        return room_data
