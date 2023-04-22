import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import HotelMap from '../components/hotel/HotelMap';

const DestinationDetail = () => {

  const hotel = JSON.parse(sessionStorage.getItem("selectedHotel"));

  if (hotel == null) {
    return <div>Error: Hotel not found</div>;
  }

  console.log(hotel); // verify that the hotel object is being passed correctly

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAGqMMlOqhcEst4KPGIh8AF5CD--ZyqND0'
  });

  if (loadError) {
    return <div>Error loading map</div>;
  }

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
    <h1>{hotel.name}</h1>
    <HotelMap hotel={hotel} />
  </div>
  );
};

export default DestinationDetail;
