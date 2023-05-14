import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HotelMap from '../components/hotel/HotelMap';
import HotelRoomCard from '../components/hotel/HotelRoomCard';
import RatingCard from '../components/hotel/RatingCard';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';

const HeadingWithBorder = ({ children }) => {
  const borderStyles = {
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
    paddingBottom: '10px',
    width: '100%'
  };

  const headingStyles = {
    fontWeight: '350'
  };

  return (
    <div style={borderStyles}>
      <h2 style={headingStyles}>{children}</h2>
    </div>
  );
};


const HotelDetail = () => {
  const { hotelID } = useParams();
  const [hotel, setHotel] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [description, setDescription] = useState(null);
  const [facilities, setFacilities] = useState(null);
  const [propertyPhotos, setPropertyPhotos] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

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
      setDescription(hotelData["description"])
      setFacilities(hotelData["facilities"]);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

 fetchHotelData(hotelID);
}, [hotelID]);

  if (hotel == null) {
  const loaderStyle = {
    border: '16px solid #f3f3f3', // Light grey
    borderTop: '16px solid #3498db', // Blue
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
  };

  const keyframes = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;

  // Add the @keyframes rule to the document
  if (typeof document !== 'undefined') {
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }

  return (
    <>
      <NavBar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 60px)', // Subtracting the height of the NavBar
        //backgroundColor: '#ccc', // Or any other color you prefer
      }}>
        <div style={loaderStyle}></div>
      </div>
      <Footer />
    </>
  );
}

const hotelImages = {
  paddingTop: '20px',
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
  width: '280px',
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Center the div
  paddingTop: '100px',
  paddingBottom: '50px',
  paddingLeft: '30px', // Minimum left padding
  paddingRight: '10px', // Minimum right padding
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '1200px',
  maxWidth: '100%',
};


const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // Align content to the left
  width: '100%',
  maxWidth: '1200px', // Max width for the content
};

const borderStyles = {
  borderTop: '1px solid #ccc',
  paddingTop: '10px'
};

const inlineInfoStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center'
};

  return (
    <>
    <NavBar />
    <div style={hotelDetailStyle}>
     <div style={contentStyle}>
      <h1 style={{ fontWeight: '350' }}>{hotel.name}</h1>
      <div style={inlineInfoStyle}>
            <span>⭐ {reviews.avg_score.toFixed(2)} - </span>
            <a href="#reviews" style={{
                textDecoration: isHovered ? 'underline' : 'none',
                color: 'inherit'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <span style={{ cursor: 'pointer' }}>({reviews.total_count} reviews)</span>
            </a>
            <span> - {hotel.city},</span>
            <span>{hotel.country}</span>
     </div>
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

      <h2 style={{ fontWeight: '350'}}>Where you will be staying</h2>
      <p>{description.main}</p>

      <HeadingWithBorder>For surfers</HeadingWithBorder>
      <ul>
        {facilities && facilities.map((facility, idx) => (
          <li key={idx}>{facility.facility_name}</li>
        ))}
      </ul>

      <HeadingWithBorder>Hotel Facilities</HeadingWithBorder>
      <ul>
        {facilities && facilities.map((facility, idx) => (
          <li key={idx}>{facility.facility_name}</li>
        ))}
      </ul>

     <HeadingWithBorder>Available Rooms</HeadingWithBorder>

    {/*
      <h2>Available Rooms</h2>
      <div style={hotelRooms}>
        {hotel.rooms.map((room, idx) => (
          <HotelRoomCard key={idx} room={room} />
        ))}
      </div>
     */}

     <HeadingWithBorder>Reviews</HeadingWithBorder>
     <div id="reviews"></div>
     {/* Reviews section content */}

      <HeadingWithBorder>Where you will be located</HeadingWithBorder>
      <HotelMap hotel={hotel}/>
      <div style={{}}></div>
      <HeadingWithBorder>House rules</HeadingWithBorder>
      <p>{description.house_rules}</p>
    </div>
    </div>
    <Footer />
    < />
  );
};

export default HotelDetail;