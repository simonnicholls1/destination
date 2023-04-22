import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import HotelMap from '../components/hotel/HotelMap';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';

const Destination = () => {


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAGqMMlOqhcEst4KPGIh8AF5CD--ZyqND0'
  });

  if (loadError) {
    return <div>Error loading map</div>;
  }

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (<>
    <NavBar/>
    <div>
   </div>
   <Footer /></>
  );
};

export default Destination;
