import React, { useState } from "react";
import "./Overview.css";
import dp from "../../../../assets/userdp.svg";
const View = () => {
    const [bids, setBids] = useState([
        { companyName: "Company A", biddedAmount: 1000, logo: dp },
        { companyName: "Company B", biddedAmount: 1200, logo: dp },
        { companyName: "Company C", biddedAmount: 1400, logo: dp },
        { companyName: "Company D", biddedAmount: 1600, logo: dp },
        { companyName: "Company E", biddedAmount: 1800, logo: dp },
        { companyName: "Company F", biddedAmount: 2000, logo: dp },
        { companyName: "Company G", biddedAmount: 2200, logo: dp },
        { companyName: "Company H", biddedAmount: 2400, logo: dp },
        { companyName: "Company I", biddedAmount: 2600, logo: dp },
        { companyName: "Company J", biddedAmount: 2800, logo: dp },
    ]);
    return (
        <>
            <main className="client-jobs-view-main">
                <div className="client-jobs-view-main-detials">
                    <div className="client-jobs-view-main-detials-header">
                        <div>
                            <img
                                className="client-jobs-view-main-detials-header-dp"
                                src={dp}
                                alt=""
                            />
                        </div>
                        <div className="client-jobs-view-main-detials-header-name">
                            <h2>CreativeTech Solution</h2>
                            <p>3 hours ago </p>
                        </div>
                    </div>
                    <div className="client-jobs-view-main-detials-content">
                        <div className="client-jobs-view-main-detials-content-project-title">
                            <h3>Project Title</h3>
                            <p> Mobile E-Commerce Application</p>
                        </div>
                        <div className="client-jobs-view-main-detials-content-overview">
                            <h3>Overview</h3>
                            <p>
                                Design and develop a user-friendly mobile application using
                                Flutter to enhance the online shopping experience. The app will
                                feature intuitive navigation, personalized product
                                recommendations, and a streamlined checkout process with secure
                                payment options. Additional features include real-time order
                                tracking, wishlist management, and push notifications for
                                promotions.
                            </p>
                        </div>
                        <div className="client-jobs-view-main-detials-content-deliverables">
                            <h3>Deliverables</h3>
                            <ul>
                                <li>
                                    A fully functional, responsive online shopping app built with
                                    Flutterr.
                                </li>
                                <li>
                                    Integrated payment gateways and real-time order tracking.
                                </li>
                                <li>UI/UX documentation and user flow diagrams.</li>
                                <li>
                                    GitHub repository with complete codebase and version control.
                                </li>
                            </ul>
                        </div>
                        <div className="client-jobs-view-main-detials-content-contact-information">
                            <h3>Contact Information</h3>
                            <p>
                                Email: <span>alex.johnson@.com</span>
                            </p>
                            <p>
                                Phone No: <span>154248516795</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="client-jobs-view-main-bidded">
                    {bids.map((bids, index) => (

                        <div className="client-jobs-view-main-bidded-cards" key={index}>
                            <div className="client-jobs-view-main-bidded-cards-content">
                                <div className="client-jobs-view-main-bidded-cards-content-dp">
                                    <img src={bids.logo} alt="" />
                                </div>
                                <div className="client-jobs-view-main-bidded-cards-content-name">
                                    <h3>{bids.companyName}</h3>
                                    <p className="client-jobs-view-main-bidded-cards-content-cost">{bids.biddedAmount}</p>
                                </div>
                            </div>
                            <div className="client-jobs-view-main-bidded-cards-accept">
                                <button>Accept</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default View;