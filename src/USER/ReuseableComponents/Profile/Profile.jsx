import React, { useState } from "react";
import "./profile.css";
// import Profiledp from './assets/Pdp.png'
import icon from "../../assets/userdp.svg";
import { LiaStarSolid } from "react-icons/lia";
import image1 from "../../assets/userdp.svg";
import image from "../../assets/userdp.svg";
import image2 from "../../assets/userdp.svg";
import image3 from "../../assets/userdp.svg";
import image4 from "../../assets/userdp.svg";
import image5 from "../../assets/userdp.svg";
// -------------for-rating----------------
// ---------------install-MUI--------------
// npm install @mui/material @emotion/react @emotion/styled
import Rating from "@mui/material/Rating";

import { FaRegEdit } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  // ----------------personal-details--------------------------
  const [profileData, setProfileData] = useState({
    name: "Ragul",
    username: "ragul@123",
    role: "Freelancer",
    description: "Description about them",
    email: "abc@gmail.com",
  });

  // -------------------professional-details---------------------
  const [professionalDetails, setProfessionalDetails] = useState([
    {
      ownerName: "John Doe",
      managerName: "Jane Smith",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      gstNumber: "GST123456789",
      licenseNumber: "LIC987654321",
      sizeOfCompany: 150, // number of employees
      address: "123 Main Street, New York, NY 10001",
      phoneNo: 97654567878,
    },
  ]);

  // ---------------Editing-----------------------------

  // --------------personal-content-edit-------------------------

  const [isEditablePersonal, setIsEditablePersonal] = useState(false);

  const toggleEditModePersonal = () => {
    setIsEditablePersonal(!isEditablePersonal);
  };

  const personalContentChange = (e, field) => {
    setProfileData({
      ...profileData,
      [field]: e.target.innerText,
    });
  };

  // --------------professional-content-edit-------------------------

  const [isEditableProfessional, setIsEditableProfessional] = useState(false);

  const toggleEditModProfessional = () => {
    setIsEditableProfessional(!isEditableProfessional);
  };
  const ProfessionalContentChange = (e, field, index) => {
    const updatedValue = e.target.textContent;
    setProfessionalDetails((prevDetails) =>
      prevDetails.map((professional, i) =>
        i === index ? { ...professional, [field]: updatedValue } : professional
      )
    );
  };

  // const ProfessionalContentChange = (e, field) => {
  //   setProfessionalDetails({
  //     ...professionalDetails,
  //     [field]: e.target.innerText,
  //   });
  // };
  // -----------------update-change------------------
  const handleUpdate = () => {
    console.log("Updated profile data:", profileData);
    alert("Profile updated!");
    setIsEditablePersonal(false);
    setIsEditableProfessional(false);
  };
  // ---------------Review-array-------------------
  const [reviews, setReviews] = useState([
    {
      description:
        "This product exceeded my expectations in every way. The build quality is fantastic, and it works like a charm. I highly recommend it to anyone looking for something reliable.",
      byUsername: "Alice",
      stars: 5,
    },
    {
      description:
        "The product is okay, but I feel it could have been better for the price. It does its job, but the quality seems a bit off.",
      byUsername: "Bob",
      stars: 3,
      dp: icon,
    },
    {
      description:
        "I was disappointed with this purchase. It didn't perform as advertised, and I ended up returning it after a week.",
      byUsername: "Charlie",
      stars: 2,
      dp: icon,
    },
    {
      description:
        "Amazing experience! The customer service was top-notch, and the product itself is worth every penny.",
      byUsername: "Diana",
      stars: 5,
      dp: icon,
    },
    {
      description:
        "The service was okay, but it could be improved. The product arrived late, but it works fine.",
      byUsername: "Eve",
      stars: 3,
      dp: icon,
    },
    {
      description:
        "Very satisfying purchase. I use this daily, and it has made my life much easier. Great value for the money!",
      byUsername: "Frank",
      stars: 4,
      dp: icon,
    },
    {
      description:
        "Terrible experience. The product broke after just two uses, and I couldn't get a refund.",
      byUsername: "Grace",
      stars: 1,
      dp: icon,
    },
    {
      description:
        "Highly recommend this! It works flawlessly and even better than I imagined. I'm very happy with this purchase.",
      byUsername: "Henry",
      stars: 5,
      dp: icon,
    },
    {
      description:
        "Terrible experience. The product broke after just two uses, and I couldn't get a refund.",
      byUsername: "Grace",
      stars: 1,
      dp: icon,
    },
    {
      description:
        "Highly recommend this! It works flawlessly and even better than I imagined. I'm very happy with this purchase.",
      byUsername: "Henry",
      stars: 5,
      dp: icon,
    },
  ]);
  // ------------------project-image-----------------
  const projects = [
    {
      id: 1,
      name: "Portfolio",
      description:
        "An image is a visual representation. An image can be two-dimensional, such as a drawing, painting, or photograph, or three-dimensional, such as a carving or sculpture.",
      images: [image1, image2, image3, image4, image5],
      skillsUsed: ["HTML", "CSS"],
    },
    {
      id: 2,
      name: "E-commerce Website",
      description:
        "A project to build a scalable e-commerce platform with payment integration, product listing, and a secure backend.",
      images: [image1, image, image3, image4, image5],
      skillsUsed: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 3,
      name: "Blog Platform",
      description:
        "A content-focused blog platform that allows users to write, edit, and share articles, including a commenting system.",
      images: [image1, image2, image3, image4, image5],
      skillsUsed: ["Vue.js", "Firebase", "Tailwind CSS"],
    },
    {
      id: 4,
      name: "Weather App",
      description:
        "A weather forecasting app displaying current conditions, hourly, and weekly forecasts using an external API.",
      images: [image1, image2, image3, image4, image5],
      skillsUsed: ["JavaScript", "OpenWeather API", "Bootstrap"],
    },
    {
      id: 5,
      name: "Social Media App",
      description:
        "A social networking app allowing users to create profiles, post updates, follow others, and engage through likes and comments.",
      images: [image3, image2, image1, image4, image5],
      skillsUsed: ["Flutter", "Firebase", "Dart"],
    },
  ];
  // -------------------project-image-changer-----------------
  const [projectImage, setProjectImage] = useState("");
  const [idA, setIdA] = useState("");

  const changeProjectImage = (newImage, id) => {
    setIdA(id);
    setProjectImage(newImage);
  };
  // --------------------ratings-stars---------------------
  // -----for--review-------
  const maxRating = 5;
  // -------------ratings----------
  const rating = 4.5;

  return (
    <>
      <main className="profile-pg">
        <div className="profile-container">
          {/* -------------personal-details--------------- */}
          <div className="profile-container-personal-details">
            <div className="edit">
              <span
                className="edit-icon"
                onClick={toggleEditModePersonal}
                style={{ color: "blue", cursor: "pointer" }}
              >
                <FaRegEdit /> {isEditablePersonal ? "Cancel" : "Edit"}
              </span>
            </div>
            <div className=" profile-container-personal-details-user ">
              <div className="profile-container-personal-details-content-dp">
                <img src={icon} />
              </div>
              <div className="profile-container-personal-details-content-user-fields">
                <div className="name">
                  <h3>Name</h3>
                  <div>
                    <p
                      contentEditable={isEditablePersonal}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => personalContentChange(e, "name")}
                    >
                      {profileData.name}
                    </p>
                  </div>
                </div>
                <div className="user-name">
                  <h3>User Name</h3>
                  <div>
                    <p
                      contentEditable={isEditablePersonal}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => personalContentChange(e, "username")}
                    >
                      {profileData.username}
                    </p>
                  </div>
                </div>
                <div className="role">
                  <h3>Role</h3>
                  <div>
                    <p
                      contentEditable={isEditablePersonal}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => personalContentChange(e, "role")}
                    >
                      {profileData.role}
                    </p>
                  </div>
                </div>
                <div className="password">
                  <h3>Password</h3>
                  <div>
                    <p>*</p>
                  </div>
                  <p className="forgot">Forgot password</p>
                </div>
              </div>
            </div>
            <div className="profile-container-personal-details-content-user-mails-description">
              <div className="mail-ratings">
                <div className="mail">
                  <h3>Mail ID</h3>
                  <div>
                    <p>{profileData.email}</p>
                  </div>
                </div>
                <div className="ratings">
                  <h3>Ratings</h3>
                  <div className="star">
                    <Rating
                      name="half-rating-read"
                      defaultValue={rating}
                      precision={0.5}
                      readOnly
                      sx={{ fontSize: 30 }}
                    />
                  </div>
                </div>
              </div>
              <div className="description">
                <h3>Description</h3>
                <div className="des">
                  <p
                    contentEditable={isEditablePersonal}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => personalContentChange(e, "description")}
                  >
                    {profileData.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="btn">
              {isEditablePersonal && (
                <button onClick={handleUpdate} style={{ marginTop: "1em" }}>
                  Update
                </button>
              )}
            </div>
          </div>
          {/* -------------professional-details--------------- */}
          <div className="profile-container-professional-details">
            <div className="edit">
              <span
                className="edit-icon"
                onClick={toggleEditModProfessional}
                style={{ color: "blue", cursor: "pointer" }}
              >
                <FaRegEdit /> {isEditableProfessional ? "Cancel" : "Edit"}
              </span>
            </div>
            {professionalDetails.map((professional, index) => (
              <div className="professional-details-content" key={index}>
                <div className="professional-details-content-left">
                  <div className="ownerName">
                    <h3>Owner Name</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "ownerName", index)
                      }
                    >
                      {professional.ownerName}
                    </p>
                  </div>
                  <div className="managerName">
                    <h3>Manager Name</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "managerName", index)
                      }
                    >
                      {professional.managerName}
                    </p>
                  </div>
                  <div className="city">
                    <h3>City</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "city", index)
                      }
                    >
                      {professional.city}
                    </p>
                  </div>
                  <div className="state">
                    <h3>State</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "state", index)
                      }
                    >
                      {professional.state}
                    </p>
                  </div>
                  <div className="zipCode">
                    <h3>Zip Code</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "zipCode", index)
                      }
                    >
                      {professional.zipCode}
                    </p>
                  </div>
                  <div className="country">
                    <h3>Country</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "country", index)
                      }
                    >
                      {professional.country}
                    </p>
                  </div>
                </div>
                <div className="professional-details-content-right">
                  <div className="gstNumber">
                    <h3>GST Number</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "gstNumber", index)
                      }
                    >
                      {professional.gstNumber}
                    </p>
                  </div>
                  <div className="licenseNumber">
                    <h3>License Number</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "licenseNumber", index)
                      }
                    >
                      {professional.licenseNumber}
                    </p>
                  </div>
                  <div className="size">
                    <h3>Company Size</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "sizeOfCompany", index)
                      }
                    >
                      {professional.sizeOfCompany}
                    </p>
                  </div>
                  <div className="address">
                    <h3>Address</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "address", index)
                      }
                    >
                      {professional.address}
                    </p>
                  </div>
                  <div className="phoneNumber">
                    <h3>Phone Number</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "phoneNo", index)
                      }
                    >
                      {professional.phoneNo}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="btn">
              {isEditableProfessional && (
                <button onClick={handleUpdate} style={{ marginTop: "1em" }}>
                  Update
                </button>
              )}
            </div>
          </div>

          {/* -------------Review-details--------------- */}
          <div className="profile-container-review">
            <h2>Reviews</h2>
            <div className="review-container">
              {reviews.map((r, index) => (
                <div className="review-cards" key={index}>
                  <div className="review-profile">
                    <img src={icon} alt="" />
                    <div className="username-stars">
                      <div className="username">
                        <p>{r.byUsername}</p>
                      </div>
                      <div className="stars">
                        <p>
                          {[...Array(maxRating)].map((_, index) => (
                            <span key={index}>
                              {index < r.stars ? "★" : "☆"}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="des">
                    <p>{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ---------------------Project------------------ */}
          <div className="profile-container-own-projects">
            <div className="project-container-heading">
              <h2>Projects</h2>
              <Link to="addprojects">
                <button>Add</button>
              </Link>
            </div>

            <div className="projects-container">
              {projects.map((details, index) => (
                <div className="projects-cards" key={index}>
                  <div className="projects-images">
                    <div className="viewing-image">
                      {/* Display the clicked image here */}
                      <img
                        src={
                          details.id == idA ? projectImage : details.images[0]
                        }
                        alt="Project Main View"
                      />
                    </div>

                    <div className="carousel-image-list">
                      {details.images.map((img, imgIndex) => (
                        <div className="carousel-image" key={imgIndex}>
                          <img
                            onClick={() => changeProjectImage(img, details.id)}
                            src={img}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="about-projects">
                    <div className="project-cards-name">
                      <h1>{details.name}</h1>
                    </div>
                    <div className="project-cards-description">
                      <p>{details.description}</p>
                    </div>
                    <div className="skills-used">
                      {details.skillsUsed.map((skill, skillIndex) => (
                        <p key={skillIndex}>{skill}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Outlet />
    </>
  );
};

export default Profile;
