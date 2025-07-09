import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import "./login.css";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = `/${localStorage.getItem("role")}`;
    }
  }, []);

  const handleLogin = async (e) => {
    setLoading(true);
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
          mailId: email.toLowerCase(),
          password,
        }
      );
      console.log(response);
      // Handle successful login
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        window.location.href = `/${response.data.role}`;
      }
      // Redirect or update UI
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
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
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button type="submit" className="auth-btn-primary" disabled={loading}>
            {loading ? <div className="spinner-res" /> : "Login"}
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
        <Link to={"/forgot"} className="auth-forgot">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
