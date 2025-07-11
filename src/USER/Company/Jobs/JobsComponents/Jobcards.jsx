import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Jobs.css";
import dp from "../../../assets/userdp.svg";
import { GoSearch } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { formatDistanceToNow } from "date-fns";
import Load from "../../../ReuseableComponents/Loaders/Load";
export default function ActiveJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Determine job status based on the URL path
  let jobstatus = "";
  if (location.pathname.includes("jobs/bidded")) {
    jobstatus = "bidded";
  } else if (location.pathname.includes("jobs/ongoing")) {
    jobstatus = "ongoing";
  } else if (location.pathname.includes("jobs/completed")) {
    jobstatus = "completed";
  }

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        let endpoint = "";
        if (jobstatus === "bidded") {
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/jobs/biddedJobs`;
        } else if (jobstatus === `ongoing`) {
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/jobs/onGoingJobs`;
        } else if (jobstatus === `completed`) {
          endpoint = `${
            import.meta.env.VITE_BACKEND_URL
          }/api/jobs/completedJobs`;
        }

        const { data } = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(data);
      } catch (err) {
        setError("Failed to load jobs. Please try again.");
        console.error(`[FetchJobs] Error: `, err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobstatus]);

  // Filter jobs based on search term
  const filteredJobs = jobs?.filter(
    (job) =>
      job.postTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Conditional rendering for job status
  const renderJobStatus = (job) => {
    if (jobstatus === "bidded") {
      return (
        <div className="company-job-card-box">
          <p className="company-jobs-card-box-sdate">
            Status{" "}
            <span className="company-jobs-card-box-live">
              <GoDotFill style={{ color: "#14ef14", marginTop: "0.1em" }} />{" "}
              live
            </span>
          </p>
          <p className="company-jobs-card-box-edate">
            Applied{" "}
            <span className="company-jobs-card-box-appli">
              {job.applied || "N/A"} +
            </span>
          </p>
        </div>
      );
    } else if (jobstatus === "ongoing") {
      return (
        <div className="company-job-card-box">
          <p className="company-jobs-card-box-sdate">
            Time left
            <span className="company-jobs-card-box-live">
              {formatDistanceToNow(new Date(job.deadline), { addSuffix: true })}
            </span>
          </p>
          <p className="company-jobs-card-box-edate">
            Deadline{" "}
            <span className="company-jobs-card-box-appli">
              {new Date(job.deadline).toLocaleDateString()}
            </span>
          </p>
        </div>
      );
    } else if (jobstatus === "completed") {
      return (
        <div className="company-job-card-box">
          <p className="company-jobs-card-box-sdate">
            Job holder{" "}
            <span className="company-jobs-card-box-live">
              <img className="company-jobs-card-box-dp" src={dp} alt="dp" />
            </span>
          </p>
          <p className="company-jobs-card-box-edate">
            Completed on{" "}
            <span className="company-jobs-card-box-appli">2 Feb 2024</span>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="company-jobs-active-main">
      <section className="company-jobs-active-search-section">
        <input
          placeholder="Search Jobs"
          type="search"
          className="company-jobs-active-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p className="company-jobs-unassigned-search-btn">
          <GoSearch />
        </p>
      </section>
      <section className="company-jobs-active-cards-container">
        {loading && <Load type="load" />}
        {error && <Load type="err" />}
        {!loading &&
          !error &&
          filteredJobs.map((job) => (
            <div
              key={job._id}
              className="company-jobs-active-card"
              onClick={() =>
                navigate(
                  `/${localStorage
                    .getItem("role")
                    .toLowerCase()}/jobs/${jobstatus}/${job._id}`
                )
              }
            >
              <div className="card-info">
                <img
                  className="company-jobs-active-card-img"
                  src={job.clientID.profilePic}
                  alt="dp"
                />
                <p className="company-jobs-active-card-title">
                  {job.postTitle}
                  <span className="company-jobs-active-card-cost">
                    ₹ {job.budget}
                  </span>
                </p>
              </div>
              <p className="company-jobs-active-card-summary">
                Summary
                <p className="company-jobs-active-card-summary-des">
                  {job.description.substring(0, 120) + "..."}
                </p>
              </p>
              {renderJobStatus(job)}
            </div>
          ))}
        {!loading && !error && filteredJobs.length === 0 && (
          // <p className="client-jobs-active-no-results">No jobs found.</p>
          <Load type="nojobs" />
        )}
      </section>
    </div>
  );
}
