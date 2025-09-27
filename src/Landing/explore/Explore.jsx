import { useEffect, useState } from "react";
import "./Explore.css";
import { RiPulseLine } from "react-icons/ri";
import { FiLock } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import {
  FaBolt,
  FaLock,
  FaHeart,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
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

const whatWeDo = [
  {
    icon: RiPulseLine,
    title: "Bridge for Collaboration",
    description:
      "Seamlessly connect clients, freelancers, and companies to work together.",
  },
  {
    icon: FiLock,
    title: "Secure Project Execution",
    description:
      "Ensure trust, transparency, and smooth implementation from idea to delivery.",
  },
  {
    icon: FiTrendingUp,
    title: "Turn Ideas into Projects",
    description:
      "Transform innovative ideas into real, successful projects with expert teams.",
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

  // ✅ Array data for profile section
  const profileCards = [
    {
      cardClass: "card",
      icon: FaBolt,
      iconClass: "card-icon",
      titleClass: "card-title",
      title: "Connect with Talent",
      descriptionClass: "card-description",
      description:
        "Seamlessly connect with freelancers and companies to bring your ideas to life.",
      linkClass: "card-link",
      linkText: "Discover More",
      linkHref: "#",
    },
    {
      cardClass: "card",
      icon: FaHeart,
      iconClass: "card-icon",
      titleClass: "card-title",
      title: "Build Strong Partnerships",
      descriptionClass: "card-description",
      description:
        "Foster long-lasting relationships between clients, freelancers, and businesses.",
      linkClass: "card-link",
      linkText: "Explore Further",
      linkHref: "#",
    },
    {
      cardClass: "card",
      icon: FaLock,
      iconClass: "card-icon",
      titleClass: "card-title",
      title: "Secure Collaboration",
      descriptionClass: "card-description",
      description:
        "Ensure trust and transparency while collaborating on projects from start to finish.",
      linkClass: "card-link",
      linkText: "Learn More",
      linkHref: "#",
    },
    {
      cardClass: "card",
      icon: FaChartLine,
      iconClass: "card-icon",
      titleClass: "card-title",
      title: "Transform Ideas",
      descriptionClass: "card-description",
      description:
        "Turn innovative ideas into successful working projects with expert support.",
      linkClass: "card-link",
      linkText: "Get Started Now",
      linkHref: "#",
    },
  ];
  const services = [
    {
      title: "Business & Compliance",
      items: [
        "Contract drafting",
        "Legal research",
        "Trademark/Patent filing",
        "Regulatory Documentation",
        "Tax and GST filing",
        "Virtual assistance",
        "Data entry",
        "Customer support",
      ],
    },
    {
      title: "Content & Publishing",
      items: [
        "Content development",
        "Translation",
        "Transcription",
        "Copyediting",
        "Proof reading",
        "Artwork",
        "Alt text writing",
        "Document formatting",
      ],
    },
    {
      title: "Creative & Design",
      items: [
        "Graphic designing",
        "Logo designing",
        "Brand identity creation",
        "Packaging design",
        "Motion graphics",
        "UI/UX design",
      ],
    },

    {
      title: "Web & App Development",
      items: [
        "Custom web application development",
        "Mobile app development",
        "Desktop software development",
        "API development & integration",
        "E-commerce website development",
        "CMS development (WordPress, Drupal, etc.)",
      ],
    },
    {
      title: "Front-end, Back-end & Full-stack",
      items: [
        "Front-end development (React, Angular, Vue)",
        "Back-end development (Node.js, Django, Laravel, etc.)",
        "Full-stack development",
        "Progressive Web Apps (PWAs)",
        "Single Page Applications (SPAs)",
        "Mobile app development (React Native, Flutter)",
      ],
    },
    {
      title: "Cloud & DevOps",
      items: [
        "Cloud architecture & migration (AWS, Azure, GCP)",
        "Infrastructure setup & automation",
        "CI/CD pipeline implementation",
        "Server administration & monitoring",
        "Containerization (Docker, Kubernetes)",
        "Cloud security & optimization",
      ],
    },
    {
      title: "AI, Data & Automation",
      items: [
        "Data analytics & BI reporting",
        "Data warehousing & ETL services",
        "Machine learning model development",
        "Chatbot & virtual assistant development",
        "Computer vision & NLP solutions",
        "Database design & administration",
      ],
    },
    {
      title: "Cybersecurity & Compliance",
      items: [
        "Penetration testing & vulnerability assessment",
        "Network security services",
        "Endpoint protection solutions",
        "Security audits & compliance",
        // "Disaster recovery planning",
      ],
    },
    {
      title: "Emerging Technologies",
      items: [
        "Blockchain development",
        "IoT solutions",
        "AR/VR application development",
        "Web3 & DApp development",
      ],
    },
    {
      title: "Maintenance & Support",
      items: [
        "Website and software maintenance",
        "Bug fixing & performance optimization",
        "IT helpdesk services",
        "Remote tech support",
      ],
    },
    {
      title: "Quality Assurance & Testing",
      items: [
        "Manual & automated testing",
        "Mobile & web app testing",
        "Security & performance testing",
        "Usability testing",
      ],
    },
    {
      title: "IT Consulting & Architecture",
      items: [
        "Technology strategy consulting",
        "Software architecture design",
        "IT infrastructure consulting",
        "System integration planning",
      ],
    },
    {
      title: "Industry Solutions",
      items: ["FMCG - Coming soon", "Pharma - Coming soon"],
    },
  ];
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
          {whatWeDo.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="whatwedo">
                <p className="whatwedo-icon">
                  <Icon />
                </p>
                <p className="whatwedo-txt">
                  <b>{item.title}</b>
                  <p className="whatwedo-txt">{item.description}</p>
                </p>
              </div>
            );
          })}
        </div>
        <div className="home-whatwedo-do2-container">
          <img
            className="whatwedo-do2-img"
            src={whatwedoimg}
            alt="ClientsBridge Team"
          />
          <div className="whatwedo-do2-txt-container">
            <p className="whatwedo-do2-headtxt">
              Building bridges between{" "}
              <span style={{ color: "#312F9C" }}>
                businesses and top talent
              </span>
            </p>
            <p className="whatwedo-do2-txt">
              At ClientsBridge, we are committed to helping companies connect
              with skilled freelancers and professionals. Our mission is to
              simplify collaboration, foster growth, and create lasting
              opportunities where businesses and talent succeed together.
            </p>
          </div>
        </div>
      </section>
      <section className="explore-our-services-section">
        <h2 className="section-tit">
          Explore our <span>Services</span>{" "}
        </h2>
        <p className="section-description">
          Comprehensive service tailored to meet your buisness models
        </p>
        <div className="explore-service-div">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3 className="service-card-title">
                <MdOutlineAutoGraph /> {service.title}
              </h3>
              <ul className="list-card">
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {/* <p className="learn-more">
                Learn more <FaArrowRight />
              </p> */}
            </div>
          ))}
        </div>
      </section>
      <section className="profile-section">
        <h2 className="section-title">Unleash Your Potential Today!</h2>
        <h3 className="section-subtitle">Elevate Your Profile</h3>

        <div className="card-container">
          {profileCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={card.cardClass}>
                <span>
                  <Icon className={card.iconClass} />
                  <h4 className={card.titleClass}>{card.title}</h4>
                </span>
                <p className={card.descriptionClass}>{card.description}</p>
                {/* <a href={card.linkHref} className={card.linkClass}>
                  {card.linkText}
                </a> */}
              </div>
            );
          })}
        </div>
      </section>
      <footer className="footer">
        <div className="footer-section">
          <h4>ClientsBridge</h4>
          <p>
            The bridge between clients, freelancers, and companies. We help you
            transform innovative ideas into successful working projects with
            trust and collaboration at the core.
          </p>
        </div>

        <div className="footer-section">
          <h4>What We Do</h4>
          <ul>
            <li>
              <a href="#">Client–Freelancer Matching</a>
            </li>
            <li>
              <a href="#">Project Management</a>
            </li>
            <li>
              <a href="#">Collaboration Tools</a>
            </li>
            <li>
              <a href="#">Secure Payments</a>
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
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Join as Partner</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Policies</a>
            </li>
            <li>
              <a href="#">Guides & Resources</a>
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
              <a href="#">24/7 Support</a>
            </li>
            <li>
              <a href="#">Email Us</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
