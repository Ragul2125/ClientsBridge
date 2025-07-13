import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Overview.css";
import dp from "../../../../assets/userdp.svg";
import { FaPenFancy } from "react-icons/fa";
import JobDetailsLayout from "../../../../ReuseableComponents/job/JobDetailsLayout";
import Load from "../../../../ReuseableComponents/Loaders/Load";

export default function ProfileOverview() {
  const { jbid } = useParams();
  const [project, setProject] = useState(null);
  const [amount, setAmount] = useState(null);
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
        setAmount(response.data.amount);
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

  if (loading) return <Load />;
  if (error) return <p style={{ margin: "3em", color: "red" }}>{error}</p>;

  return (
    <>
      {!loading && project?.postTitle && (
        <JobDetailsLayout project={project}>
          <section className="client-oncooverview-side side2">
            <p className="client-oncooverview-side-texxt">
              The client still did not accept your bid
            </p>
            <p className="client-oncooverview-side-chatbtn">
              Your bid : {amount}
            </p>
            <p className="client-oncooverview-side-head">
              total bids : {project.interested.length}+
            </p>
          </section>
        </JobDetailsLayout>
      )}
    </>
  );
}
