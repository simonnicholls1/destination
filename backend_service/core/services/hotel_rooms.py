import requests
from backend_service.core.services.hotel_availability import HotelAvailability
import httpx
import datetime


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
        hotels_photo_urls =  self.fetch_rooms(hotel_id, departure_date, arrival_date, guest_number, no_rooms)
        return hotels_photo_urls

    async def fetch_rooms_old(self, hotel_id: int, departure_date, arrival_date, guest_number: int, no_rooms: int, currency: str = "GBP"):
        querystring = {"hotel_id": hotel_id, "departure_date": departure_date, "arrival_date": arrival_date,
                       "rec_guest_qty": guest_number, "rec_room_qty": no_rooms, "currency_code": currency, "languagecode": "en-us",
                       "units": "imperial"}
        try:
            response = requests.get(self.url, params=querystring, headers=self.headers)
            room_data = response.json()

        except Exception as error:
            print("Error fetching rooms:", error)

        return room_data

    async def fetch_rooms(self, hotel_id: int, arrival_date, departure_date, guest_number: int, no_rooms: int,
                          currency: str = "GBP"):
        querystring = {"hotel_id": hotel_id, "departure_date": departure_date, "arrival_date": arrival_date,
                       "rec_guest_qty": guest_number, "rec_room_qty": no_rooms, "currency_code": currency,
                       "languagecode": "en-us",
                       "units": "imperial"}
        rooms = []
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(self.url, params=querystring, headers=self.headers)
            room_data = response.json()
            rooms = self.parse_rooms(room_data)

        except Exception as error:
            print("Error fetching rooms:", error)

        return rooms

    def parse_rooms(self, room_response_json):
        data = room_response_json[0]
        if 'rooms' not in data:
            return []
        room_data = data["rooms"]
        rooms = {}

        for block_data in data["block"]:
            room_id = block_data["room_id"]
            current_room_data = room_data.get(str(room_id))

            if room_id not in rooms:
                rooms[room_id] = {}
                rooms[room_id]["blocks"] = []

            current_room = rooms[room_id]

            current_room["photos"] = [photo["url_original"] for photo in current_room_data["photos"]]
            current_room["facilities"] = [facility["name"] for facility in current_room_data["facilities"]]

            block = {}
            block["room_id"] = block_data.get("room_id")
            block["name"] = block_data.get("name")
            block["name_without_pol"] = block_data.get("name_without_policy")
            block["refundable_until"] = block_data.get("refundable_until")
            block["refundable"] = block_data.get("refundable")
            block["all_inclusive"] = block_data.get("all_inclusive")
            block["full_board"] = block_data.get("full_board")
            block["half_board"] = block_data.get("half_board")
            block["nr_adults"] = block_data.get("nr_adults")
            block["nr_children"] = block_data.get("nr_children")
            block["room_count"] = block_data.get("room_count")
            block["number_of_bathrooms"] = block_data.get("number_of_bathrooms")
            block["gross_ammount"] = block_data["product_price_breakdown"].get("gross_ammount")
            block["gross_ammount_per_night"] = block_data["product_price_breakdown"].get("gross_ammount_per_night")
            block["room_count"] = block_data.get("room_count")
            block["room_count"] = block_data.get("room_count")

            current_room["blocks"].append(block)

        return rooms

    def get_default_params(self):
        today = datetime.date.today()

        # Get the first day of next month
        if today.month == 12:
            start_date = datetime.date(today.year + 1, 1, 1)
        else:
            start_date = datetime.date(today.year, today.month + 1, 1)

        # End date is 5 days after the start date
        end_date = start_date + datetime.timedelta(days=5)

        # Define the parameters as per your request
        params = {
            'room_number': 1,
            'number_of_guests': 2,
            'start_date': start_date.strftime('%Y-%m-%d'),
            'end_date': end_date.strftime('%Y-%m-%d'),
        }

        return params

