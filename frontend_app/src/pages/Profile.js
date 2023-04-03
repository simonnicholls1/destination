import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Navbar from "../components/common/NavBar";

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <><Navbar /><div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div></>
  );
}

export default Profile;
