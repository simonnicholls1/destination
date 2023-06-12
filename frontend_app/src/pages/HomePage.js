import React, { useState, useEffect } from 'react';
import '../assets/styling/HomePage.css';
import { getCookie } from '../utilities/cookies.js';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import CardList from '../components/hotel/HotelCards'
import DestinationCardList from '../components/destination/DestinationCards';
import BlogCardList from '../components/blog/BlogCards';


const HomePage = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [error, setError] = useState(null)
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [blogs, setBlogs] = useState([]);

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
          const response = await fetch('http://0.0.0.0:8000/destinationapi/accommodation/featured?no_results=8');
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setHotels(data);
        } catch (error) {
          setError(error.message);
        }
    };

    const fetchDestinations = async () => {
        try {
          const response = await fetch('http://0.0.0.0:8000/destinationapi/destination/featured?no_results=5');
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setDestinations(data);
        } catch (error) {
          setError(error.message);
        }
    };

    const fetchBlogs = async () => {
        try {
          const response = await fetch('http://0.0.0.0:8000/destinationapi/posts/featured?no_results=5');
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setBlogs(data);
        } catch (error) {
          setError(error.message);
        }
    };

    fetchHotels();
    fetchDestinations();
    fetchBlogs();
  }, []);

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
    </div>
    <Footer /></>
  );
};

export default HomePage;
