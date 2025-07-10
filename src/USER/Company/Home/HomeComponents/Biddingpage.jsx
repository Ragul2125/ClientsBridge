import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../Home.css";
import GlobalPopup from "../../../ReuseableComponents/Popup/GlobalPopup";
import JobDetailsLayout from "../../../ReuseableComponents/job/JobDetailsLayout";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import Load from "../../../ReuseableComponents/Loaders/Load";

const BidView = () => {
  const { jobid } = useParams();
  const [bidAmount, setBidAmount] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [error, setError] = useState("");

  const {
    data: project,
    error: fetchError,
    loading,
    refetch,
  } = useAxiosFetch(`/jobs/getDetails/${jobid}`);

  const handleBidSubmit = async () => {
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
      toast.success("Bid submitted successfully! 🎉");
      refetch(); // Just refetch the data, no redirect
      setBidAmount("");
    } catch (error) {
      console.error("Error submitting bid:", error);
      setError("Failed to submit the bid.");
      toast.error("Failed to submit the bid.");
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

  return (
    <>
      {loading && <Load type={"load"} />}
      {project && (
        <JobDetailsLayout project={project}>
          {project.userBidAmount ? (
            <section className="client-oncooverview-side side2">
              <p className="client-oncooverview-side-texxt">
                The client still did not accept your bid
              </p>
              <p className="client-oncooverview-side-chatbtn">
                Your bid : {project.userBidAmount}
              </p>
              <p className="client-oncooverview-side-head">
                total bids : {project.interested.length}+
              </p>
            </section>
          ) : (
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
          )}
        </JobDetailsLayout>
      )}
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
    </>
  );
};

export default BidView;
