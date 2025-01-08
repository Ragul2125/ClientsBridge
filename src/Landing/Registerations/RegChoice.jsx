import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./registerOptions.css";

const RegChoice = () => {
  return (
    <div className="register-options-page">
      <div className="logobar-left">
        <img src={logo} alt="" />
      </div>
      <div className="welcome-message">
        <h2>Welcome!</h2>
        <p>What do you want to register as?</p>
      </div>
      <div className="options-container">
        <Link to="/register/freelancer" className="option-box">
          <i className="fas fa-user-tie option-icon"></i>
          <h3>Freelancer</h3>
          <p>
            Individual professionals or small teams offering specialized
            services.
          </p>
        </Link>
        <Link to="/register/company" className="option-box">
          <i className="fas fa-building option-icon"></i>
          <h3>Company</h3>
          <p>
            Businesses or organizations looking to manage teams and projects.
          </p>
        </Link>
        <Link to="/register/client" className="option-box">
          <i className="fas fa-handshake option-icon"></i>
          <h3>Client</h3>
          <p>
            Individuals or organizations seeking services from freelancers or
            companies.
          </p>
        </Link>
      </div>
    </div>
  );
};
export default RegChoice;
