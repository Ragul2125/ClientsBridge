import React, { useState } from "react";
import "./Profile.css";
// import Profiledp from './assets/Pdp.png'
import icon from "../../assets/userdp.svg";
import { LiaStarSolid } from "react-icons/lia";

import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
    // ----------------profile---------------------------
    const [profileData, setProfileData] = useState({
        name: "Ragul",
        username: "ragul@123",
        role: "Freelancer",
        description: "Description about them",
        email: "abc@gmail.com",
    });
    // ---------------Editing-----------------------------

    const [isEditablePersonal, setIsEditablePersonal] = useState(false);
    const [isEditableProfessional, setIsEditableProfessional] = useState(false);

    const handleContentChange = (e, field) => {
        setProfileData({
            ...profileData,
            [field]: e.target.innerText,
        });
    };

    const toggleEditModePersonal = () => {
        setIsEditablePersonal(!isEditablePersonal);
    };
    const toggleEditModProfessional = () => {
        setIsEditableProfessional(!isEditableProfessional);
    };

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
                                            onBlur={(e) => handleContentChange(e, "name")}
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
                                            onBlur={(e) => handleContentChange(e, "username")}
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
                                            onBlur={(e) => handleContentChange(e, "role")}
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
                                        <LiaStarSolid />
                                        <LiaStarSolid />
                                        <LiaStarSolid />
                                        <LiaStarSolid />
                                        <LiaStarSolid />
                                    </div>
                                </div>
                            </div>
                            <div className="description">
                                <h3>Description</h3>
                                <div className="des">
                                    <p
                                        contentEditable={isEditablePersonal}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleContentChange(e, "description")}
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
                        <div className="professional-details-content">
                            <div className="professional-details-content-left">
                                <div className="ownerName">
                                    <h3>Owner Name</h3>
                                    <p>abc</p>
                                </div>
                                <div className="managerName">
                                    <h3>Manager Name</h3>
                                    <p>Manager</p>
                                </div>
                                <div className="city">
                                    <h3>City</h3>
                                    <p>uk</p>
                                </div>
                                <div className="state">
                                    <h3>State</h3>
                                    <p>tn</p>
                                </div>
                                <div className="zipCode">
                                    <h3>Zip code</h3>
                                    <p>45678</p>
                                </div>
                                <div className="country">
                                    <h3>Country</h3>
                                    <p>USA</p>
                                </div>
                            </div>
                            <div className="professional-details-content-right">
                                <div className="gstNumber">
                                    <h3>GST Number</h3>
                                    <p>hbfsdjvb54678</p>
                                </div>
                                <div className="licenseNumber">
                                    <h3>License Number</h3>
                                    <p>468545214357464</p>
                                </div>
                                <div className="size">
                                    <h3>Company Size</h3>
                                    <p>111</p>
                                </div>
                                <div className="address">
                                    <h3>Address</h3>
                                    <p>cv mnzb nljnvndfjvnjfnd,m sflkvnnv nm,n .</p>
                                </div>
                                <div className="phoneNumber">
                                    <h3>Phone Number</h3>
                                    <p>354654315295</p>
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
                                                <p>{r.stars}</p>
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
                        <h2>Projects</h2>
                        <div className="projects-container">
                            <div className="projects-cards">
                                <div className="project-cards-name">

                                </div>
                                <div className="project-cards-description">

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </>
    );
};

export default Profile;