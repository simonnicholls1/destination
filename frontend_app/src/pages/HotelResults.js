import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Button, Row} from 'react-bootstrap';
import qs from 'qs';
import NavBar from '../components/common/NavBar'
import Footer from '../components/common/Footer'
import CardList from '../components/hotel/HotelCards'
import HotelFilter from '../components/hotel/HotelFilter';
import HotelMapMulti from '../components/hotel/HotelMapMulti';


function HotelResults() {
  
  const location = useLocation();
  const [showMap, setShowMap] = useState(false);

  const handleFilter = (filters) => {
    // filter the hotels based on the filters
    let filteredHotels = hotels;
    if (filters.surfLessons) {
      filteredHotels = filteredHotels.filter(hotel => hotel.surfLessons);
    }
    // apply other filters here
    setFilteredHotels(filteredHotels);
  }

  const handleSearch = (location_value, arrival, departure, guests) => {
    // send a request to the server to get the search results based on the search criteria
    fetch(`http://0.0.0.0:8000/destinationapi/accommodation/searchlocation?place=${location_value}&arrival_date=${arrival}&departure_date=${departure}&guests=${guests}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    //body: JSON.stringify(searchCriteria),
    })
    .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
    })
    .then((data) => {
    setHotels(data);
    setFilteredHotels(data);
    setError(null);
    })
    .catch((error) => {
    setError(error.message);
    setHotels([]);
    });
}
  
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const parsedSearch = qs.parse(location.search, { ignoreQueryPrefix: true });
    const location_value = parsedSearch.location;
    const arrival = parsedSearch.checkin;
    const departure = parsedSearch.checkout;
    const guests = parsedSearch.guests;
    setHotels([]);
    handleSearch(location_value, arrival, departure, guests);
  }, [location.search]);

const filterBox = {
    position: 'fixed',
    paddingTop: '70px',
    left: '37px',
    width: '250px',
    height: '100vh',
    overflowY: 'auto'
}

const hotelList = {
    paddingTop: '70px',
    paddingLeft: '310px',
    height: '100vh',
    overflowY: 'auto'
}

const hotelResultsStyle = {
     paddingTop: '90px'
}

const hotelResultsTitle = {
    alignItems: 'center',
    paddingRight: '37px',
    paddingLeft: '40px',
    position: 'fixed',
    zIndex: 1000,
    backgroundColor: 'white',
};

  return (
    <>
      <NavBar />
      <div style={hotelResultsStyle}>
        <React.StrictMode>
          <Container>
            <h2 style={hotelResultsTitle}>Hotel Results</h2>
            <div style={filterBox}>
              <HotelFilter hotels={hotels} handleFilter={handleFilter}/>
            </div>
            <div style={hotelList}>
              <button onClick={() => setShowMap(!showMap)}>Show Map</button>
              {showMap ? <HotelMapMulti hotels={filteredHotels} /> : <CardList hotels={filteredHotels} col_items={4}/>}
            </div>
          </Container>
        </React.StrictMode>
      </div>
      <Footer />
    </>
  );
}

export default HotelResults;
