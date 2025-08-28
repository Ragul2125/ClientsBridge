// SetupProfile.js
import React, { useState, useEffect } from "react"; // 1. Import useEffect
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./setup.css";
import logo from "../../assets/logo.png";

const SetupProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Add loading state specifically for the username check
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  useEffect(() => {
    if (!username.trim()) {
      setIsUsernameAvailable(false);
      return;
    }

    // Set loading state to true and reset availability
    setIsCheckingUsername(true);
    setIsUsernameAvailable(false);

    // Set a timer to wait for the user to stop typing
    const debounceTimer = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/setup/checkUserName/${username}`
        );
        setIsUsernameAvailable(response.data);
      } catch (error) {
        console.error("Error checking username availability:", error);
        toast.error("Could not check username.");
        setIsUsernameAvailable(false);
      } finally {
        setIsCheckingUsername(false); // Set loading state to false after check
      }
    }, 500); // 500ms delay

    return () => clearTimeout(debounceTimer);
  }, [username]);

  const handlePasswordVerify = async () => {
    if (!password) {
      return toast.error("Please enter your password.");
    }
    setIsVerifying(true);

    const promise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/setup/verify/${id}`,
      { password }
    );

    toast
      .promise(promise, {
        loading: "Verifying...",
        success: "Verification successful! Please set up your profile.",
        error: "Invalid password. Please try again.",
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setIsPasswordVerified(true);
      })
      .catch((err) => console.error("Verification error:", err))
      .finally(() => setIsVerifying(false));
  };

  const handleSubmit = async () => {
    if (!username.trim() || !isUsernameAvailable) {
      return toast.error("Please provide a valid and available username.");
    }
    if (!profilePic) {
      return toast.error("Please upload a profile picture.");
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("userName", username);
    formData.append("file", profilePic);

    const promise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/setup/setUserName`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast
      .promise(promise, {
        loading: "Setting up your profile...",
        success: "Profile setup successfully! Redirecting...",
        error: (err) =>
          err.response?.data?.message || "An error occurred during setup.",
      })
      .then((response) => {
        setTimeout(
          () => navigate(`/setup/addProjects/${response.data.user.role}`),
          1500
        );
      })
      .catch((err) => console.error("Profile setup error:", err))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="setup">
      <Toaster position="top-center" reverseOrder={false} />
      <img src={logo} alt="ClientsBridge" className="logo" />
      <div className="setup-box">
        <div className="set-in">
          {!isPasswordVerified ? (
            <div className="set-sen">
              {/* ... password verification JSX ... */}
              <label>Verify it’s you</label>
              <div className="row">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isVerifying}
                />
                <button onClick={handlePasswordVerify} disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : "Verify"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="set-sen">
                <label>Set username</label>
                <div className="row">
                  <input
                    type="text"
                    placeholder="Unique username"
                    value={username}
                    // 4. The onChange now only updates the state
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isSubmitting}
                  />
                  {/* 5. Render feedback based on loading and availability states */}
                  {username && (
                    <span
                      style={{ color: isUsernameAvailable ? "green" : "red" }}
                    >
                      {isCheckingUsername
                        ? "Checking..."
                        : isUsernameAvailable
                        ? "Available"
                        : "Not available"}
                    </span>
                  )}
                </div>
              </div>

              <div className="set-img">
                {/* ... profile picture and submit button JSX ... */}
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
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="upload"
                  className={isSubmitting ? "disabled-label" : ""}
                >
                  Choose file
                </label>
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={!isUsernameAvailable || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupProfile;
