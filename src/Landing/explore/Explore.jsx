import { useEffect, useState } from "react";
import "./Explore.css";
import { RiPulseLine } from "react-icons/ri";
import { FiLock } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FaBolt, FaLock, FaHeart, FaChartLine } from "react-icons/fa";

import logoblu from "../../assets/logoblu.svg";
import slide1 from "../../assets/slide1.svg";
import slide2 from "../../assets/slide2.svg";
import slide3 from "../../assets/slide3.svg";
import whatwedoimg from "../../assets/whatwedoimg.svg";
import hcwh1 from "../../assets/hcwh1.svg";
import { Link } from "react-router-dom";
const slides = [
  {
    img: slide1,
    text: "Connect Clients, Freelancers, and Companies.",
    details:
      "Our platform is designed to simplify collaboration, making it easier than ever for clients to find the right talent and for freelancers to discover rewarding projects.",
  },
  {
    img: slide2,
    text: "Find the Right Talent, Fast",
    details:
      "Post your projects and connect with skilled freelancers. Review portfolios and hire with confidence. Manage projects, track progress, and get results on time.",
  },
  {
    img: slide3,
    text: "Expand Your Opportunities",
    details:
      "Access a wide range of projects from global clients. Showcase your skills, build your portfolio, and get hired. Manage your workload and communicate seamlessly with clients.",
  },
];

export default function Explore() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <img className="logo-blu" src={logoblu} alt="Logo Blu" />
        <p>CLIENTSBRIDGE</p>
        <Link to="/choice" className="home-register-btn">
          Register
        </Link>
      </nav>
      <section className="home-carousel-container">
        <div className="home-carousel">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`home-carousel-slide ${
                index === currentSlide ? "active" : ""
              }`}
              style={{ display: index === currentSlide ? "flex" : "none" }}
            >
              <div className="home-carousel-slidetxt">
                <h1 className="home-carousel-head">{slide.text}</h1>
                <p className="home-carousel-detials">{slide.details}</p>
                <Link to="/choice" className="home-carousel-register-btn">
                  Register now
                </Link>
              </div>
              <img className="home-carousel-slideimg" src={slide.img} alt="" />
            </div>
          ))}
        </div>
        <div className="home-carousel-dots">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </section>
      <section className="home-whatwecando-container">
        <h2 className="home-whatwecando-head">What we can do ?</h2>
        <div className="home-whatwecando-do-container">
          <div className="whatwedo">
            <p className="whatwedo-icon">
              <RiPulseLine />
            </p>
            <p className="whatwedo-txt">
              <b>Diverse Talent Pool</b>
            </p>
            <p className="whatwedo-txt">
              Access clients, freelancers, and companies.
            </p>
          </div>
          <div className="whatwedo">
            <p className="whatwedo-icon">
              <FiLock />
            </p>
            <p className="whatwedo-txt">
              <b>Diverse Talent Pool</b>
            </p>
            <p className="whatwedo-txt">
              Access clients, freelancers, and companies.
            </p>
          </div>
          <div className="whatwedo">
            <p className="whatwedo-icon">
              <FiTrendingUp />
            </p>
            <p className="whatwedo-txt">
              <b>Diverse Talent Pool</b>
            </p>
            <p className="whatwedo-txt">
              Access clients, freelancers, and companies.
            </p>
          </div>
        </div>
        <div className="home-whatwedo-do2-container">
          <img className="whatwedo-do2-img" src={whatwedoimg} alt="" />
          <div className="whatwedo-do2-txt-container">
            <p className="whatwedo-do2-headtxt">
              Growing company with a team of{" "}
              <span style={{ color: "#312F9C" }}>dedicated professionals</span>
            </p>
            <p className="whatwedo-do2-txt">
              Our mission is to empower businesses to enable freelancers to find
              meaningful work opportunities. Our professionals who are
              passionate about providing innovative solutions to help businesses
              and freelancers succeed together.
            </p>
          </div>
        </div>
      </section>
      <section className="home-howcanwehelp-container">
        <div className="howcanwehelp-txt-container">
          <h2 className="howcanwehelp-head">How can we help your business?</h2>
          <p className="howcanwehelp-txt">
            We're here to help you grow your business and build a strong team.
            We offer a variety of services and tools to help you make the most
            of your freelance and client opportunities.
          </p>
        </div>
        <div className="howcanwehelp-services-container">
          <div className="howcanwehelp-service-row">
            <div className="howcanwehelp-service">
              <img className="howcanwehelp-service-img" src={hcwh1} alt="" />
              <p className="howcanwehelp-service-headtxt">
                {" "}
                Access Top Freelance Talent
              </p>
              <p className="howcanwehelp-service-txt-details">
                We use industry-standard payment processing to ensure your
                freelance and client payments are secure and transparent.
              </p>
            </div>
            <div className="howcanwehelp-service">
              <img className="howcanwehelp-service-img" src={hcwh1} alt="" />
              <p className="howcanwehelp-service-headtxt">
                {" "}
                Access Top Freelance Talent
              </p>
              <p className="howcanwehelp-service-txt-details">
                We use industry-standard payment processing to ensure your
                freelance and client payments are secure and transparent.
              </p>
            </div>
          </div>

          <div className="howcanwehelp-service-row">
            <div className="howcanwehelp-service">
              <img className="howcanwehelp-service-img" src={hcwh1} alt="" />
              <p className="howcanwehelp-service-headtxt">
                {" "}
                Access Top Freelance Talent
              </p>
              <p className="howcanwehelp-service-txt-details">
                We use industry-standard payment processing to ensure your
                freelance and client payments are secure and transparent.
              </p>
            </div>
            <div className="howcanwehelp-service">
              <img className="howcanwehelp-service-img" src={hcwh1} alt="" />
              <p className="howcanwehelp-service-headtxt">
                {" "}
                Access Top Freelance Talent
              </p>
              <p className="howcanwehelp-service-txt-details">
                We use industry-standard payment processing to ensure your
                freelance and client payments are secure and transparent.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="profile-section">
        <h2 className="section-title">Unleash Your Potential Today!</h2>
        <h3 className="section-subtitle">Elevate Your Profile</h3>
        <div className="card-container">
          <div className="card">
            <FaBolt className="card-icon" />
            <h4 className="card-title">Customize Skills</h4>
            <p className="card-description">
              Tailor your profile with a range of skills and expertise.
            </p>
            <a href="#" className="card-link">
              Discover More
            </a>
          </div>
          <div className="card">
            <FaHeart className="card-icon" />
            <h4 className="card-title">Showcase Portfolio</h4>
            <p className="card-description">
              Highlight your best work with ease for potential clients to see.
            </p>
            <a href="#" className="card-link">
              Explore Further
            </a>
          </div>
          <div className="card">
            <FaLock className="card-icon" />
            <h4 className="card-title">Professional Networking</h4>
            <p className="card-description">
              Connect with industry professionals to expand your opportunities.
            </p>
            <a href="#" className="card-link">
              Learn More
            </a>
          </div>
          <div className="card">
            <FaChartLine className="card-icon" />
            <h4 className="card-title">Boost Visibility</h4>
            <p className="card-description">
              Increase your visibility and attract more clients with a standout
              profile.
            </p>
            <a href="#" className="card-link">
              Get Started Now
            </a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-section">
          <h4>A+ Studio</h4>
          <p>
            Leading digital agency with solid design and development expertise.
            We build readymade websites, mobile applications, and elaborate
            online business services.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <img src="/facebook-icon.png" alt="Facebook" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src="/twitter-icon.png" alt="Twitter" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src="/linkedin-icon.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h4>What We Do</h4>
          <ul>
            <li>
              <a href="#">Web Design</a>
            </li>
            <li>
              <a href="#">App Design</a>
            </li>
            <li>
              <a href="#">Social Media Manage</a>
            </li>
            <li>
              <a href="#">Market Analysis Project</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
            <li>
              <a href="#">Become Investor</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Policy</a>
            </li>
            <li>
              <a href="#">Business</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="#">WhatsApp</a>
            </li>
            <li>
              <a href="#">Support 24</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
