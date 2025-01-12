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
  const [review, setReview] = useState("");
  const [jobs, setJobs] = useState("");
  const [ReviewPanel, setReviewPanel] = useState(false);
  const [rating, setRating] = useState(0);

  const location = useLocation();
  const { jbid: id } = useParams(); // Assuming the job ID comes from the URL

  useEffect(() => {
    // Determine job type based on path
    if (location.pathname.includes("/jobs/ongoing")) {
      setJobs("ongoing");
    } else if (location.pathname.includes("/jobs/completed")) {
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

  const handleReviewSubmit = async () => {
    try {
      console.log(review, rating);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/review/${
          jobDetails.clientID._id
        }/addReviews`,
        {
          stars: rating,
          description: review,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("done");
      setReviewPanel(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red", margin: "2em" }}>{error}</p>;

  return (
    <main className="client-oncooverview-main">
      <section className="client-profileoverview-inner client-oncooverview-inner">
        {/* <img className="client-profileoverview-inner-dp" src={dp} alt="User" /> */}
        <p className="client-profileoverview-inner-title">
          <h1>{jobDetails.postTitle}</h1>
          <span className="client-profileoverview-inner-time">
            3 hours ago{" "}
          </span>
        </p>

        {/* --------------------------------------------------------------------DESC------------------ */}
        <div className="client-profileoverview-inner-des">
          {/* <p className="client-profileoverview-inner-des-head">jobDetails Title</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className='client-profileoverview-inner-des-subhead'>Name of the jobDetails: </span> Mobile E-Commerce Application
                    </p> */}

          <p className="client-profileoverview-inner-des-head">Overview</p>
          <p className="client-profileoverview-inner-des-subtxt">
            {jobDetails.description}
          </p>
          <div className="client-profileoverview-inner-side-byside">
            <div>
              {" "}
              <p className="client-profileoverview-inner-des-head">Deadline</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {jobDetails.deadline.substring(0, 10)}
              </p>
            </div>
            <div>
              <p className="client-profileoverview-inner-des-head">Budget</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {jobDetails.budget}
              </p>
            </div>
            <div>
              <p className="client-profileoverview-inner-des-head">Category</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {jobDetails.category}
              </p>
            </div>
          </div>

          <p className="client-profileoverview-inner-des-head">Tags</p>
          <p className="client-profileoverview-inner-des-tags">
            {jobDetails.tags.map((tag, i) => (
              <p className="job-tag-seps">{tag}</p>
            ))}
          </p>
          {jobDetails.files.length > 0 && (
            <>
              <p className="client-profileoverview-inner-des-head">Files</p>
              <p className="client-profileoverview-inner-des-file">
                {jobDetails.files.map((file, i) => (
                  <p>
                    <a href={file}>file {i + 1}</a>
                  </p>
                ))}
              </p>
            </>
          )}
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
          @{jobDetails?.clientID?.userName}
        </p>
        <p className="client-oncooverview-side-cost">
          {jobDetails?.clientID?.description}
        </p>
      </section>

      {jobs === "ongoing" && (
        <section className="client-oncooverview-side side2">
          <p className="client-oncooverview-side-deadline">Project Deadline</p>
          <p className="client-oncooverview-side-enddate">
            {jobDetails?.deadline.substring(0, 10) || "N/A"}
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
              Rate your <span>Experience</span> with @
              {jobDetails?.clientID?.userName}?
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
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
            ></textarea>
            <div className="review-btn-container">
              <p
                onClick={() => setReviewPanel(false)}
                className="review-cancel"
              >
                Cancel
              </p>
              <p onClick={handleReviewSubmit} className="review-submit">
                Submit
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
