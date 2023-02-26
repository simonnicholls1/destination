from geopy.geocoders import Nominatim


class GeoLocation:

    def __init__(self):
        self.locator = Nominatim(user_agent='Destination Surf')

    def geo_locate(self, place_name):
        location = self.locator.geocode(place_name)
        if not location:
            raise ValueError('Cound not find lat and long for place {0}'.format(place_name))
        return location.latitude, location.longitude


if __name__ == '__main__':
    geo_locator = GeoLocation()
    print(geo_locator.geo_locate('Tamarindo Beach Costa Rica'))
