import React from "react";
import logo from "../../assets/img/destination_logo.jpg";
import profile from "../../assets/img/profile.png";
import { Link } from "react-router-dom";

function Footer() {
  const footerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 35px 5px 35px",
    background: "#fff",
    height: "30px",
    borderTop: '1px solid rgba(211, 211, 211, 0.55)',
  };

  const fixedFooterStyles = {
    ...footerStyles,
    position: "fixed",
    bottom: "0",
    width: "100%",
    zIndex: "1000",
  };

  const textStyles = {
     fontFamily: '"Roboto", sans-serif',
    fontSize: "12px",
  }

  const linkStyles = {
    color: "#333",
    fontFamily: '"Roboto", sans-serif',
    fontSize: "12px",
    fontWeight: "bold",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "25px",
    transition: "background-color 0.3s",
  };

  const linkHoverStyles = {
    ...linkStyles,
    backgroundColor: "rgba(211, 211, 211, 0.2)",
  };

  return (
    <div>
      <nav style={fixedFooterStyles}>
        <div className="ml-auto">
         <a style={textStyles}>Copyright DestinationSurf.com</a>
          <Link
            style={linkStyles}
            to="/Destinations"
          >
            Destinations
          </Link>
          <Link
            style={linkStyles}
            to="/Blog"
          >
            Blog
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Footer;
