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
        { name: 'Swell', months: ['green', 'purple', 'grey','green', 'purple', 'grey','green', 'purple', 'grey','green', 'purple', 'grey']},
        { name: 'Water Temp', months: ['warm','warm','mild','mild','mild','mild','warm','warm','warm','warm','mild','mild']},
        { name: 'Weather', months: ['sunny','sunny','sunny','sunny','sunny','sunny','cloudy','cloudy','cloudy','cloudy','cloudy','sunny']},
      ],
    },
    {
      country: 'Sri Lanka',
      description: 'What makes a great day to surf? Well, it depends. Some people will be happy no matter the conditions, but for those who want more than just water and waves, there are some key indicators to watch out for. You should...',
      image: 'https://example.com/sri-lanka.jpg',
      seasons: [
        { name: 'Beg', months: [0, 1, 2]  },
        { name: 'Int', months: [3, 4, 5]  },
        { name: 'Adv', months: [6, 7, 8] },
        { name: 'Swell', months: ['green', 'purple', 'grey','green', 'purple', 'grey','green', 'purple', 'grey','green', 'purple', 'grey']},
        { name: 'Water Temp', months: ['warm','warm','mild','mild','mild','mild','warm','warm','warm','warm','mild','mild']},
        { name: 'Weather', months: ['sunny','sunny','sunny','sunny','sunny','sunny','cloudy','cloudy','cloudy','cloudy','cloudy','sunny']},
      ],
    },
    {
      country: 'Sri Lanka',
      description: 'What makes a great day to surf? Well, it depends. Some people will be happy no matter the conditions, but for those who want more than just water and waves, there are some key indicators to watch out for. You should...',
      image: 'https://example.com/sri-lanka.jpg',
      seasons: [
        { name: 'Beg', months: [0, 1, 2]  },
        { name: 'Int', months: [3, 4, 5]  },
        { name: 'Adv', months: [6, 7, 8] },
        { name: 'Swell', months: ['green', 'purple', 'grey','green', 'purple', 'grey','green', 'purple', 'grey','green', 'purple', 'grey']},
        { name: 'Water Temp', months: ['warm','warm','mild','mild','mild','mild','warm','warm','warm','warm','mild','mild']},
        { name: 'Weather', months: ['sunny','sunny','sunny','sunny','sunny','sunny','cloudy','cloudy','cloudy','cloudy','cloudy','sunny']},
      ],
    },
    {
      country: 'Sri Lanka',
      description: 'What makes a great day to surf? Well, it depends. Some people will be happy no matter the conditions, but for those who want more than just water and waves, there are some key indicators to watch out for. You should...',
      image: 'https://example.com/sri-lanka.jpg',
      seasons: [
        { name: 'Beg', months: [0, 1, 2]  },
        { name: 'Int', months: [3, 4, 5]  },
        { name: 'Adv', months: [6, 7, 8] },
        { name: 'Swell', months: ['green', 'purple', 'grey','green', 'purple', 'grey','green', 'purple', 'grey','green', 'purple', 'grey']},
        { name: 'Water Temp', months: ['warm','warm','mild','mild','mild','mild','warm','warm','warm','warm','mild','mild']},
        { name: 'Weather', months: ['sunny','sunny','sunny','sunny','sunny','sunny','cloudy','cloudy','cloudy','cloudy','cloudy','sunny']},
      ],
    }
  ]);


  const [hotels, setHotels] = useState([]);

  const blogs = [
    {
        title: 'Top 5 surf spots in Ahangama, Sri Lanka',
        date: '14th May 2022',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        text: 'Do you want to go to Sri Lanka for your next surfing holiday? Even if you are just learning to surf or if you are a more experienced surfer – Sri Lanka got some great surf spots for you! Here we list our five...'
    },
    {
        title: 'Top Destinations for a Winter Getaway',
        date: '14th May 2022',
        image: 'https://plus.unsplash.com/premium_photo-1664116928415-0525b7abcd03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        text: 'What makes a great day to surf? Well, it depends. Some people will be happy no matter the conditions, but for those who want more than just water and waves, there are some key indicators to watch out for. You should...'
    },
    {
        title: 'Why Traveling Solo Can Be The Best Experience',
        date: '14th May 2022',
        image: 'https://images.unsplash.com/photo-1558980664-1db506751c6c?auto=format&fit=crop&w=500&q=60',
        text: 'You usually become more independent when you get to this level of surfing, which also mean being more strict and picky with what you’re riding, but it’s really important that you develop the skills needed to ride...'
    },
    {
        title: 'How to Pack Light for Your Next Trip',
        date: '14th May 2022',
        image: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        text: 'Casper Steinfath is a Danish surfer, adventure addict and 6X SUP World Champion winner, who recently visited our camp in Norway. Even though he has the opportunity to visit some incredible places all over the world,...'
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
