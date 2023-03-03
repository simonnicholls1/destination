import requests
from backend_service.core.services.hotel_availability import HotelAvailability


class HotelSearch:
    def __init__(self, database):
        self.avail_service = HotelAvailability()
        self.db = database

    def _get_accommodation_availability(self, arrival_date, departure_date, latitude, longitude, guests):
        print('Getting hotel availability')
        hotels, hotel_ids = self.avail_service.get_hotel_availability(arrival_date, departure_date, latitude, longitude, guests)
        return hotels, hotel_ids

    def _get_accommodation_by_ids(self, accomodation_ids):
        print('Getting our hotels')
        query = 'select external_id from accomodation a join accomodation_id i on a.id = i.accomodation_id and external_id_type = 1 WHERE external_id IN {id_list}'.format(id_list=tuple(accomodation_ids))
        query_results = self.db.execute(query)
        accomodation_results = [row[0] for row in query_results.fetchall()]
        return accomodation_results

    def get_accommodation(self, arrival_date, departure_date, latitude, longitude, guests):
        hotels, hotel_ids = self._get_accommodation_availability(arrival_date, departure_date, latitude, longitude, guests)
        surf_ids = self._get_accommodation_by_ids(hotel_ids)

        #Pretty awful way of filtering but it will do for now
        hotel_results = []
        for hotel in hotels:
            if hotel.booking_id in surf_ids:
                hotel.photo_url_big = hotel.photo_url.replace('square60', 'max1280x900')
                hotel_results.append(hotel)

        return hotel_results

    def get_featured_accommodation(self, no_to_get=8):
        query = '''with with_accom as (
                 select * from 
                 accomodation
                 limit {0})
                 select *, replace(photo_url, 'square60', 'max1280x900') as photo_url_big
                 from with_accom a
                 join accomodation_type t
                 on t.type_id = a.accom_type_id'''.format(no_to_get)
        query_results = self.db.execute(query)
        accomodation_results = query_results.fetchall()

        return accomodation_results