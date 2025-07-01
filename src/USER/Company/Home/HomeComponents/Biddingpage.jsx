import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dp from "../../../../assets/profileImg.svg";
import "../Home.css";
import GlobalPopup from "../../../ReuseableComponents/Popup/GlobalPopup";
import JobDetailsLayout from "../../../ReuseableComponents/job/JobDetailsLayout";

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
    <JobDetailsLayout project={project}>
      <section className="client-oncooverview-side side2">
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
        <div className="company-home-bidded-view-container-btn">
          <button onClick={openPopup}>Bid</button>
        </div>
      </section>
      ;
    </JobDetailsLayout>
  );
};

export default BidView;
