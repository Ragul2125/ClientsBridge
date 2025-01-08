// ChangePassword.js
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./setup.css";
import logo from "../../assets/logo.png";

const ChangePassword = () => {
  const { secret } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setPopupMessage("Passwords do not match.");
      setPopupVisible(true);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/changePassword`,
        { password, secret }
      );
      setPopupMessage(
        response.status === 200
          ? "Password changed successfully."
          : "An error occurred. Please try again."
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
            <label>Change Password</label>
            <div className="row">
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="row">
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="row">
              <button onClick={handleChangePassword} className="submit-button">
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

export default ChangePassword;
