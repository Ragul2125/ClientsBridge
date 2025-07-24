import { useLocation, Link, Outlet } from "react-router-dom";
import "../Jobs/Jobs.css";
import { useState } from "react";

export default function Jobs() {
  const location = useLocation();
  const [title, setTitle] = useState("Applied Jobs");
  console.log(title);
  return (
    <>
      <main className="company-jobs-main">
        <div className="company-jobs-tabs-container">
          <div className="company-jobs-tabs-titles">
            <Link
              to="bidded"
              className={location.pathname.includes("bidded") ? "active" : ""}
              onClick={() => setTitle("Applied Jobs")}
            >
              <p>Applied Jobs</p>
              <p>|</p>
            </Link>
            <Link
              to="ongoing"
              className={location.pathname.includes("ongoing") ? "active" : ""}
              onClick={() => setTitle("In Progress Jobs")}
            >
              <p>In Progress Jobs</p>
              <p>|</p>
            </Link>
            <Link
              to="completed"
              className={
                location.pathname.includes("completed") ? "active" : ""
              }
              onClick={() => setTitle("Completed Jobs")}
            >
              <p>Completed Jobs</p>
            </Link>
          </div>
          <div className="title-des">
            {title === "Applied Jobs" ? (
              <p>View all jobs you’ve applied to — pending client action.</p>
            ) : title === "In Progress Jobs" ? (
              <p>Track active projects you’re currently working on.</p>
            ) : (
              <p>Review all jobs you’ve successfully completed.</p>
            )}
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
}
