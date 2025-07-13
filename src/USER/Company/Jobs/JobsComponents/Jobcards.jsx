import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "../Jobs.css";
import { GoSearch } from "react-icons/go";
import Load from "../../../ReuseableComponents/Loaders/Load";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import JobCard from "./JobsOverview/JobCard";

export default function ActiveJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  let jobstatus = "";
  if (location.pathname.includes("jobs/bidded")) {
    jobstatus = "bidded";
  } else if (location.pathname.includes("jobs/ongoing")) {
    jobstatus = "ongoing";
  } else if (location.pathname.includes("jobs/completed")) {
    jobstatus = "completed";
  }

  // Build endpoint URL
  const endpoint = useMemo(() => {
    const base = import.meta.env.VITE_BACKEND_URL;
    if (jobstatus === "bidded") return `${base}/api/jobs/biddedJobs`;
    if (jobstatus === "ongoing") return `${base}/api/jobs/onGoingJobs`;
    if (jobstatus === "completed") return `${base}/api/jobs/completedJobs`;
    return "";
  }, [jobstatus]);

  const { data: jobs = [], error, loading } = useAxiosFetch(endpoint);

  // Filter jobs based on search
  const filteredJobs = jobs?.filter(
    (job) =>
      job.postTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
        {loading && <Load type="load" />}
        {error && <Load type="err" />}
        {!loading &&
          !error &&
          filteredJobs?.map((job) => (
            <JobCard job={job} jobstatus={jobstatus} />
          ))}
        {!loading && !error && filteredJobs?.length === 0 && (
          <Load type="nojobs" />
        )}
      </section>
    </div>
  );
}
