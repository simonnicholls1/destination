import React from 'react';
import { GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';

const HotelMap = ({ hotel }) => {

  const mapContainerStyle = {
    height: '400px',
    width: '800px',
    marginBottom: '10px'
  };

  const center = {
    lat: hotel.latitude,
    lng: hotel.longitude
  };

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
