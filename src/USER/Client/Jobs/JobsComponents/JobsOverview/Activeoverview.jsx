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
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

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
        console.log("Fetched Bids:", jobData.interested);

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

  const handleAccept = async () => {
    if (!selectedBid) {
      console.error("No bid selected.");
      return;
    }

    const userId = selectedBid.userId || selectedBid._id || selectedBid.id;
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

  const openPopup = (bid) => {
    console.log("Opening popup for bid:", bid);
    setSelectedBid(bid);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBid(null);
  };
  const handleChat = async (bid) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/message/createconvo`,
        { receiverId: bid._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/client/chat");
      console.log("Conversation created:", response.data);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="client-jobs-view-main">
      <section className="client-profileoverview-inner client-oncooverview-inner">
        {/* <img className="client-profileoverview-inner-dp" src={dp} alt="User" /> */}
        <p className="client-profileoverview-inner-title">
          <h1>{project.postTitle}</h1>
          <span className="client-profileoverview-inner-time">
            {new Date(project.deadline).toLocaleDateString()}
          </span>
        </p>
        <p className="client-profileoverview-inner-threedot">...</p>

        {/* --------------------------------------------------------------------DESC------------------ */}
        <div className="client-profileoverview-inner-des">
          {/* <p className="client-profileoverview-inner-des-head">Project Title</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className='client-profileoverview-inner-des-subhead'>Name of the Project: </span> Mobile E-Commerce Application
                    </p> */}

          <p className="client-profileoverview-inner-des-head">Overview</p>
          <p className="client-profileoverview-inner-des-subtxt">
            {project.description}
          </p>
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
                ₹ {project.budget}
              </p>
            </div>
            <div>
              <p className="client-profileoverview-inner-des-head">Category</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {project.category}
              </p>
            </div>
          </div>

          <p className="client-profileoverview-inner-des-head">Tags</p>
          <p className="client-profileoverview-inner-des-tags">
            {project.tags.map((tag, i) => (
              <p className="job-tag-seps">{tag}</p>
            ))}
          </p>
          <p className="client-profileoverview-inner-des-head">Files</p>
          <p className="client-profileoverview-inner-des-file">
            {project.files.map((file, i) => (
              <p>
                <a href={file}>file {i + 1}</a>
              </p>
            ))}
          </p>
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
                    {bid?.userName}
                  </p>
                </div>
              </div>
              <div className="btn">
                <div className="client-jobs-view-main-bidded-cards-chat">
                  <button onClick={() => handleChat(bid)}>chat</button>
                </div>
                <div className="client-jobs-view-main-bidded-cards-accept">
                  <button onClick={() => openPopup(bid)}>Accept</button>
                </div>
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
