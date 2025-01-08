import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Jobs.css";
import dp from "../../../assets/userdp.svg";
import { GoSearch } from "react-icons/go";
import { GoDotFill } from "react-icons/go";

export default function ActiveJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Determine job status based on the URL path
  let jobstatus = "";
  if (location.pathname.includes("/company/jobs/bidded")) {
    jobstatus = "bidded";
  } else if (location.pathname.includes("/company/jobs/ongoing")) {
    jobstatus = "ongoing";
  } else if (location.pathname.includes("/company/jobs/completed")) {
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
            Job holder{" "}
            <span className="company-jobs-card-box-live">
              <img className="company-jobs-card-box-dp" src={dp} alt="dp" />
            </span>
          </p>
          <p className="company-jobs-card-box-edate">
            Recent Report{" "}
            <span className="company-jobs-card-box-appli">2 days ago</span>
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
    <div className="client-jobs-active-main">
      <section className="client-jobs-active-search-section">
        <input
          placeholder="Search Jobs"
          type="search"
          className="client-jobs-active-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p className="client-jobs-unassigned-search-btn">
          <GoSearch />
        </p>
      </section>
      <section className="client-jobs-active-cards-container">
        {loading && <p>Loading jobs...</p>}
        {error && <p className="client-jobs-active-error">{error}</p>}
        {!loading &&
          !error &&
          filteredJobs.map((job) => (
            <div
              key={job._id}
              className="client-jobs-active-card"
              onClick={() => navigate(`/company/jobs/${jobstatus}/${job._id}`)}
            >
              <img className="client-jobs-active-card-img" src={dp} alt="dp" />
              <p className="client-jobs-active-card-title">
                {job.postTitle}
                <span className="client-jobs-active-card-cost">
                  {job.budget}
                </span>
              </p>
              <p className="client-jobs-active-card-summary">
                Summary
                <p className="client-jobs-active-card-summary-des">
                  {job.description}
                </p>
              </p>
              {renderJobStatus(job)}
            </div>
          ))}
        {!loading && !error && filteredJobs.length === 0 && (
          <p className="client-jobs-active-no-results">No jobs found.</p>
        )}
      </section>
    </div>
  );
}
