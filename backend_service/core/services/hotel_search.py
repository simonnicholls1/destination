import requests
from backend_service.core.services.hotel_availability import HotelAvailability
from backend_service.core.data.models import AccommodationIdMapping

class HotelSearch:
    def __init__(self, database):
        self.avail_service = HotelAvailability()
        self.db = database

    async def _get_accommodation_availability(self, arrival_date, departure_date, latitude, longitude, guests):
        print('Getting hotel availability')
        hotels, hotel_ids = await self.avail_service.get_hotel_availability(arrival_date, departure_date, latitude, longitude, guests)
        return hotels, hotel_ids

    def _get_accommodation_by_ids(self, accomodation_ids):
        print('Getting our hotels')
        if len(accomodation_ids) == 1:
            query = 'select external_id from accommodation a join accommodation_id_mapping i on a.id = i.accommodation_id and external_id_type = 1 WHERE external_id = {0}'.format(
                accomodation_ids[0])
        else:
            query = 'select external_id from accommodation a join accommodation_id_mapping i on a.id = i.accommodation_id and external_id_type = 1 WHERE external_id IN {id_list}'.format(id_list=tuple(accomodation_ids))
        query_results = self.db.execute(query)
        accomodation_results = [row[0] for row in query_results.fetchall()]
        return accomodation_results

    def get_accommodation_by_id(self, accommodation_id):
        print('Getting hotel')
        query = f'select * ' \
                f'from accommodation a ' \
                f'join accommodation_id_mapping aim ' \
                f'on aim.accommodation_id = a.id ' \
                f'left outer join accommodation_surf_filters asd ' \
                f'on asd.accommodation_id = a.id ' \
                f'where a.id = {accommodation_id}'
        query_results = self.db.execute(query)
        accommodation_results = query_results.fetchone()
        return accommodation_results

    async def get_accommodation(self, arrival_date, departure_date, latitude, longitude, guests):
        hotels, hotel_ids = await self._get_accommodation_availability(arrival_date, departure_date, latitude, longitude, guests)
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
                 accommodation
                 order by random()
                 limit {0})
                 select *, replace(photo_url, 'square60', 'max1280x900') as photo_url_big
                 from with_accom a
                 join accommodation_type t
                 on t.type_id = a.accom_type_id'''.format(no_to_get)
        query_results = self.db.execute(query)
        accomodation_results = query_results.fetchall()

        return accomodation_results