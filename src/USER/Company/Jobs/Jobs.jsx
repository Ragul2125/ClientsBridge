import { useLocation, Link, Outlet } from "react-router-dom";
import "../Jobs/Jobs.css";

export default function Jobs() {
  const location = useLocation();
  return (
    <>
      <main className="company-jobs-main">
        <div className="company-jobs-tabs-container">
          <div className="company-jobs-tabs-titles">
            <Link
              to="bidded"
              className={location.pathname.includes("bidded") ? "active" : ""}
            >
              <p>Bidded Jobs</p>
              <p>|</p>
            </Link>
            <Link
              to="ongoing"
              className={location.pathname.includes("ongoing") ? "active" : ""}
            >
              <p>Ongoing Jobs</p>
              <p>|</p>
            </Link>
            <Link
              to="completed"
              className={
                location.pathname.includes("completed") ? "active" : ""
              }
            >
              <p>Completed Jobs</p>
            </Link>
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
}
