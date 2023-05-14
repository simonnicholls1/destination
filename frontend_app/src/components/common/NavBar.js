import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/destination_logo.jpg'
import profile from '../../assets/img/profile.png'
import search from '../../assets/img/search.png'
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


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
  padding: '5px 35px 5px 35px',
  background: '#fff',
  height: '70px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 999,
  borderBottom: '1px solid rgba(211, 211, 211, 0.55)',
};


const logoStyles = {
    width: '200px',
    height: '50px',
}

const formStyles = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '20px',
  border: '1px solid rgba(211, 211, 211, 0.55)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  width: '50%', // Set a relative width
  maxWidth: '600px', // Set a maximum width
}

const formInputOuterStyles = {
  border: '0px',
  marginLeft: '10px',
  flexGrow: 1,
  flexShrink: 1,
  width: '100%',
}

const formInputMiddleStyles = {
  borderRadius: '0px',
  borderLeft: '0.5px solid rgba(211, 211, 211)',
  borderRight: '0.5px solid rgba(211, 211, 211)',
  borderTop: '0px',
  borderBottom: '0px',
  padding: '10px 5px',
  flexGrow: 1, // Make the input adjustable in width
  flexShrink: 1,
  width: '92%', // Fixed width for date input boxes
};

const formInputOuterRightStyles = {
  border: '0px',
  marginLeft: '10px',
  flexGrow: 1, // Make the input adjustable in width
  flexShrink: 1, // Allow the input to shrink when necessary
  width: '100%'
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
    marginLeft: 'auto',
    alignSelf: 'center',
}

const linkContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '0px 10px'
};

const linkStyles = {
  color: '#333',
  fontFamily: '"Roboto", sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '10px',
  borderRadius: '25px',
  transition: 'background-color 0.3s',

};

const linkHoverStyles = {
  ...linkStyles,
  backgroundColor: 'rgba(211, 211, 211, 0.2)',
};

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/hotels?location=${location}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`);
  };

const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <input
    style={formInputMiddleStyles}
    type="text"
    value={value}
    onClick={onClick}
    ref={ref}
    placeholder={placeholder}
  />
));

const [destHover, setDestHover] = useState(false);
const [blogHover, setBlogHover] = useState(false);

 return (
  <div>
    <nav style={navbarStyles}>
      <a href="/">
        <img src={logo} alt='logo' style={logoStyles} />
      </a>
      <form style={formStyles} onSubmit={handleSubmit}>
        <input style={formInputOuterStyles} type='text' placeholder='Where' value={location} onChange={(event) => setLocation(event.target.value)} />
        <DatePicker
          selected={checkin}
          onChange={(date) => setCheckin(date)}
          customInput={<CustomInput />}
          placeholderText="Check-In"
        />
        <DatePicker
          selected={checkout}
          onChange={(date) => setCheckout(date)}
          customInput={<CustomInput />}
          placeholderText="Check-Out"
        />
        <input style={formInputOuterRightStyles} type='text' placeholder='Surfers' value={guests} onChange={(event) => setGuests(event.target.value)} />
        <a href="#" onClick={handleSubmit}><img src={search} alt='search' style={searchStyles} /></a>
      </form>
     <div style={linkContainerStyles}>
        <Link
          style={destHover ? linkHoverStyles : linkStyles}
          to="/destinations"
          onMouseEnter={() => setDestHover(true)}
          onMouseLeave={() => setDestHover(false)}
        >
          Destinations
        </Link>
        <Link
          style={blogHover ? linkHoverStyles : linkStyles}
          to="/blogs"
          onMouseEnter={() => setBlogHover(true)}
          onMouseLeave={() => setBlogHover(false)}
        >
          Blog
        </Link>
        <a href="/profile" className="ml-auto">
          <img src={profile} alt='profile' style={profileStyles} />
        </a>
      </div>
    </nav>
  </div>
);

}

export default Navbar;
