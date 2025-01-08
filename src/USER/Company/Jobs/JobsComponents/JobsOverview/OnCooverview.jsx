import "./Overview.css";
import dp from "../../../../assets/userdp.svg";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaPenFancy } from "react-icons/fa";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export default function ProfileOverview() {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState("");
  const [ReviewPanel, setReviewPanel] = useState(false);
  const [rating, setRating] = useState(0);

  const location = useLocation();
  const { jbid: id } = useParams(); // Assuming the job ID comes from the URL

  useEffect(() => {
    // Determine job type based on path
    if (location.pathname.includes("/company/jobs/ongoing")) {
      setJobs("ongoing");
    } else if (location.pathname.includes("/company/jobs/completed")) {
      setJobs("completed");
    }

    // Fetch job details
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/jobs/getOnGoingJobDetail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          } // Add token for authentication
        );
        setJobDetails(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, location.pathname]);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red", margin: "2em" }}>{error}</p>;

  return (
    <main className="client-oncooverview-main">
      <section className="client-profileoverview-inner client-oncooverview-inner">
        <img
          className="client-profileoverview-inner-dp"
          src={jobDetails?.clientID?.profilePic}
          alt="User"
        />
        <p className="client-profileoverview-inner-title">
          {jobDetails?.clientID?.name || "Unknown Client"}
          <span className="client-profileoverview-inner-time">
            {jobDetails?.clientID?.userName}
          </span>
        </p>
        <p className="client-profileoverview-inner-threedot">...</p>

        <div className="client-profileoverview-inner-des">
          <p className="client-profileoverview-inner-des-head">Project Title</p>
          <p className="client-profileoverview-inner-des-subtxt">
            <span className="client-profileoverview-inner-des-subhead">
              Name of the Project:{" "}
            </span>
            {jobDetails?.postTitle || "N/A"}
          </p>

          <p className="client-profileoverview-inner-des-head">Overview</p>
          <p className="client-profileoverview-inner-des-subtxt">
            <span className="client-profileoverview-inner-des-subhead">
              Objective:{" "}
            </span>
            {jobDetails?.description || "N/A"}
          </p>

          <p className="client-profileoverview-inner-des-head">
            Project Status
          </p>
          <p className="client-profileoverview-inner-des-subtxt">
            {jobDetails?.status || "N/A"}
          </p>
        </div>
      </section>
      <section className="client-oncooverview-side side1">
        <img
          className="client-profileoverview-side-dp"
          src={jobDetails?.clientID?.profilePic}
          alt="User"
        />
        <p className="client-oncooverview-side-head">
          {jobDetails?.clientID?.name}
        </p>
        <p className="client-oncooverview-side-type">
          {jobDetails?.clientID?.userName}
        </p>
        <p className="client-oncooverview-side-cost">
          {jobDetails?.clientID?.description}
        </p>
      </section>

      {jobs === "ongoing" && (
        <section className="client-oncooverview-side side2">
          <p className="client-oncooverview-side-deadline">Project Deadline</p>
          <p className="client-oncooverview-side-enddate">
            {jobDetails?.deadline || "N/A"}
          </p>
          <p className="client-oncooverview-side-subtxt">
            Message {jobDetails?.clientId?.name || "Client"}
          </p>
          <p className="client-oncooverview-side-chatbtn">
            <IoChatboxEllipsesOutline /> Chat
          </p>
        </section>
      )}

      {jobs === "completed" && (
        <section className="client-oncooverview-side side2">
          <p className="client-oncooverview-side-emoji">🥳</p>
          <p className="client-oncooverview-side-head">Completed</p>
          <p
            onClick={() => setReviewPanel(true)}
            className="client-oncooverview-side-chatbtn"
          >
            Add Review <FaPenFancy />
          </p>
        </section>
      )}

      {ReviewPanel && (
        <div className="add-review-container">
          <div className="add-review-inner">
            <p className="add-review-txt">
              <span>Satisfied</span> with my work?
            </p>
            <div className="review-star-container">
              {Array.from({ length: 5 }, (_, index) => (
                <p
                  key={index}
                  className="review-star"
                  onClick={() => handleStarClick(index)}
                >
                  {index < rating ? <MdOutlineStar /> : <MdOutlineStarBorder />}
                </p>
              ))}
            </div>
            <textarea
              className="review-input"
              placeholder="Write your review"
            ></textarea>
            <div className="review-btn-container">
              <p
                onClick={() => setReviewPanel(false)}
                className="review-cancel"
              >
                Cancel
              </p>
              <p
                onClick={() => setReviewPanel(false)}
                className="review-submit"
              >
                Submit
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
