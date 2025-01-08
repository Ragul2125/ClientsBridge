import React, { useState } from "react";
import axios from "axios";
import "./registration.css";
import logo from "../../assets/logo.png";

const CompanyRegistrationPage = () => {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register/company`,
        formData
      );
      console.log(formData);
      setPopupMessage("Application received. You will be notified soon.");
      setSubmitted(true);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const closePopup = () => {
    setSubmitted(false);
    window.location.href = "/"; // Redirect to homepage
  };

  return (
    <div className="registration">
      <nav className="registration-nav">
        <img src={logo} alt="ClientsBridge" className="logo" />
      </nav>

      <div className="form-container">
        <h1 className="form-title">Company registration</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name*</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Company name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Industry Type*</label>
              <input
                type="text"
                name="type"
                placeholder="Enter Industry type"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Owner Name*</label>
              <input
                type="text"
                name="ownerName"
                placeholder="Enter Owner name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Manager Name*</label>
              <input
                type="text"
                name="managerName"
                placeholder="Enter Manager name"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Company Address*</label>
            <textarea
              name="address"
              placeholder="Enter Company Address"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City*</label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State*</label>
              <input
                type="text"
                name="state"
                placeholder="Enter State"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Zip Code*</label>
              <input
                type="text"
                name="zipCode"
                placeholder="Enter Zip Code"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Country*</label>
              <input
                type="text"
                name="country"
                placeholder="Enter Country"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address*</label>
              <input
                type="email"
                name="mailId"
                placeholder="Enter Email Address"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Company Description*</label>
            <textarea
              name="description"
              placeholder="Enter Description"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Number of Seats*</label>
              <input
                type="number"
                name="size"
                placeholder="Enter Company Size"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Register ID/License No.*</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="Enter ID/License"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Password*</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>GST Number*</label>
              <input
                type="text"
                name="gstNumber"
                placeholder="Enter GST Number"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Website URL*</label>
            <input
              type="url"
              name="websiteUrl"
              placeholder="Paste Website URL"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit Application
          </button>
        </form>
      </div>

      {submitted && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={closePopup}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyRegistrationPage;
