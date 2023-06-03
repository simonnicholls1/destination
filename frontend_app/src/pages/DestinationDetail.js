import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import DestinationMap from '../components/destination/DestinationMap';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';

const destinationDetailStyle = {
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

const destinationImages = {
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

const DestinationDetail = () => {

  const { destinationID } = useParams();
  const [destination, setDestination] = useState(null);
  const [destinationPhotos, setDestinationPhotos] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAGqMMlOqhcEst4KPGIh8AF5CD--ZyqND0'
  });

  useEffect(() => {
  // Function to fetch hotel data from API
  const fetchDestinationData = async (id) => {
    try {
      const response = await fetch(
        'http://0.0.0.0:8000/destinationapi/destination/'+ id
      );
      const destinationData = await response.json();
      setDestination(destinationData);
    } catch (error) {
      console.error("Error fetching destination data:", error);
    }
  };

  fetchDestinationData(destinationID);
}, [destinationID]);

  return (
    <div>
     <NavBar />
     <div style={destinationDetailStyle}>
     <div style={destinationImages}>
      {destinationPhotos && destinationPhotos.length > 0 && (
        <>
          <img src={destinationPhotos[0].url} alt="Large destination" style={largeImage} />
          <div style={gridImages}>
             {destinationPhotos.slice(1, 5).map((photo, idx) => (
                <img key={idx} src={photo.url} alt={`Grid hotel ${idx}`} style={gridImage} />
            ))}
          </div>
        </>
      )}
    </div>

    {/* Only render DestinationMap if destination is not null */}
    {destination && <DestinationMap destination={destination} />}
    </div>
  <Footer />
  </div>
  );
};

export default DestinationDetail;
