from typing import Any, List, Dict

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

    def get_accomodation_reviews(self, hotel_id: int):
        print('Getting hotel reviews')
        reviews = self.fetch_reviews(hotel_id)
        return reviews

    async def fetch_reviews(self, hotel_id: int):
        reviews = []

        querystring = {"hotel_ids": hotel_id, "languagecode": "en-us"}

        try:
            response = requests.get(self.url, params=querystring, headers=self.headers)
            reviews = response.json()
            if type(reviews) == list:
                reviews = reviews[0]
            total_count, avg_score = self._calc_total_avg_score(reviews['score_breakdown'])

            reviews['avg_score'] = avg_score
            reviews['total_count'] = total_count

        except Exception as error:
            print("Error fetching reviews:", error)

        return reviews

    def _calc_total_avg_score(self, score_breakdowns: List[Dict[str, Any]]):
        total_count = 0
        score = 0

        for score_breakdown in score_breakdowns:
            total_count += score_breakdown['count']
            avg_score = float(score_breakdown['average_score'])
            score += (score_breakdown['count'] * avg_score)

        score = score/total_count

        return (total_count, round(score, 2))
