import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h1 className="form-title">Login</h1>
        <div className="username-cont">
          <label htmlFor="login-username">Username</label>
          <input
            className="login-input"
            type="text"
            name="UserName"
            id="login-username"
            autoFocus
          />
        </div>
        <div className="password-cont">
          <label htmlFor="login-password">Password</label>
          <input
            className="login-input"
            type="password"
            name="Password"
            id="login-password"
            required
          />
        </div>
        <p>
          <Link className="forgot-password">Forgot Password ?</Link>
        </p>
        <button className="login-button" type="submit">
          Login
        </button>
        <p className="form-end">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
