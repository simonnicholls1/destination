import requests


class HotelPhotos:
    def __init__(self):
        self.headers = {
            'X-RapidAPI-Key': '7fc59bc869mshf413bded09697a6p12e80djsnfbd1bae47b0b',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        }
        self.url = f"https://apidojo-booking-v1.p.rapidapi.com/properties/get-featured-reviews"

    def get_accomodation_photo_urls(self, hotel_id: int):
        print('Getting hotel photos')
        hotels_photo_urls = self.fetch_photos(hotel_id)
        return hotels_photo_urls

    async def fetch_photos(self, hotel_id: int):

        querystring = {"hotel_ids": hotel_id, "languagecode": "en-us"}

        updated_photo_data = []
        prop_photos = []

        try:
            response = requests.get(self.url, params=querystring,headers=self.headers)
            photo_data = response.json()
            prefix_url = photo_data['url_prefix']

            photos = []
            for item in photo_data['data'][id]:
                tags = [tag_obj['tag'] for tag_obj in item[3]]
                photos.append({'photo_url': item[4], 'tags': tags})

            updated_photo_data = [
                {'tags': photo['tags'], 'url': prefix_url + photo['photo_url']} for photo in photos
            ]

            prop_photos = [
                {'url': item['url'], 'tags': item['tags']} for item in updated_photo_data if 'Property' in item['tags']
            ]

        except Exception as error:
            print("Error fetching photos:", error)

        return updated_photo_data, prop_photos
