import React from 'react';
import { GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';

const DestinationMap = ({ destination }) => {

  const mapContainerStyle = {
    height: '400px',
    width: '800px',
    marginBottom: '10px'
  };

  const center = {
    lat: destination.latitude,
    lng: destination.longitude
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
      zoom={6}
      center={center}
    >
    </GoogleMap>
  );
};

export default DestinationMap;
