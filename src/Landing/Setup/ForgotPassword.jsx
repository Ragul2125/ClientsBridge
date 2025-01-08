// ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import "./setup.css";
import logo from "../../assets/logo.png";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset`,
        { email }
      );
      setPopupMessage(
        response.status == 200
          ? "A reset link will be sent to your email if it exists."
          : "Email does not exist in our system."
      );
    } catch (error) {
      setPopupMessage("An error occurred. Please try again later.");
    } finally {
      setPopupVisible(true);
    }
  };

  return (
    <div className="setup">
      <img src={logo} alt="ClientsBridge" className="logo" />
      <div className="setup-box">
        <div className="set-in">
          <div className="set-sen">
            <label>Forgot Password</label>
            <div className="row">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row">
              <button onClick={handleForgotPassword} className="submit-button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {popupVisible && (
        <div
          className="frg-popup-overlay"
          onClick={() => setPopupVisible(false)}
        >
          <div className="frg-popup-box">
            <p>{popupMessage}</p>
            <button onClick={() => setPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
