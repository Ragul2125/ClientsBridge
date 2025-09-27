import "./Jobs.css";
import { Link, Outlet, useLocation } from "react-router-dom";
export default function Jobs() {
  const location = useLocation();
  const getDescFromPath = (pathname = window.location.pathname) => {
    if (pathname.includes("unassigned")) return "Jobs you created but haven’t assigned to any freelancer/company yet";
    if (pathname.includes("active"))
      return "Jobs open for bidding or with suggested freelancers/companies";
    if (pathname.includes("ongoing"))
      return "Jobs currently being worked on by your chosen freelancer/company";
    if (pathname.includes("completed"))
      return "Jobs that are finished and fully paid";
    return "all";
  };
  return (
    <>
      <main className="client-jobs-main">
        <div className="client-jobs-tabs-container">
          <div className="client-jobs-tabs-titles">
            <Link
              to="unassigned"
              className={
                location.pathname.includes("unassigned") ? "active" : ""
              }
            >
              <p>Unassigned Jobs</p>
              <p>|</p>
            </Link>
            <Link
              to="active"
              className={location.pathname.includes("active") ? "active" : ""}
            >
              <p>Active Jobs</p>
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
          <Link to="add" className="client-jobs-newjob-btn">
            {" "}
            Add Jobs +
          </Link>
        </div>
        <p className="ordertxtmin">{getDescFromPath()}</p>

        <Outlet />
      </main>
    </>
  );
}
