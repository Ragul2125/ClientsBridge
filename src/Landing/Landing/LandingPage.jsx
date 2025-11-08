// export default LandingPage;
import "./landing.css";
import logo from "../../assets/logo.png";
import video from "../../assets/world.mov";
import circles from "../../assets/aaa.svg";
import producticon from "../../assets/product-icon.svg";
import { useNavigate } from "react-router-dom";
import vector from "../../assets/Vector.svg";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };
  const nonIt = [
    {
      title: "Business and Compliance",
      des: "We provide expert support to help you meet regulations and grow securely.",
    },
    {
      title: "Content and Publishing",
      des: "We help you create, manage, and distribute engaging content worldwide.",
    },
    {
      title: "Creative and Design",
      des: "We deliver innovative design solutions that bring your ideas to life.",
    },
    {
      title: "Industry Solutions",
      des: "We offer tailored services that solve unique challenges in every sector.",
    },
    {
      title: "Web and App Development",
      des: "We build responsive websites and mobile apps tailored to your business needs.",
    },
    {
      title: "Full-stack Development",
      des: "We deliver complete end-to-end solutions across both front-end and back-end.",
    },
    {
      title: "Cloud and DevOps",
      des: "We streamline infrastructure with scalable cloud solutions and CI/CD automation.",
    },
    {
      title: "AI and Data Automation",
      des: "We harness AI tools to automate workflows and unlock actionable insights.",
    },
  ];

  const IT = [
    {
      title: "Web and App Development",
      des: "We build responsive websites and mobile apps tailored to your business needs.",
    },
    {
      title: "Full-stack Development",
      des: "We deliver complete end-to-end solutions across both front-end and back-end.",
    },
    {
      title: "Cloud and DevOps",
      des: "We streamline infrastructure with scalable cloud solutions and CI/CD automation.",
    },
    {
      title: "AI and Data Automation",
      des: "We harness AI tools to automate workflows and unlock actionable insights.",
    },
  ];
  const Navigate = useNavigate();
  const handleExplore = () => {
    Navigate("/signup");
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
          <h1>ClientsBridge</h1>
          <button onClick={handleSignup}>Explore </button>
        </div>{" "}
      </div>
      <div className="services">
        <div className="semi-circle"></div>
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
              Join Now
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
              <span>
                <img src={vector} alt="vector" />
                <h3>For Clients</h3>
              </span>
              <p>
                Access a wide pool of skilled freelancers across various
                industries. Post your projects, review proposals, and choose the
                best talent to bring your vision to life.
              </p>
            </li>
            <li>
              <span>
                <img src={vector} alt="vector" />
                <h3>For Freelancers</h3>
              </span>
              <p>
                Build your portfolio, get hired by clients, and grow your
                freelancing career with trusted payments and transparent
                communication.
              </p>
            </li>
            <li>
              <span>
                <img src={vector} alt="vector" />
                <h3>For Companies</h3>
              </span>
              <p>
                Find and hire skilled freelancers with ease. Manage projects,
                ensure secure payments, and build long-term partnerships to
                scale your business efficiently.
              </p>
            </li>

            {/* <li>
              <h3>For Client</h3>
              <p>
                Access a wide pool of skilled freelancers across various
                industries. Post your projects, review proposals, and choose the
                best talent to bring your vision to life.
              </p>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="products">
        <div className="our-services">
          <h1>Our Services </h1>
          <p>
            Comprehensive solutions designed to accelerate your
            buisness growth and digital transformation
          </p>
        </div>
        <div className="non-IT-cards">
          {nonIt.map((item, index) => (
            <div className="card" key={index}>
              <div className="icons">
                <img src={producticon} alt="" />
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.des}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="our-services">
          <h1>Technology and Development</h1>
        </div> */}
        {/* <div className="non-IT-cards">
          {IT.map((item, index) => (
            <div className="card" key={index}>
              <div className="icons">
                <img src={producticon} alt="" />
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.des}</p>
              </div>
            </div>
          ))}
        </div> */}
        <p>
          Unlock the full potential of ClientsBridge — explore all our services
          designed to accelerate your success.
        </p>
        <button onClick={handleExplore}>Explore Services</button>
      </div>
    </div>
  );
};

export default LandingPage;
