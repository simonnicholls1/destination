import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

function parseData(input) {
  return input.map((item) => {
      const tags = item[3].map((tagObj) => tagObj.tag);
      return { photo_url: item[4], tags: tags };
  });
}

const HotelDetail = () => {
  const { hotelID } = useParams();
  const [hotel, setHotel] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [facilities, setFacilities] = useState(null);
  const [propertyPhotos, setPropertyPhotos] = useState(null);


useEffect(() => {
  // Function to fetch hotel data from API
  const fetchHotelData = async (id) => {
    try {
      const response = await fetch(
        'http://0.0.0.0:8000/destinationapi/accommodation/hoteldetails?hotel_id=' + id
      );
      const hotelData = await response.json();
      setHotel(hotelData["hotel"]);
      setPhotos(hotelData["photos"]["all_photos"]);
      setPropertyPhotos(hotelData["photos"]["property_photos"]);
      setReviews(hotelData["reviews"]);
      setFacilities(hotelData["facilities"]);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

 fetchHotelData(hotelID);
}, [hotelID]);


  if (hotel == null) {
    return <div>Loading...</div>;
  }

  const hotelImages = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
};

const largeImage = {
  width: '600px',
  height: '500px',
  borderRadius: '15px',
};

const gridImages = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: '10px'
};

const gridImage = {
  width: '220px',
  height: '245px',
  borderRadius: '15px',
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
      {propertyPhotos && propertyPhotos.length > 0 && (
        <>
          <img src={propertyPhotos[0].url} alt="Large hotel" style={largeImage} />
          <div style={gridImages}>
             {propertyPhotos.slice(1, 5).map((photo, idx) => (
                <img key={idx} src={photo.url} alt={`Grid hotel ${idx}`} style={gridImage} />
            ))}
          </div>
        </>
      )}
    </div>



      <div style={hotelTypeLogo}>{hotel.typeLogo}</div>

      <h2>Where you will be staying</h2>
      <p>{hotel.description}</p>

      <h2>What is there to offer</h2>
     {/*
      <ul>
        {hotel.facilities.map((facility, idx) => (
          <li key={idx}>{facility}</li>
        ))}
      </ul>
       */}

    {/*
      <h2>Available Rooms</h2>
      <div style={hotelRooms}>
        {hotel.rooms.map((room, idx) => (
          <HotelRoomCard key={idx} room={room} />
        ))}
      </div>
     */}

    {/*
      <h2>Guest Ratings</h2>
      <div style={ratings}>
        {hotel.ratings.map((rating, idx) => (
          <RatingCard key={idx} rating={rating} />
        ))}
      </div>
     */}

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