import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Overview.css";
import dp from "../../../../assets/userdp.svg";
import GlobalPopup from "../../../../ReuseableComponents/Popup/GlobalPopup";

const View = () => {
  const { viewid } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // To toggle the popup
  const [selectedBid, setSelectedBid] = useState(null); // To track the selected bid
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/jobs/getActiveJobDetail/${viewid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const jobData = response.data;
        console.log("Fetched Bids:", jobData.interested); // Log the bids array

        setProject({
          postTitle: jobData.postTitle,
          description: jobData.description,
          budget: jobData.budget,
          deadline: jobData.deadline,
          category: jobData.category,
          tags: jobData.tags || [],
          files: jobData.files || [],
        });
        setBids(jobData.interested || []);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [viewid]);

  // Handle job acceptance
  const handleAccept = async () => {
    if (!selectedBid) {
      console.error("No bid selected.");
      return;
    }

    const userId = selectedBid.userId || selectedBid._id || selectedBid.id; // Dynamically check for userId
    if (!userId) {
      console.error("Bid does not contain a valid userId:", selectedBid);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Selected Bid UserId:", userId);

      const response = await axios.post(
        `${API_URL}/api/jobs/accept/${viewid}`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Job accepted:", response.data);
      navigate("/client/jobs/ongoing");
    } catch (error) {
      console.error("Error accepting job:", error);
    }
  };

  // Open the popup when a bid is selected
  const openPopup = (bid) => {
    console.log("Opening popup for bid:", bid); // Log bid to verify structure
    setSelectedBid(bid);
    setShowPopup(true);
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedBid(null);
  };

  // Loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="client-jobs-view-main">
      <section className="client-profileoverview-inner client-oncooverview-inner">
        {/* Job details */}
        <p className="client-profileoverview-inner-title">
          <h1>{project.postTitle}</h1>
          <span className="client-profileoverview-inner-time">3 hours ago</span>
        </p>
        <p className="client-profileoverview-inner-threedot">...</p>
        <div className="client-profileoverview-inner-des">
          {/* Job description and details */}
          <p className="client-profileoverview-inner-des-head">Overview</p>
          <p className="client-profileoverview-inner-des-subtxt">
            {project.description}
          </p>
          {/* Tags and Files */}
        </div>
      </section>

      <div className="client-jobs-view-main-bidded">
        {bids.length > 0 ? (
          bids.map((bid, index) => (
            <div className="client-jobs-view-main-bidded-cards" key={index}>
              <div className="client-jobs-view-main-bidded-cards-content">
                <div className="client-jobs-view-main-bidded-cards-content-dp">
                  <img src={bid.profilePic || dp} alt={bid.name || "User"} />
                </div>
                <div className="client-jobs-view-main-bidded-cards-content-name">
                  <h3>{bid.name}</h3>
                  <p className="client-profileoverview-inner-des-subtxt">
                    {bid.description}
                  </p>
                </div>
              </div>
              <div className="client-jobs-view-main-bidded-cards-accept">
                <button onClick={() => openPopup(bid)}>Accept</button>
              </div>
            </div>
          ))
        ) : (
          <p>No bids yet</p>
        )}
      </div>

      {showPopup && (
        <GlobalPopup
          text={`Are you sure you want to accept the job for ${selectedBid.name}?`}
          buttons={[
            {
              label: "Confirm",
              className: "confirm-button",
              onClick: handleAccept,
            },
            {
              label: "Cancel",
              className: "cancel-button",
              onClick: closePopup,
            },
          ]}
        />
      )}
    </main>
  );
};

export default View;
