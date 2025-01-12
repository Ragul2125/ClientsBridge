import React, { useState } from "react";
import axios from "axios";
import "./setup.css";
import logo from "../../assets/logo.png";
import { useParams } from "react-router-dom";

const SetupProfile = () => {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const handlePasswordVerify = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/setup/verify/${id}`,
        { password }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setIsPasswordVerified(true);
        alert("Password verified successfully!");
      } else {
        alert("Invalid password. Please try again.");
      }
    } catch (error) {
      console.error("Password verification error:", error);
      alert("An error occurred while verifying the password.");
    }
  };

  const handleUsernameChange = async (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
    if (enteredUsername.trim()) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/setup/checkUserName/${enteredUsername}`
        );
        setIsUsernameAvailable(response.data);
      } catch (error) {
        console.error("Error checking username availability:", error);
      }
    } else {
      setIsUsernameAvailable(false);
    }
  };

  const handleSubmit = async () => {
    if (!username.trim() || !isUsernameAvailable) {
      alert("Please provide a valid and available username.");
      return;
    }

    if (!profilePic) {
      alert("Please upload a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("userName", username);
    formData.append("file", profilePic);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/setup/setUserName`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.user) {
        alert("Profile setup successfully!");
        window.location.href = "/setup/addProjects/" + response.data.user.role; // Redirect to the next page
      } else {
        alert("Failed to set up profile. Please try again.");
      }
    } catch (error) {
      console.error("Profile setup error:", error);
      alert("An error occurred while setting up the profile.");
    }
  };

  return (
    <div className="setup">
      <img src={logo} alt="ClientsBridge" className="logo" />
      <div className="setup-box">
        <div className="set-in">
          {!isPasswordVerified ? (
            <div className="set-sen">
              <label>Verify it’s you</label>
              <div className="row">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handlePasswordVerify}>Verify</button>
              </div>
            </div>
          ) : (
            <div className="set-sen">
              <label>Set username</label>
              <div className="row">
                <input
                  type="text"
                  placeholder="Unique username"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <span>
                  {isUsernameAvailable ? "Available" : "Not available"}
                </span>
              </div>
            </div>
          )}
          {isPasswordVerified && (
            <div className="set-img">
              <img
                src={
                  profilePic
                    ? URL.createObjectURL(profilePic)
                    : "https://www.elevenforum.com/data/attachments/45/45622-423967e182ed610e64465704d26689f8.jpg?hash=Qjln4YLtYQ"
                }
                alt="Profile"
              />
              <input
                type="file"
                id="upload"
                hidden
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
              <label htmlFor="upload">Choose file</label>
              {isUsernameAvailable && (
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupProfile;
