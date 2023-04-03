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
          const response = await fetch('destinationapi/accommodation/featured?no_results=10');
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
        country: "Country1",
        description: "Description1",
        image: "path/to/image1",
    },
    {
        country: "Country2",
        description: "Description2",
        image: "path/to/image2",
    },
    {
        country: "Country3",
        description: "Description3",
        image: "path/to/image3",
    },
    {
        country: "Country4",
        description: "Description4",
        image: "path/to/image4",
    },
    {
        country: "Country5",
        description: "Description5",
        image: "path/to/image5",
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
