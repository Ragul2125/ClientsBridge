import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import "./login.css";
import { Eye, EyeOff } from "lucide-react";
// 1. Import useNavigate along with Link
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 2. Initialize the navigate function
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 3. If a user is already logged in, navigate them using React Router
    if (token && role) {
      navigate(`/${role}`);
    }
    // 4. Add navigate to the dependency array
  }, [navigate]);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false); // Make sure to stop loading on validation error
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false); // Make sure to stop loading on validation error
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          mailId: email.toLowerCase(),
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        // 5. Use navigate here as well after a successful login
        navigate(`/${response.data.role}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Note: These social logins still use window.location.href, which is correct
  // because they redirect to an external URL for OAuth. This is fine.
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
      {/* ... Rest of your JSX is fine ... */}
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
