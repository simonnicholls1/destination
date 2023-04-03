import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/destination_logo.jpg'
import profile from '../../assets/img/profile.png'
import search from '../../assets/img/search.png'
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState();

const navbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 20px 5px 20px',
    background: '#fff',
}

const logoStyles = {
    width: '200px',
    height: '50px',
}

const formStyles = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '20px',
  border: '1px solid darkgray',
}

const formInputMiddleStyles = {
  borderRadius: '0px',
  borderLeft: '1px solid lightgray',
  borderRight: '1px solid lightgray',
  borderTop: '0px',
  borderBottom: '0px',
  padding: '10px 5px'
}

const formInputOuterStyles = {
  border: '0px',
  marginLeft: '10px'
}

const formInputOuterRightStyles = {
  border: '0px',
  marginLeft: '10px',
  width: '60px'
}

const searchStyles = {
    width: '30px',
    height: '30px',
    paddingTop: '2px',
    paddingRight: '5px'
}

const profileStyles = {
    width: '30px',
    float: 'right',
    marginLeft: 'auto'
}

const separatorStyles = {
    
    height: '1px',
    background: 'lightGrey',
    marginTop: '0px',
    display: 'block',
}

const linkStyles = {
  color: '#333',
  textDecoration: 'none',
  padding:'10px',
  alignItems: 'center'
}

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/hotels?location=${location}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`);
  };


  return (
    <div>
      <nav style={navbarStyles}>
      <a href="/">
        <img src={logo} alt='logo' style={logoStyles} />
      </a>
      <form style={formStyles} onSubmit={handleSubmit}>
        <input style={formInputOuterStyles} type='text' placeholder='Where' value={location} onChange={(event) => setLocation(event.target.value)} />
        <input style={formInputMiddleStyles} type='date' placeholder='Check-in' value={checkin} onChange={(event) => setCheckin(event.target.value)} />
        <input style={formInputMiddleStyles} type='date' placeholder='Check-out' value={checkout} onChange={(event) => setCheckout(event.target.value)} />
        <input style={formInputOuterRightStyles} type='text' placeholder='Surfers' value={guests} onChange={(event) => setGuests(event.target.value)} />
        <a href="#" onClick={handleSubmit}><img src={search} alt='search' style={searchStyles} /></a>
      </form>
      <div className="ml-auto">
        <Link style={linkStyles} href="/Destinations" className="ml-auto">Destinations</Link>
        <Link style={linkStyles} href="/Blog" className="ml-auto">Blog</Link>
        <a href="/profile" className="ml-auto">
          <img src={profile} alt='profile' style={profileStyles} />
        </a>
      </div>
    </nav>
    <div style={separatorStyles} />
    </div>
);
}

export default Navbar;
