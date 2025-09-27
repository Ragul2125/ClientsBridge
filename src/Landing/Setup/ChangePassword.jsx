// ChangePassword.js
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// 1. Import react-hot-toast
import toast, { Toaster } from "react-hot-toast";

import "./setup.css";
import logo from "../../assets/logo.png";

const ChangePassword = () => {
  const { secret } = useParams();
  const navigate = useNavigate(); // For redirecting after success
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    // 2. Use toasts for validation feedback
    if (!password || !confirmPassword) {
      return toast.error("Please fill in both password fields.");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    setIsLoading(true);

    // 3. Use toast.promise to automatically handle loading, success, and error states
    const promise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/changePassword`,
      { password, secret }
    );

    toast
      .promise(promise, {
        loading: "Updating your password...",
        success: "Password changed successfully! 🎉",
        error: (err) =>
          err.response?.data?.message ||
          "Failed to change password. The link might be expired.",
      })
      .then(() => {
        // On success, redirect to the login page after a short delay
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => console.error("Password change error:", err))
      .finally(() => {
        setIsLoading(false);
      });
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
                disabled={isLoading} // 5. Disable fields while loading
              />
            </div>
            <div className="row">
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="row">
              <button
                onClick={handleChangePassword}
                className="submit-button"
                disabled={isLoading} // 6. Disable button and change text
              >
                {isLoading ? "Updating..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* The old popup JSX has been removed */}
    </div>
  );
};

export default ChangePassword;
