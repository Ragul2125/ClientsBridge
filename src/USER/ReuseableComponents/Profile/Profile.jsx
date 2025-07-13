import React, { useEffect, useState } from "react";
import "./profile.css";
import Rating from "@mui/material/Rating";

import { FaRegEdit } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [userData, setUserData] = useState({});
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState({});
  const [newUser, setNewUser] = useState({});
  const [newProfile, setNewProfile] = useState({});
  const [isEditablePersonal, setIsEditablePersonal] = useState(false);

  const toggleEditModePersonal = () => {
    setIsEditablePersonal(!isEditablePersonal);
    setNewUser(userData);
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

  // -------------------project-image-changer-----------------
  const [projectImage, setProjectImage] = useState("");
  const [idA, setIdA] = useState("");

  const changeProjectImage = (newImage, id) => {
    setIdA(id);
    setProjectImage(newImage);
  };

  // Fetch profile data
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/myProfile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfileData(response.data.profileId);
      setUserData(response.data);
      setProjects(response.data.profileId.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Update profile description
  const updateProfileUsers = async (newUser) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/updateUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        {
          newUser,
        }
      );
      if (response.status == 200) {
        setUserData(response.data);
      }
    } catch (error) {
      showPopup(
        error.response?.data?.message || "Failed to update profile",
        "error"
      );
    }
  };
  // Update profile description
  const updateProfileDetails = async (newProfile) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/updateProdileDetails`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        {
          newProfile,
        }
      );
      if (response.status == 200) {
        setProfileData(response.data);
      }
    } catch (error) {
      showPopup(
        error.response?.data?.message || "Failed to update profile",
        "error"
      );
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

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
                <img src={userData.profilePic} />
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
                      {userData.name}
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
                      {userData.userName}
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
                      {userData.role}
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
                  <h3>Role</h3>
                  <div>
                    <p>{userData.role}</p>
                  </div>
                </div>
                <div className="ratings">
                  <h3>Ratings</h3>
                  <div className="star">
                    <Rating
                      name="half-rating-read"
                      defaultValue={profileData.ratings}
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
                    {userData.description}
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
            <div className="professional-details-content">
              <div className="professional-details-content-left">
                {userData.role == "Company" && (
                  <>
                    <div className="ownerName">
                      <h3>Owner Name</h3>
                      <p
                        contentEditable={isEditableProfessional}
                        suppressContentEditableWarning={true}
                        onBlur={(e) =>
                          ProfessionalContentChange(e, "ownerName", index)
                        }
                      >
                        {profileData.ownerName}
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
                        {profileData.managerName}
                      </p>
                    </div>
                  </>
                )}
                <div className="city">
                  <h3>City</h3>
                  <p
                    contentEditable={isEditableProfessional}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => ProfessionalContentChange(e, "city", index)}
                  >
                    {profileData.city}
                  </p>
                </div>
                <div className="state">
                  <h3>State</h3>
                  <p
                    contentEditable={isEditableProfessional}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => ProfessionalContentChange(e, "state", index)}
                  >
                    {profileData.state}
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
                    {profileData.zipCode}
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
                    {profileData.country}
                  </p>
                </div>
              </div>
              <div className="professional-details-content-right">
                {userData.role == "Company" && (
                  <div className="gstNumber">
                    <h3>GST Number</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "gstNumber", index)
                      }
                    >
                      {profileData.gstNumber}
                    </p>
                  </div>
                )}
                {userData.role == "Company" && (
                  <div className="licenseNumber">
                    <h3>License Number</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "licenseNumber", index)
                      }
                    >
                      {profileData.licenseNumber}
                    </p>
                  </div>
                )}
                {userData.role == "Company" && (
                  <div className="size">
                    <h3>Company Size</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "sizeOfCompany", index)
                      }
                    >
                      {profileData.size}
                    </p>
                  </div>
                )}

                {profileData?.dob && (
                  <div className="address">
                    <h3>Date of Birth</h3>
                    <p
                      contentEditable={isEditableProfessional}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        ProfessionalContentChange(e, "address", index)
                      }
                    >
                      {profileData?.dob?.substring(0, 10)}
                    </p>
                  </div>
                )}
                <div className="phoneNumber">
                  <h3>Phone Number</h3>
                  <p
                    contentEditable={isEditableProfessional}
                    suppressContentEditableWarning={true}
                    onBlur={(e) =>
                      ProfessionalContentChange(e, "phoneNo", index)
                    }
                  >
                    {profileData.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="btn">
              {isEditableProfessional && (
                <button onClick={handleUpdate} style={{ marginTop: "1em" }}>
                  Update
                </button>
              )}
            </div>
          </div>

          {/* -------------Review-details--------------- */}
          {profileData?.reviews.length > 0 && (
            <div className="profile-container-review">
              <h2>Reviews</h2>
              <div className="review-container">
                {profileData?.reviews?.map((r, index) => (
                  <div className="review-cards" key={index}>
                    <div className="review-profile">
                      <img src={r.reviewByUserId.profilePic} alt="" />
                      <div className="username-stars">
                        <div className="username">
                          <p>{r.reviewByUserId.name}</p>
                          <p className="rev-user-name">
                            @{r.reviewByUserId.userName}
                          </p>
                        </div>
                        <div className="stars">
                          <p>
                            {[...Array(r.stars)].map((_, index) => (
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
          )}
          {/* ---------------------Project------------------ */}
          {profileData?.projects?.length > 0 && (
            <div className="profile-container-own-projects">
              <div className="project-container-heading">
                <h2>Projects</h2>
                <Link to="addprojects">
                  <button>Add</button>
                </Link>
              </div>

              <div className="projects-container">
                {profileData?.projects?.map((details, index) => (
                  <div className="projects-cards" key={index}>
                    <div className="projects-images">
                      <div className="viewing-image">
                        {/* Display the clicked image here */}
                        <img
                          src={
                            details._id == idA
                              ? projectImage
                              : details.images[0]
                          }
                          alt="Project Main View"
                        />
                      </div>

                      <div className="carousel-image-list">
                        {details.images.map((img, imgIndex) => (
                          <div className="carousel-image" key={imgIndex}>
                            <img
                              onClick={() =>
                                changeProjectImage(img, details._id)
                              }
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
          )}
        </div>
      </main>
      <Outlet />
    </>
  );
};

export default Profile;
