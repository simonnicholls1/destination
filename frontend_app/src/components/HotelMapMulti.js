import React, { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';

const HotelMapMulti = ({ hotels }) => {
  const mapContainerStyle = {
    height: '80%',
    width: '95%',
    border: '1px lightgray',
    borderRadius: '10px',
    margin: '10px 00px 0px 10px'
  };
  const [selectedHotel, setSelectedHotel] = useState(null);

  const center_loc = hotels && hotels.length > 0 ? { lat: hotels[0].latitude, lng: hotels[0].longitude } : { lat: 0, lng: 0 };
  
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
      center={center_loc}
    >
      {hotels.map((hotel) => (
        <MarkerF
          key={hotel.booking_id}
          position={{
            lng: hotel.longitude,
            lat: hotel.latitude,
          }}
          onClick={() => setSelectedHotel(hotel)}
        />
      ))}
      {selectedHotel && (
        <InfoWindow
          position={{
            lng: selectedHotel.longitude,
            lat: selectedHotel.latitude,
          }}
          onCloseClick={() => setSelectedHotel(null)}
        >
          <div>
            <h2>{selectedHotel.name}</h2>
            <p>{selectedHotel.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default HotelMapMulti;