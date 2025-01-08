import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = `/${localStorage.getItem("role")}`;
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Clear error if validation passes

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          mailId: email,
          password,
        }
      );

      // Handle successful login
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        window.location.href = `/${response.data.role}`;
      }
      // Redirect or update UI
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials.");
    }
  };

  const googleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/login/google`;
  };

  const linkedinLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/login/linkedin`;
  };

  return (
    <div className="authpg">
      <div className="auth-title">
        <img src={logo} alt="ClientsBridge" />
      </div>
      <div className="auth-box login-box">
        <div className="auth-heading">Log In</div>
        <div className="auth-subtext">Please enter your login credentials</div>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-btn-primary">
            Login
          </button>
        </form>
        <div className="social-container">
          <button className="social-btn google" onClick={googleLogin}>
            <i className="fa-brands fa-google"></i>{" "}
            <span>Login with Google</span>
          </button>
          <button className="social-btn linkedin" onClick={linkedinLogin}>
            <i className="fa-brands fa-linkedin"></i>{" "}
            <span>Login with LinkedIn</span>
          </button>
        </div>
        <div className="auth-forgot">Forgot Password?</div>
      </div>
    </div>
  );
};

export default LoginPage;
