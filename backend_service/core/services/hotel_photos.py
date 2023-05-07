import requests


class HotelPhotos:
    def __init__(self):
        self.headers = {
            'X-RapidAPI-Key': '7fc59bc869mshf413bded09697a6p12e80djsnfbd1bae47b0b',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        }
        self.url = f"https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos"

    def get_accomodation_photo_urls(self, hotel_id: int):
        print('Getting hotel photos')
        hotels_photo_urls = self.fetch_photos(hotel_id)
        return hotels_photo_urls

    async def fetch_photos(self, hotel_id: int):

        querystring = {"hotel_ids": hotel_id, "languagecode": "en-us"}


        try:
            response = requests.get(self.url, params=querystring, headers=self.headers)
            photo_data = response.json()
            prefix_url = photo_data['url_prefix']

            photos = []
            for item in photo_data['data'][str(hotel_id)]:
                tags = [tag_obj['tag'] for tag_obj in item[3]]
                url = prefix_url + item[4]
                photos.append({'url': url, 'tags': tags})

            prop_photos = [{'url': item['url'], 'tags': item['tags']} for item in photos if 'Property' in item['tags']]

            return {"all_photos": photos, "property_photos": prop_photos}

        except Exception as error:
            print("Error fetching photos:", error)
            return {}

