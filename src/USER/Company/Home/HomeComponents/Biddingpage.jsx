import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dp from "../../../../assets/profileImg.svg";
import "../Home.css";

const BidView = () => {
  const { jobid } = useParams();
  const [project, setProject] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        `${import.meta.env.VITE_BACKEND_URL}/api/bid`,
        { jobId: jobid, amount: bidAmount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccessMessage(response.data.message);
      setError("");
      setBidAmount("");
    } catch (error) {
      console.error("Error submitting bid:", error);
      setError("Failed to submit the bid.");
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <main className="company-home-bidded-view">
      <div className="company-home-bidded-view-container">
        <div className="company-home-bidded-view-container-header">
          <img src={project.clientID.profilePic || dp} alt="Icon" />
          <h1>{project.postTitle}</h1>
          <p>{project.clientID.userName}</p>
        </div>
        <div className="company-home-bidded-view-container-overview">
          <h2>Role Overview</h2>
          <p>{project.description}</p>
        </div>
        <div className="company-home-bidded-view-container-details">
          <div className="biding-amount">
            <h3>Bidding Amount</h3>
            <div className="amount">
              <input
                type="number"
                placeholder="Enter the bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <div className="company-home-bidded-view-container-btn">
          <button onClick={handleBidSubmit}>Bid</button>
        </div>
      </div>
    </main>
  );
};

export default BidView;
