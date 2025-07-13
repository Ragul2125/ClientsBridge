import { GoDotFill } from "react-icons/go";
import { formatDistanceToNow } from "date-fns"; // Render job status section
import { Link, useNavigate } from "react-router-dom";

const renderJobStatus = (job, jobstatus) => {
  if (jobstatus === "bidded") {
    return (
      <div className="company-job-card-box">
        <p className="company-jobs-card-box-sdate">
          Status{" "}
          <span className="company-jobs-card-box-live">
            <GoDotFill style={{ color: "#14ef14", marginTop: "0.1em" }} /> live
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
          Time left{" "}
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
          Job Client{" "}
          <span className="company-jobs-card-box-live">
            {job.clientID.name}
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

const JobCard = ({ job, jobstatus }) => {
  return (
    <Link
      key={job._id}
      className="client-jobs-active-card"
      to={`/${localStorage.getItem("role").toLowerCase()}/jobs/${jobstatus}/${
        job._id
      }`}
    >
      <div style={{ display: "flex", gap: "2em", alignItems: "center" }}>
        <img
          className="client-jobs-active-card-img"
          src={job.clientID.profilePic}
          alt="dp"
        />
        <p className="client-jobs-active-card-title">
          {job.postTitle}
          <span className="client-jobs-active-card-cost">₹ {job.budget}</span>
        </p>
      </div>
      <p className="client-jobs-active-card-summary">
        Summary
        <p className="client-jobs-active-card-summary-des">
          {job.description.substring(0, 300) + "..."}
        </p>
      </p>
      {renderJobStatus(job, jobstatus)}
    </Link>
  );
};
export default JobCard;
