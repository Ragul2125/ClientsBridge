import React, { useState, useRef } from "react";
import axios from "axios";
import "./registration.css";
import logo from "../../assets/logo.png";
import TagsInput from "./TagsInput";
import { LoaderCircle } from "lucide-react";
const FreelancerRegistrationPage = () => {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (field, tags) => {
    setFormData({ ...formData, skills: field });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register/freelancer`,
        formData
      );
      if (response.status === 200) {
        setPopupMessage("Freelancer registration successful.");
        setSubmitted(true);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
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
        <h1 className="form-title">Freelancer Registration</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth*</label>
            <input type="date" name="dob" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City*</label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State*</label>
              <input
                type="text"
                name="state"
                placeholder="Enter your state"
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
          <div className="form-group">
            <label>Skills*</label>
            <TagsInput onTagsChange={handleTagsChange} />
          </div>
          <div className="form-group">
            <label>Social URLs</label>
            <TagsInput
              onTagsChange={(tags) => handleTagsChange("socialUrls", tags)}
              placeholder="Type and press Enter to add a social URL"
            />
          </div>
          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              placeholder="Briefly describe yourself"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Email Address*</label>
            <input
              type="email"
              name="mailId"
              placeholder="Enter Email Address"
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  passwordRef.current?.focus();
                }
              }}
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
          <div className="form-group">
            <label>Password*</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
              ref={passwordRef}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <LoaderCircle className="spinner-icon auth-loading" /> : "Submit Registration"}
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

export default FreelancerRegistrationPage;
