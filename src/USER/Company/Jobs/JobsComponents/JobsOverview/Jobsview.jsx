import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Overview.css";
import dp from "../../../../assets/userdp.svg";

export default function ProfileOverview() {
  const { jbid } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jbid) {
      setError("Invalid project ID.");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/jobs/biddedJobDetails/${jbid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProject(response.data.job);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch project details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [jbid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ margin: "3em", color: "red" }}>{error}</p>;

  return (
    <main className="client-profileoverview-main">
      <div className="client-profileoverview-inner">
        <img
          className="client-profileoverview-inner-dp"
          src={project.clientID.profilePic}
          alt="User profile"
        />
        <p className="client-profileoverview-inner-title">
          {project.clientID.name}
          <span className="client-profileoverview-inner-time">
            {project.clientID.userName}
          </span>
        </p>
        <p className="client-profileoverview-inner-threedot">...</p>

        <div className="client-profileoverview-inner-des">
          <p className="client-profileoverview-inner-des-head">Project Title</p>
          <p className="client-profileoverview-inner-des-subtxt">
            <span className="client-profileoverview-inner-des-subhead">
              Name of the Project:{" "}
            </span>
            {project.postTitle}
          </p>

          <p className="client-profileoverview-inner-des-head">Overview</p>
          <p className="client-profileoverview-inner-des-subtxt">
            <span className="client-profileoverview-inner-des-subhead">
              Objective:{" "}
            </span>
            {project.description}
          </p>

          <p className="client-profileoverview-inner-des-head">
            Project Status
          </p>
          <p className="client-profileoverview-inner-des-subtxt">
            {project.status}
          </p>
        </div>
      </div>
    </main>
  );
}
