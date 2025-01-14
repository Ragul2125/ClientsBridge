import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dp from "../../../../assets/profileImg.svg";
import "../Home.css";
import GlobalPopup from "../../../ReuseableComponents/Popup/GlobalPopup";

const BidView = () => {
  const { jobid } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs/getDetails/${jobid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to fetch job details.");
      }
    };

    fetchProject();
  }, [jobid]);

  const handleBidSubmit = async () => {
    if (!bidAmount) {
      setError("Please enter a valid bid amount.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/biddings/bid`,
        { jobId: jobid, amount: bidAmount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setError("");
      setIsPopupVisible(false);
      alert("Bid submitted successfully! Redirecting to home...");
      navigate("/" + localStorage.getItem("role")); // Navigate to home page upon success
    } catch (error) {
      console.error("Error submitting bid:", error);
      setError("Failed to submit the bid.");
    }
  };

  const openPopup = () => {
    if (!bidAmount) {
      setError("Please enter a valid bid amount.");
      return;
    }
    setError("");
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  if (!project) return <p>Loading...</p>;

  return (
    <main className="company-home-bidded-view">
      <div className="company-home-bidded-view-container">
        <div className="company-home-bidded-view-container-header">
          <img src={project.clientID.profilePic || dp} alt="Icon" />
          <div>
            <h1>{project.postTitle}</h1>
            <p>@{project.clientID.userName}</p>
          </div>
        </div>
        <div className="company-home-bidded-view-container-overview">
          <h2>Role Overview</h2>
          <p>{project.description}</p>
        </div>
        <div className="client-profileoverview-inner-side-byside">
          <div>
            {" "}
            <p className="client-profileoverview-inner-des-head">Deadline</p>
            <p className="client-profileoverview-inner-des-subtxt">
              {new Date(project.deadline).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="client-profileoverview-inner-des-head">Budget</p>
            <p className="client-profileoverview-inner-des-subtxt">
              {project.budget}
            </p>
          </div>
          <div>
            <p className="client-profileoverview-inner-des-head">Category</p>
            <p className="client-profileoverview-inner-des-subtxt">
              {project.category}
            </p>
          </div>
        </div>
        {project.tags.length > 0 && (
          <>
            <p className="client-profileoverview-inner-des-head">Tags</p>
            <p className="client-profileoverview-inner-des-tags">
              {project.tags.map((tag, i) => (
                <p className="job-tag-seps">{tag}</p>
              ))}
            </p>
          </>
        )}
        {project.files.length > 0 && (
          <>
            <p className="client-profileoverview-inner-des-head">Files</p>
            <p className="client-profileoverview-inner-des-file">
              {project.files.map((file, i) => (
                <p>
                  <a target="_blank" href={file}>
                    file {i + 1}
                  </a>
                </p>
              ))}
            </p>
          </>
        )}
        <div className="company-home-bidded-view-container-details">
          <div className="biding-amount">
            <h3>Bidding Amount</h3>
            <div className="amount">
              <input
                type="number"
                placeholder="Enter the bid amount (₹)"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        {error && <p className="error">{error}</p>}

        {isPopupVisible && (
          <GlobalPopup
            text={`Confirm your bid of ₹${bidAmount}?`}
            className="confirm-bid-popup"
            buttons={[
              {
                label: "Confirm",
                className: "confirm",
                onClick: handleBidSubmit,
              },
              {
                label: "Cancel",
                className: "cancel",
                onClick: closePopup,
              },
            ]}
          />
        )}

        <div className="company-home-bidded-view-container-btn">
          <button onClick={openPopup}>Bid</button>
        </div>
      </div>
    </main>
  );
};

export default BidView;
