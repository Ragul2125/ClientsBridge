import React, { useEffect, useState } from "react";
import "./Profile.css";
import Rating from "@mui/material/Rating";

import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const PublicProfile = ({ viewid, onClose }) => {
  const [profileData, setProfileData] = useState({});
  const [userData, setUserData] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);



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
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/others/${viewid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // The response structure from /others/:id
      // The response structure from /others/:id
      setUserData(response.data);
      setProfileData(response.data.profileId || {});
      setProjects(response.data.profileId?.projects || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load generic profile data.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    if (viewid) {
      fetchProfile();
    }
  }, [viewid]);

  if (loading) return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <LoaderCircle className="spinner-icon auth-loading" style={{ width: "50px", height: "50px", color: "white" }} />
    </div>
  );

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)", zIndex: 9999,
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        position: "relative", width: "100%", maxWidth: "1200px",
        maxHeight: "90vh", overflowY: "auto", backgroundColor: "#f8f9fa",
        borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "20px", right: "20px",
            background: "#ff4d4f", color: "white", border: "none",
            borderRadius: "50%", width: "35px", height: "35px",
            cursor: "pointer", zIndex: 10, fontSize: "16px",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}
        >
          X
        </button>
        <main className="profile-pg" style={{ margin: 0, minHeight: "auto", paddingTop: "40px" }}>
          <div className="profile-container">
            {/* -------------personal-details--------------- */}
            <div className="profile-container-personal-details">
              <div className=" profile-container-personal-details-user ">
                <div className="profile-container-personal-details-content-dp">
                  <img src={userData.profilePic} alt="User DP" />
                </div>
                <div className="profile-container-personal-details-content-user-fields">
                  <div className="name">
                    <h3>Name</h3>
                    <div>
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="user-name">
                    <h3>User Name</h3>
                    <div>
                      <p>{userData.userName}</p>
                    </div>
                  </div>
                  <div className="role">
                    <h3>Role</h3>
                    <div>
                      <p>{userData.role}</p>
                    </div>
                  </div>
                  {/* No password view on public profile */}
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
                        defaultValue={profileData.ratings || 0}
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
                    <p>{profileData?.description || userData?.description}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* -------------professional-details--------------- */}
            <div className="profile-container-professional-details">
              <div className="professional-details-content">
                <div className="professional-details-content-left">
                  {userData.role === "Company" && (
                    <>
                      <div className="ownerName">
                        <h3>Owner Name</h3>
                        <p>{profileData.ownerName}</p>
                      </div>
                      <div className="managerName">
                        <h3>Manager Name</h3>
                        <p>{profileData.managerName}</p>
                      </div>
                    </>
                  )}
                  <div className="city">
                    <h3>City</h3>
                    <p>{profileData?.city}</p>
                  </div>
                  <div className="state">
                    <h3>State</h3>
                    <p>{profileData?.state}</p>
                  </div>
                  <div className="zipCode">
                    <h3>Zip Code</h3>
                    <p>{profileData?.zipCode}</p>
                  </div>
                  <div className="country">
                    <h3>Country</h3>
                    <p>{profileData?.country}</p>
                  </div>
                </div>
                <div className="professional-details-content-right">
                  {userData.role === "Company" && (
                    <div className="gstNumber">
                      <h3>GST Number</h3>
                      <p>{profileData?.gstNumber}</p>
                    </div>
                  )}
                  {userData.role === "Company" && (
                    <div className="licenseNumber">
                      <h3>License Number</h3>
                      <p>{profileData?.licenseNumber}</p>
                    </div>
                  )}
                  {userData.role === "Company" && (
                    <div className="size">
                      <h3>Company Size</h3>
                      <p>{profileData?.size}</p>
                    </div>
                  )}

                  {profileData?.dob && (
                    <div className="address">
                      <h3>Date of Birth</h3>
                      <p>{profileData?.dob?.substring(0, 10)}</p>
                    </div>
                  )}
                  <div className="phoneNumber">
                    <h3>Phone Number</h3>
                    <p>{profileData?.phoneNumber}</p>
                  </div>
                  {profileData?.socialUrls?.length > 0 && (
                    <div className="socialUrls">
                      <h3>Social Links</h3>
                      {profileData.socialUrls.map((url, idx) => (
                        <p key={idx}>
                          <a href={url} target="_blank" rel="noreferrer">{url}</a>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* -------------Review-details--------------- */}
            {profileData?.reviews?.length > 0 && (
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
      </div>
    </div>
  );
};
export default PublicProfile;
