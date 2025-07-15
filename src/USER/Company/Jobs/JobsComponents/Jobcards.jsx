import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Jobs.css";
import { GoSearch } from "react-icons/go";
import Load from "../../../ReuseableComponents/Loaders/Load";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import JobCard from "./JobsOverview/JobCard";              // keep if you’re using it
import fallbackAvatar from "../../../../assets/image/dp.png"; // any placeholder image

export default function ActiveJobs() {
  /* ----------------------------------------------------------------
   * State + routing helpers
   * ---------------------------------------------------------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const location  = useLocation();
  const navigate  = useNavigate();

  /* ----------------------------------------------------------------
   * 1. Derive the job status from URL
   * ---------------------------------------------------------------- */
  const jobstatus = location.pathname.includes("jobs/bidded")
    ? "bidded"
    : location.pathname.includes("jobs/ongoing")
    ? "ongoing"
    : location.pathname.includes("jobs/completed")
    ? "completed"
    : "";

  /* ----------------------------------------------------------------
   * 2. Build the correct API endpoint
   * ---------------------------------------------------------------- */
  const endpoint = useMemo(() => {
    const base = import.meta.env.VITE_BACKEND_URL;
    switch (jobstatus) {
      case "bidded":
        return `${base}/api/jobs/biddedJobs`;
      case "ongoing":
        return `${base}/api/jobs/onGoingJobs`;
      case "completed":
        return `${base}/api/jobs/completedJobs`;
      default:
        return "";
    }
  }, [jobstatus]);

  /* ----------------------------------------------------------------
   * 3. Fetch the jobs
   * ---------------------------------------------------------------- */
  const { data, error, loading } = useAxiosFetch(endpoint);

  // Always work with an array so .filter and .map never crash
  const jobs = Array.isArray(data) ? data : [];

  /* ----------------------------------------------------------------
   * 4. Search filter (case‑insensitive)
   * ---------------------------------------------------------------- */
  const filteredJobs = jobs.filter((job) =>
    [job.postTitle, job.description].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  /* ----------------------------------------------------------------
   * 5. Early‑return UI for common states
   * ---------------------------------------------------------------- */
  if (loading)           return <Load type="load"  />;
  if (error)             return <Load type="err"   />;
  if (filteredJobs.length === 0) return <Load type="nojobs" />;

  /* ----------------------------------------------------------------
   * 6. Main render
   * ---------------------------------------------------------------- */
  return (
    <div className="company-jobs-active-main">
      {/* ---------- Search bar ---------- */}
      <section className="company-jobs-active-search-section">
        <input
          type="search"
          placeholder="Search Jobs"
          className="company-jobs-active-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          aria-label="Search"
          className="company-jobs-unassigned-search-btn"
        >
          <GoSearch />
        </button>
      </section>

      {/* ---------- Job cards ---------- */}
      <section className="company-jobs-active-cards-container">
        {filteredJobs.map((job) => (
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
                src={job.clientID?.profilePic || fallbackAvatar}
                alt="client profile"
              />
              <p className="company-jobs-active-card-title">
                {job.postTitle}
                <span className="company-jobs-active-card-cost">
                  ₹ {job.budget}
                </span>
              </p>
            </div>

            <div className="company-jobs-active-card-summary">
              <span>Summary</span>
              <p className="company-jobs-active-card-summary-des">
                {`${job.description?.substring(0, 260) || ""}…`}
              </p>
            </div>

            {/* Optional helper – include only if you already have this util */}
            {typeof renderJobStatus === "function" && renderJobStatus(job)}
          </div>
        ))}
      </section>
    </div>
  );
}
