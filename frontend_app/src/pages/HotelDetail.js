import React, { useState, useEffect } from 'react';
import HotelMap from '../components/hotel/HotelMap';
import HotelRoomCard from '../components/hotel/HotelRoomCard';
import RatingCard from '../components/hotel/RatingCard';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';

const sampleHotel = {
  name: "Sample Hotel",
  largeImage: "https://via.placeholder.com/600x400",
  gridImages: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ],
  typeLogo: "https://via.placeholder.com/50",
  description:
    "Sample Hotel is a luxurious and comfortable place to stay during your vacation. With a wide range of amenities and a great location, you'll find everything you need for a perfect getaway.",
  facilities: [
    "Free Wi-Fi",
    "Swimming Pool",
    "Fitness Center",
    "Restaurant",
    "Bar",
  ],
  rooms: [
    {
      name: "Deluxe Room",
      image: "https://via.placeholder.com/300x200",
      description:
        "Our Deluxe Room offers a spacious and comfortable space to relax, with a king-size bed, private bathroom, and a variety of amenities to make your stay enjoyable.",
      price: "150",
    },
    {
      name: "Suite",
      image: "https://via.placeholder.com/300x200",
      description:
        "Experience luxury in our Suite, featuring a separate living area, bedroom, and bathroom, as well as additional amenities to ensure a memorable stay.",
      price: "250",
    },
  ],
  ratings: [
    {
      user: "John Doe",
      rating: 4.5,
      review:
        "I had a fantastic stay at Sample Hotel. The staff was friendly, the room was clean, and the amenities were top-notch. I'd definitely stay here again!",
    },
    {
      user: "Jane Smith",
      rating: 5,
      review:
        "Sample Hotel exceeded my expectations! From the moment I checked in, I felt welcomed and well taken care of. The facilities were excellent, and the location was perfect for exploring the city.",
    },
  ],
  location: {
    lat: 37.7749,
    lng: -122.4194,
  },
  houseRules: "Please be respectful of other guests and keep noise to a minimum after 10 PM. No smoking is allowed in the rooms or common areas.",
};

const HotelDetail = ({ hotelID }) => {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    // Function to fetch hotel data from API
    const fetchHotelData = async () => {
      // Replace the URL with the actual API endpoint
      // const response = await fetch('https://api.example.com/hotel/1');
      // const hotelData = await response.json();
      // setHotel(hotelData);

      // Use sampleHotel for now instead of the API call result
      setHotel(sampleHotel);
    };

    fetchHotelData();
  }, []);

  if (hotel == null) {
    return <div>Loading...</div>;
  }

  const hotelImages = {
    display: 'flex',
  };

  const largeImage = {
    width: '60%',
    height: 'auto'
  };

  const gridImages = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '10px',
    width: '40%',
  };

  const gridImage = {
    paddingLeft: '10px',
    width: '100%',
    height: 'auto',
  };

  const hotelTypeLogo = {
    // Add styling for the hotel type logo
  };

  const hotelRooms = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const ratings = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const hotelDetailStyle = {
    alignItems: 'center',
    paddingTop: '100px',
    paddingRight: '37px',
    paddingLeft: '40px',
    paddingBottom: '50px'
  }

  return (
    <>
    <NavBar />
    <div style={hotelDetailStyle}>
      <h1>{hotel.name}</h1>

      <div style={hotelImages}>
        <img src={hotel.largeImage} alt="Large hotel" style={largeImage} />
        <div style={gridImages}>
          {hotel.gridImages.map((img, idx) => (
            <img key={idx} src={img} alt={`Grid hotel ${idx}`} style={gridImage} />
          ))}
        </div>
      </div>

      <div style={hotelTypeLogo}>{hotel.typeLogo}</div>

      <h2>Where you will be staying</h2>
      <p>{hotel.description}</p>

      <h2>What is there to offer</h2>
      <ul>
        {hotel.facilities.map((facility, idx) => (
          <li key={idx}>{facility}</li>
        ))}
      </ul>

      <h2>Available Rooms</h2>
      <div style={hotelRooms}>
        {hotel.rooms.map((room, idx) => (
          <HotelRoomCard key={idx} room={room} />
        ))}
      </div>

      <h2>Guest Ratings</h2>
      <div style={ratings}>
        {hotel.ratings.map((rating, idx) => (
          <RatingCard key={idx} rating={rating} />
        ))}
      </div>

      <h2>Where you will be located</h2>
      <HotelMap hotel={hotel} />

      <h2>House Rules</h2>
      {/* Add house rules content here */}
    </div>
    <Footer />
    < />
  );
};

export default HotelDetail;