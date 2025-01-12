import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Jobs.css";
import dp from "../../../assets/userdp.svg";
import { GoSearch } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import axios from "axios";

export default function ActiveJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
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
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let endpoint = "";
        if (jobStatus === "active")
          endpoint = `${BACKEND_URL}/api/jobs/activeJobs`;
        else if (jobStatus === "ongoing")
          endpoint = `${BACKEND_URL}/api/jobs/onGoingJobs`;
        else if (jobStatus === "completed")
          endpoint = `${BACKEND_URL}/api/jobs/completedJobs`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is available
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        alert("Failed to fetch jobs. Please try again.");
      }
    };

    fetchJobs();
  }, [jobStatus, BACKEND_URL]);

  const filteredJobs = jobs.filter(
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
      <section className="client-jobs-active-cards-container">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="client-jobs-active-card"
            onClick={() => navigate(`/client/jobs/${jobStatus}/${job._id}`)}
          >
            <img
              className="client-jobs-active-card-img"
              src={job.clientID.profilePic}
              alt="dp"
            />
            <p className="client-jobs-active-card-title">
              {job.postTitle}
              <span className="client-jobs-active-card-cost">{job.budget}</span>
            </p>
            <p className="client-jobs-active-card-summary">
              Summary
              <p className="client-jobs-active-card-summary-des">
                {job.description}
              </p>
            </p>
            {jobStatus === "active" && (
              <div className="company-job-card-box">
                <p className="company-jobs-card-box-sdate">
                  Status{" "}
                  <span className="company-jobs-card-box-live">
                    <GoDotFill
                      style={{ color: "#14ef14", marginTop: "0.1em" }}
                    />{" "}
                    live
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
                <p className="company-jobs-card-box-edate">
                  Category <span>{job.category}</span>
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
          <p className="client-jobs-active-no-results">No jobs found.</p>
        )}
      </section>
    </div>
  );
}
