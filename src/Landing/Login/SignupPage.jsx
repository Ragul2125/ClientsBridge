import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./login.css";
import { LoaderCircle } from "lucide-react";

const SignupPage = () => {
  const [socialLoading, setSocialLoading] = useState(null);
  const googleLogin = () => {
    setSocialLoading("google");
    window.location.href = `${import.meta.env.VITE_BACKEND_URL
      }/api/auth/login/google`;
  };

  const linkedinLogin = () => {
    setSocialLoading("linkedin");
    window.location.href = `${import.meta.env.VITE_BACKEND_URL
      }/api/auth/login/linkedin`;
  };
  return (
    <div className="authpg">
      <div className="auth-title">
        <img src={logo} alt="ClientsBridge" />
      </div>
      <div className="auth-box signup-box">
        <div className="auth-heading">Sign Up</div>
        <div className="auth-subtext">Create your account using</div>
        <div className="social-container">
          <button onClick={googleLogin} className="social-btn google" disabled={socialLoading !== null}>
            {socialLoading === "google" ? (
              <LoaderCircle className="spinner-icon auth-loading" />
            ) : (
              <>
                <i className="fa-brands fa-google"></i>{" "}
                <span>Sign up with Google</span>
              </>
            )}
          </button>
          <button onClick={linkedinLogin} className="social-btn linkedin" disabled={socialLoading !== null}>
            {socialLoading === "linkedin" ? (
              <LoaderCircle className="spinner-icon auth-loading" />
            ) : (
              <>
                <i className="fa-brands fa-linkedin"></i>{" "}
                <span>Sign up with LinkedIn</span>
              </>
            )}
          </button>
        </div>
        <div className="auth-link">
          Already have an account?{" "}
          <Link to={"/login"} href="/login">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
