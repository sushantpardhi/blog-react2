import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-container">
      <form className="register-form">
        <h1 className="form-title">Register</h1>
        <div className="name">
          <div className="first-name-cont">
            <label htmlFor="register-fName">First Name</label>
            <input
              className="register-input"
              type="text"
              name="FirstName"
              id="register-fName"
              autoFocus
              required
            />
          </div>
          <div className="last-name-cont">
            <label htmlFor="register-lName">Last Name</label>
            <input
              className="register-input"
              type="text"
              name="LastName"
              id="register-lName"
              required
            />
          </div>
        </div>
        <div className="email-cont">
          <label htmlFor="register-email">Email</label>
          <input
            className="register-input"
            type="email"
            name="Email"
            id="register-email"
            required
          />
        </div>
        <div className="username-cont">
          <label htmlFor="register-username">Username</label>
          <input
            className="register-input"
            type="text"
            name="UserName"
            id="register-username"
            required
          />
        </div>
        <div className="password-cont">
          <label htmlFor="register-password">Password</label>
          <input
            className="register-input"
            type="password"
            name="Password"
            id="register-password"
            required
          />
        </div>
        <div className="confirm-password-cont">
          <label htmlFor="register-confirm-password">Confirm Password</label>
          <input
            className="register-input"
            type="password"
            name="Confirm Password"
            id="register-confirm-password"
            required
          />
        </div>
        <button className="register-button" type="submit">
          Register
        </button>
        <p className="form-end">
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
