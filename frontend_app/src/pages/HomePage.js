import React, { useState, useEffect } from 'react';
import '../assets/styling/HomePage.css';
import { getCookie } from '../utilities/cookies.js';
import NavBar from '../components/common/NavBar';
import CardList from '../components/hotel/HotelCards'
import DestinationCardList from '../components/destination/DestinationCards';
import BlogCardList from '../components/blog/BlogCards';


const HomePage = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [error, setError] = useState(null)

  useEffect(() => {
    // send a request to the server to get the logged-in user's information
    fetch('destinationapi/users/', {
      headers: {
        'Authorization': `Bearer ${getCookie('jwt')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data));

      const fetchHotels = async () => {
        try {
          const response = await fetch('http://0.0.0.0:8000/destinationapi/accommodation/featured?no_results=10');
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setHotels(data);
        } catch (error) {
          setError(error.message);
        }
    };
    fetchHotels();
  }, []);

  const [destinations, setDestinations] = useState([
    {
      country: 'Sri Lanka',
      description: 'What makes a great day to surf? Well, it depends. Some people will be happy no matter the conditions, but for those who want more than just water and waves, there are some key indicators to watch out for. You should...',
      image: 'https://example.com/sri-lanka.jpg',
      seasons: [
        { name: 'Beg', months: [0, 1, 2]  },
        { name: 'Int', months: [3, 4, 5]  },
        { name: 'Adv', months: [6, 7, 8] },
         {
            name: 'Swell',
            months: [
            'green', 'purple', 'grey',
            'green', 'purple', 'grey',
            'green', 'purple', 'grey',
            'green', 'purple', 'grey',
            ],
        },
        ,
  {
    name: 'Water Temp',
    months: [
      'warm',
      'warm',
      'mild',
      'mild',
      'mild',
      'mild',
      'warm',
      'warm',
      'warm',
      'warm',
      'mild',
      'mild',
    ],
  },
  {
    name: 'Weather',
    months: [
      'sunny',
      'sunny',
      'sunny',
      'sunny',
      'sunny',
      'sunny',
      'cloudy',
      'cloudy',
      'cloudy',
      'cloudy',
      'cloudy',
      'sunny',
    ],
    },
      ],
    }
  ]);


  const [hotels, setHotels] = useState([]);

  const blogs = [
    {
        title: 'The Importance of Self-Care',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        text: 'Self-care is not a luxury but a necessity for maintaining good physical, mental and emotional health. It’s an active process that requires time and effort...'
    },
    {
        title: 'Top Destinations for a Winter Getaway',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        text: 'Winter is here and for many, it’s a time to dream of a warm and sunny escape. If you’re looking to escape the cold weather and want to experience some...'
    },
    {
        title: 'Why Traveling Solo Can Be The Best Experience',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        text: 'Traveling solo can be a scary and daunting thought for some, but it can also be one of the most rewarding and liberating experiences of your life. Here are some reasons why...'
    },
    {
        title: 'How to Pack Light for Your Next Trip',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        text: 'Packing light can be a challenge, but it’s worth the effort to make your travels easier and more enjoyable. Here are some tips and tricks for packing light for your next trip...'
    },
]

  return (
      <><NavBar /><div className="home-page">
      <section className="section-1">
        <h2>Featured Hotels</h2>
        <CardList hotels={hotels} />
      </section>
      <section className="section-2">
        <h2>Destination Recommendations</h2>
        <DestinationCardList destinations={destinations}/>
      </section>
      <section className="section-3">
        <h2>Get informed for your next trip</h2>
        <BlogCardList blogs={blogs}/>
      </section>
    </div></>
  );
};

export default HomePage;
