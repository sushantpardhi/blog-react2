import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const isLoggedIn = true;
  return (
    <div className="header">
      <div className="logo">LOGO</div>

      {isLoggedIn ? (
        <div className="info-profile-cont">
          <div className="info-profile-image">
            <img
              className="info-profilepic"
              src="https://placehold.co/120x80"
              alt="profile"
            />
          </div>
          <div className="info-user-details">
            <p className="info-user-name">Sushant Pardhi</p>
            <p className="info-user-email">sushantgpardhi@gmail.com</p>
          </div>
        </div>
      ) : (
        <div className="auth-cont">
          <Link to="/login">
            <button className="header-login-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="header-register-button">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
