// -----------------------------------------------------
import "./Dashboard.css";
import Load from "../../ReuseableComponents/Loaders/Load";
// ----------------------------------- SVG -------------------------------->
import ov1 from "../../assets/overview1.svg";

// -------------------------------------- Icons --------------------------->
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

export default function Dashboard() {
  const [statistics, setStatistics] = useState({
    pending: { count: 0, status: "", value: "" },
    active: { count: 0, status: "", value: "" },
    ongoing: { count: 0, status: "", value: "" },
  });

  const [projectHistory, setProjectHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the table
  const [error, setError] = useState(null); // Error state for the table

  const statusColors = {
    accepted: "blue",
    completed: "green",
    ongoing: "#d92c2c",
    pending: "red",
  };

  useEffect(() => {
    // Fetch Statistics using Axios
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/clStats/client/statistics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    // Fetch Project History using Axios
    const fetchProjectHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProjectHistory(response.data);
      } catch (error) {
        console.error("Error fetching project history:", error);
        if (!error.message.includes("404")) {
          setError("Failed to fetch project history.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
    fetchProjectHistory();
  }, []);

  return (
    <>
      <main className="client-dashboard-main">
        <h1 className="client-dashboard-title">Dashboard</h1>
        {/* -----------------------------OVERVIEW---------------------------- */}
        <section className="client-dashboard-overview-section">
          {["unassigned", "ongoing", "active"].map((key) => (
            <div className="client-dashboard-overview-card" key={key}>
              <p className="client-dashboard-overview-card-head">
                {key.charAt(0).toUpperCase() + key.slice(1)} Jobs
              </p>
              <p className="client-dashboard-overview-card-count">
                {statistics[key]?.count || 0}
              </p>
              <img
                className="client-dashboard-overview-card-img"
                src={ov1}
                alt={key}
              />
              <p className="client-dashboard-overview-card-growth">
                <span
                  className={
                    statistics[key]?.status === "increasing"
                      ? "growww"
                      : "downnn"
                  }
                >
                  {statistics[key]?.status === "increasing" ? (
                    <IoIosTrendingUp />
                  ) : (
                    <p style={{ color: "red" }}>
                      <IoIosTrendingDown />
                    </p>
                  )}{" "}
                </span>
                {statistics[key]?.value || 0}{" "}
                {statistics[key]?.status === "increasing" ? "Up" : "down"} from
                last month
              </p>
              <Link
                to={`/client/jobs/${key}`}
                className="client-dashboard-overview-card-btn"
              >
                View details
              </Link>
            </div>
          ))}
        </section>

        {/* -----------------------------PROJECT HISTORY TABLE---------------------------- */}
        <h1 style={{ marginTop: "0.1em" }} className="client-dashboard-title">
          Project History
        </h1>
        <section className="client-dashboard-project-history-section">
          <div className="client-dashboard-project-history-table-container">
            {isLoading && <Load type="load" />}
            {error && <Load type="err" />}
            {!isLoading && !error && (
              <table className="client-dashboard-project-history-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Order Id</th>
                    <th>Status</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {projectHistory.map((project, index) => (
                    <tr key={index}>
                      <td className="client-dashboard-project-history-table-imgcon">
                        <img src={ov1} alt="" />
                        {project.postTitle}
                      </td>
                      <td>{project.category}</td>
                      <td
                        style={{
                          color: statusColors[project.status] || "black",
                        }}
                      >
                        {project.status}
                      </td>
                      <td>{project.deadline.substring(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
