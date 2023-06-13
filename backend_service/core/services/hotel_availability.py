import requests
from dataclasses import dataclass
import httpx
import asyncio

@dataclass
class AccommodationBooking():
    booking_id: int
    name: str
    address: str
    city: str
    country: str
    country_code: str
    post_code: str
    distance: float
    latitude: float
    longitude: float
    accom_type: int
    booking_url: str
    photo_url: str
    photo_url_big: str
    booking_rating: float
    user_rating: float


class HotelAvailability:
    def __init__(self):
        self.url = 'https://apidojo-booking-v1.p.rapidapi.com/properties/list'
        self.headers = {'X-RapidAPI-Key': '7fc59bc869mshf413bded09697a6p12e80djsnfbd1bae47b0b',
                        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'}

    def gen_query(self, arrival_date, departure_date, latitude, longitude, guests, offset, search_id, currency_code='USD', children_qty = 0):
        querystring = {"offset": str(offset),
                       "arrival_date": arrival_date,
                       "departure_date": departure_date,
                       "guest_qty": guests,
                       "dest_ids": "-1",
                       "room_qty": "1",
                       "search_type": "latlong",
                       "children_qty": children_qty,
                       "search_id": search_id,
                       "price_filter_currencycode": currency_code,
                       "latitude": latitude,
                       "longitude": longitude,
                       "order_by": "distance",
                       "languagecode": "en-us",
                       "travel_purpose": "leisure"}

        return querystring

    def parse_results(self, hotel_results):
        hotels = []
        hotel_ids = []
        for key, result_hotel in enumerate(hotel_results):
            name = result_hotel['hotel_name_trans']
            address = result_hotel['address_trans']
            city = result_hotel['city_name_en']
            postcode = result_hotel['zip']
            country = result_hotel['country_trans']
            country_code = result_hotel['countrycode']
            photo_url = result_hotel['main_photo_url']
            longitude = result_hotel['longitude']
            latitude = result_hotel['latitude']
            id = result_hotel['hotel_id']
            accom_type = result_hotel['accommodation_type_name']
            distance = result_hotel['distance']
            booking_url = result_hotel['url']
            booking_rating = result_hotel['class']
            user_rating = result_hotel['review_score']

            hotel = AccommodationBooking(id, name, address, city, country, country_code, postcode, distance, latitude, longitude, accom_type, booking_url, photo_url, None, booking_rating, user_rating)
            hotels.append(hotel)
            hotel_ids.append(id)
        return hotels, hotel_ids

    def _get_hotel_availability_by_offset_old(self, arrival_date, departure_date, latitude, longitude, guests, offset, search_id=None):
        querystring = self.gen_query(arrival_date, departure_date, latitude, longitude, guests, offset, search_id)
        response = requests.request("GET", self.url, headers=self.headers, params=querystring)
        result = response.json()
        search_id = result['search_id']
        hotels, hotel_ids = self.parse_results(result['result'])
        count = result['count']
        return hotels, hotel_ids, count, search_id

    async def _get_hotel_availability_by_offset(self, arrival_date, departure_date, latitude, longitude, guests, offset,
                                                search_id=None):
        querystring = self.gen_query(arrival_date, departure_date, latitude, longitude, guests, offset, search_id)
        async with httpx.AsyncClient() as client:
            response = await client.get(self.url, headers=self.headers, params=querystring)
        result = response.json()
        search_id = result['search_id']
        hotels, hotel_ids = self.parse_results(result['result'])
        count = result['count']
        return hotels, hotel_ids, count, search_id

    def get_hotel_availability_old(self, arrival_date, departure_date, latitude, longitude, guests):
        # Get first page of results, need count of hotels
        hotels = []
        hotel_ids = []
        # Funky first call - radius changes from 70 to 15 so call it get the key and drop it
        first_results, hotel_ids_result, hotel_count, search_id = self._get_hotel_availability_by_offset(arrival_date, departure_date, latitude, longitude, guests, 0)
        first_results, hotel_ids_result, hotel_count, search_id = self._get_hotel_availability_by_offset(arrival_date, departure_date, latitude, longitude, guests, 0, search_id)

        print('Number of hotels found: {0}'.format(hotel_count))
        hotels.extend(first_results)
        hotel_ids.extend(hotel_ids_result)

        no_pages = int(hotel_count / 20) + 1

        for i in range(1, no_pages):
            results, hotel_ids_result, hotel_count, search_id = self._get_hotel_availability_by_offset(arrival_date, departure_date, latitude, longitude, guests, i * 20, search_id)
            hotels.extend(results)
            hotel_ids.extend(hotel_ids_result)
        return hotels, hotel_ids

    async def get_hotel_availability(self, arrival_date, departure_date, latitude, longitude, guests):
        # Get first page of results, need count of hotels
        hotels = []
        hotel_ids = []
        # Funky first call - radius changes from 70 to 15 so call it get the key and drop it
        first_results, hotel_ids_result, hotel_count, search_id = await self._get_hotel_availability_by_offset(
            arrival_date, departure_date, latitude, longitude, guests, 0)
        first_results, hotel_ids_result, hotel_count, search_id = await self._get_hotel_availability_by_offset(
            arrival_date, departure_date, latitude, longitude, guests, 0, search_id)

        print('Number of hotels found: {0}'.format(hotel_count))
        hotels.extend(first_results)
        hotel_ids.extend(hotel_ids_result)

        no_pages = int(hotel_count / 20) + 1

        # Gather tasks to fetch pages concurrently
        tasks = []
        for i in range(1, no_pages):
            task = self._get_hotel_availability_by_offset(arrival_date, departure_date, latitude, longitude, guests,
                                                          i * 20, search_id)
            tasks.append(task)

        results = await asyncio.gather(*tasks)

        for result in results:
            hotels_page, hotel_ids_page, _, _ = result
            hotels.extend(hotels_page)
            hotel_ids.extend(hotel_ids_page)

        return hotels, hotel_ids


if __name__ == '__main__':
    hotel_avail_servc = HotelAvailability()
    lat = '10.3018594'
    long = '-85.8411169'
    arrival_date = '2023-07-15'
    departure_date = '2023-07-16'
    guests = 2
    hotels, hotel_ids = asyncio.run(hotel_avail_servc.get_hotel_availability(arrival_date, departure_date, lat, long, guests))
    print(hotels)
    print(hotel_ids)