import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const isLoggedIn = true;
  const isAdmin = true; // Mock admin check

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="header-hamburger"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          ☰
        </button>
        <Link to="/" className="header-logo logo">
          BLOG
        </Link>
      </div>

      <div className="header-right">
        {isLoggedIn && isAdmin && (
          <Link to="/dashboard" className="dashboard-btn">
            Dashboard
          </Link>
        )}

        {isLoggedIn ? (
          <Link to="/profile" className="header-logo">
            <div className="info-profile-cont">
              <img
                className="info-profilepic"
                src="https://placehold.co/120x80"
                alt="profile"
              />
              <div className="info-user-details">
                <span className="info-user-name">Sushant Pardhi</span>
                <span className="info-user-email">
                  sushantgpardhi@gmail.com
                </span>
              </div>
            </div>
          </Link>
        ) : (
          <nav className="auth-cont">
            <Link to="/login" className="header-btn">
              Login
            </Link>
            <Link to="/register" className="header-btn header-btn-primary">
              Sign Up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
