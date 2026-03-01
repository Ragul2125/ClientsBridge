import "../OrderList.css";
import { FaEye } from "react-icons/fa";
import sm from "../../../assets/image/companyicon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import JobAssignPopup from "./JobAssignPopup";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Load from "../../../USER/ReuseableComponents/Loaders/Load";
import PublicProfile from "../../../USER/ReuseableComponents/Profile/PublicProfile";

export default function Orders({ type }) {
  const id = window.location.pathname.split("/").pop();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const {
    data: jobDetail,
    loading,
    error,
    refetch,
  } = useAxiosFetch(`/admin/getJobDetailsByState/${id}?state=${type}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleMarkAsCompleted = async () => {
    if (!window.confirm("Are you sure you want to mark this job as completed?")) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/markcompleted/${jobDetail._id
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      refetch();
    } catch (error) {
      toast.error("Failed to mark the job as completed");
      console.error(`[handleMarkAsCompleted] Error:`, error);
    }
  };

  const handleSendToBidding = async () => {
    if (!window.confirm("Are you sure you want to send this job to bidding?")) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/sendToBidding/${jobDetail._id
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      navigate("/admin/jobs/active");
    } catch (error) {
      toast.error("Failed to send the job to bidding");
      console.error(`[handleSendToBidding] Error:`, error);
    }
  };

  if (loading) return <Load type="load" />;
  if (error) return <p className="error">{error}</p>;
  if (!jobDetail?._id) return null;

  return (
    <>
      <main className="orderdetails-container">
        <div className="orderdetails-inner">
          <div className="orderdetail">
            <p className="orderlabel">Job Title</p>
            <p className="ordertitle">{jobDetail.postTitle}</p>
          </div>
          <div className="orderdetail">
            <p className="orderlabel">Description</p>
            <div className="ordervalue ordvalue-scroll">
              {jobDetail.description}
            </div>
          </div>
          <div className="orderdetails">
            <p className="orderlabel">Project tags</p>
            <p className="ordervalue">
              {jobDetail.tags.map((tag, idx) => (
                <span key={idx}>{tag} </span>
              ))}
            </p>
          </div>
          <div className="orderdetails orderdetailstwo">
            <div className="orderdetailstwoinner">
              <p className="orderlabel">Project Deadline</p>
              <p className="ordervalue">
                {jobDetail.deadline.substring(0, 10)}
              </p>
            </div>
            <div className="orderdetailstwoinner">
              <p className="orderlabel">Project category</p>
              <p className="ordervalue">{jobDetail.category}</p>
            </div>
          </div>
          <div className="orderdetails orderdetailstwo">
            <div className="orderdetailstwoinner">
              <p className="orderlabel">Budget </p>
              <p className="ordervalue">{jobDetail.budget}</p>
            </div>
            <div className="orderdetailstwoinner">
              <p className="orderlabel">Platform</p>
              <p className="ordervalue">Bidding</p>
            </div>
          </div>
        </div>
        <div className="orderdetails-innerimages">
          <div className="profile-container">
            <div className="profile-picture">
              <img
                src={jobDetail.clientID.profilePic}
                alt="Profile"
                className="profile-img"
              />
            </div>
            <div className="profile-details">
              <p className="profile-name">{jobDetail.clientID.name}</p>
              <p className="profile-userid">{jobDetail.clientID.userName}</p>
              <p className="profile-contact">
                {jobDetail.clientID.mailId} | {jobDetail.clientID.phoneNumber}
              </p>
              <button
                className="profile-btn"
                onClick={() => setSelectedProfileId(jobDetail.clientID._id)}
              >
                View Profile
              </button>
            </div>
          </div>
          {type === "pending" ? (
            <>
              {jobDetail.files.map((file, index) => (
                <div className="orderimagesother" key={index}>
                  <img src={sm} alt="" />
                  <a href={file}>file {index + 1}</a>
                </div>
              ))}
              <div className="orderbtncon">
                <button className="orderbtn" onClick={togglePopup}>
                  Assign
                </button>
                <button className="orderbtn" onClick={handleSendToBidding}>
                  Open Bidding
                </button>
                <button className="orderbtn ordercancle" onClick={() => window.confirm("Are you sure you want to cancel this job?")}>Cancel</button>
              </div>
            </>
          ) : type === "active" ? (
            <div className="list-container">
              <h1 className="list-head">Interested</h1>
              {jobDetail.length > 0 ? (
                jobDetail.interested.map((freelancer, index) => (
                  <div className="orderimagesother" key={index}>
                    <img src={freelancer.profilePic} alt="" />
                    <div className="details">
                      <p>{freelancer.name}</p>
                      <p className="userid">{freelancer.userName}</p>
                    </div>
                    <div className="icon">
                      <FaEye />
                    </div>
                  </div>
                ))
              ) : (
                <div className="list-no">No one showed inetest yet</div>
              )}
            </div>
          ) : type === "ongoing" ||
            type === "satisfied" ||
            type === "completed" ? (
            <div className="profile-container">
              <div className="profile-picture">
                <img
                  src={jobDetail.assignedTo.profilePic}
                  alt="Profile"
                  className="profile-img"
                />
              </div>
              <div className="profile-details">
                <p className="profile-name">{jobDetail.assignedTo.name}</p>
                <p className="profile-userid">
                  {jobDetail.assignedTo.userName}
                </p>
                <p className="profile-contact">
                  {jobDetail.assignedTo.mailId} |{" "}
                  {jobDetail.assignedTo.phoneNumber}
                </p>
                <button
                  className="profile-btn"
                  onClick={() => {
                    setSelectedProfileId(jobDetail.assignedTo._id);
                  }}
                >
                  View Profile
                </button>
              </div>
              {type === "satisfied" && (
                <button className="profile-btn" onClick={handleMarkAsCompleted}>
                  Mark as Completed
                </button>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        {isPopupOpen && (
          <JobAssignPopup togglePopup={togglePopup} jobId={jobDetail._id} />
        )}
        {selectedProfileId && (
          <PublicProfile
            viewid={selectedProfileId}
            onClose={() => setSelectedProfileId(null)}
          />
        )}
      </main>
    </>
  );
}
