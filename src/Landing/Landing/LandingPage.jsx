// export default LandingPage;
import "./landing.css";
import logo from "../../assets/logo.png";
import video from "../../assets/world.mov";
import circles from "../../assets/aaa.svg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="land">
      <div className="home">
        <video autoPlay muted loop className="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <nav className="land-nav">
          <img src={logo} alt="ClientsBridge" />

          <button onClick={handleLogin} className="loginbtn">
            Login
          </button>
        </nav>
        <div className="land-home">
          <h2>Welcome To</h2>
          <h1>Clientsbridge</h1>
          <button onClick={handleSignup}>Explore </button>
        </div>{" "}
      </div>
      <div className="services">
        <div className="s-in">
          <img src={circles} alt="querk" />
          <div className="serv-content">
            <h1>Work together</h1>
            <p>
              Whether you're here to hire or be hired, ClientsBridge is your
              trusted partner for professional success. Join now to unlock your
              full potential in the freelancing world.
            </p>
            <button onClick={handleSignup} className="content-button">
              Try it now
            </button>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="f-in">
          <div className="f-content">
            <h2>Discover Our Outstanding Features</h2>
            <p>
              Join a community of clients and freelancers from around the globe
              who rely on ClientsBridge for their projects, collaborations, and
              growth.
            </p>
            <button onClick={handleSignup} className="content-button">
              Let's go
            </button>
          </div>
          <ul className="sections">
            <li>
              <h3>For Client</h3>
              <p>
                Access a wide pool of skilled freelancers across various
                industries. Post your projects, review proposals, and choose the
                best talent to bring your vision to life.
              </p>
            </li>
            <li>
              <h3>For Client</h3>
              <p>
                Access a wide pool of skilled freelancers across various
                industries. Post your projects, review proposals, and choose the
                best talent to bring your vision to life.
              </p>
            </li>
            <li>
              <h3>For Client</h3>
              <p>
                Access a wide pool of skilled freelancers across various
                industries. Post your projects, review proposals, and choose the
                best talent to bring your vision to life.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
