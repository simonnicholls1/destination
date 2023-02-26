import React from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';

const HotelMap = ({ hotel }) => {

  const mapContainerStyle = {
    height: '400px',
    width: '800px'
  };

  const center = {
    lat: hotel.latitude,
    lng: hotel.longitude
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default HotelMap;
