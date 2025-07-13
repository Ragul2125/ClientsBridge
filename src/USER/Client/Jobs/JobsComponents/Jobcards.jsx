import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Jobs.css";
import dp from "../../../assets/userdp.svg";
import { GoSearch } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import Load from "../../../ReuseableComponents/Loaders/Load";

export default function ActiveJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  let jobStatus = "";
  if (location.pathname.includes("/client/jobs/active")) {
    jobStatus = "active";
  } else if (location.pathname.includes("/client/jobs/ongoing")) {
    jobStatus = "ongoing";
  } else if (location.pathname.includes("/client/jobs/completed")) {
    jobStatus = "completed";
  } else if (location.pathname.includes("/client/jobs/unassigned")) {
    jobStatus = "unassigned";
  }

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        let endpoint = "";
        if (jobStatus === "active")
          endpoint = `${BACKEND_URL}/api/jobs/activeJobs`;
        else if (jobStatus === "ongoing")
          endpoint = `${BACKEND_URL}/api/jobs/onGoingJobs`;
        else if (jobStatus === "completed")
          endpoint = `${BACKEND_URL}/api/jobs/completedJobs`;
        else if (jobStatus === "unassigned")
          endpoint = `${BACKEND_URL}/api/jobs/pendingJobs`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobStatus, BACKEND_URL]);

  const filteredJobs = jobs?.filter(
    (job) =>
      job.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {loading ? (
        <Load type="load" />
      ) : error ? (
        <Load type="err" />
      ) : (
        <section className="client-jobs-active-cards-container">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="client-jobs-active-card"
              onClick={() => navigate(`/client/jobs/${jobStatus}/${job._id}`)}
            >
              <div className="info-content">
                <div className="card-info">
                  <img
                    className="client-jobs-active-card-img"
                    src={job.clientID.profilePic || dp}
                    alt="dp"
                  />
                  <p className="client-jobs-active-card-title">
                    {job.postTitle}
                  </p>
                </div>
                <div className="client-jobs-active-card-cost">
                  {"₹ " + job.budget}
                </div>
                <p className="client-jobs-active-card-summary">
                  Summary
                  <p className="client-jobs-active-card-summary-des">
                    {job.description.substring(0, 150) + "..."}
                  </p>
                </p>
              </div>
              {jobStatus === "active" && (
                <div className="company-job-card-box">
                  <p className="company-jobs-card-box-sdate">
                    Interested{" "}
                    <span className="company-jobs-card-box-live">
                      {job?.interested?.length + " +"}
                    </span>
                  </p>
                </div>
              )}
              {jobStatus === "ongoing" && (
                <div className="company-job-card-box">
                  <p className="company-jobs-card-box-sdate">
                    End Date{" "}
                    <span>{new Date(job.deadline).toLocaleDateString()}</span>
                  </p>
                </div>
              )}
              {jobStatus === "completed" && (
                <div className="company-job-card-box">
                  <p className="company-jobs-card-box-sdate">
                    Completed on <span>{job.endDate}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
          {filteredJobs.length === 0 && (
            // <p className="client-jobs-active-no-results">No jobs found.</p>
            <Load type="nojobs" />
          )}
        </section>
      )}
    </div>
  );
}
