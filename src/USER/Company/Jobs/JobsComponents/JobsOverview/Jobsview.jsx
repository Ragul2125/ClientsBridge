import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Overview.css";
import dp from "../../../../assets/userdp.svg";
import { FaPenFancy } from "react-icons/fa";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ margin: "3em", color: "red" }}>{error}</p>;

  return (
    <main className="client-oncooverview-main">
      <section className="client-profileoverview-inner client-oncooverview-inner">
        {/* <img className="client-profileoverview-inner-dp" src={dp} alt="User" /> */}
        <p className="client-profileoverview-inner-title">
          <h1>{project.postTitle}</h1>
          <span className="client-profileoverview-inner-time">
            3 hours ago{" "}
          </span>
        </p>
        <p className="client-profileoverview-inner-threedot">...</p>

        {/* --------------------------------------------------------------------DESC------------------ */}
        <div className="client-profileoverview-inner-des">
          {/* <p className="client-profileoverview-inner-des-head">Project Title</p>
                    <p className="client-profileoverview-inner-des-subtxt">
                        <span className='client-profileoverview-inner-des-subhead'>Name of the Project: </span> Mobile E-Commerce Application
                    </p> */}

          <p className="client-profileoverview-inner-des-head">Overview</p>
          <p className="client-profileoverview-inner-des-subtxt">
            {project.description}
          </p>
          <div className="client-profileoverview-inner-side-byside">
            <div>
              {" "}
              <p className="client-profileoverview-inner-des-head">Deadline</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {project.deadline.substring(0, 10)}
              </p>
            </div>
            <div>
              <p className="client-profileoverview-inner-des-head">Budget</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {project.budget}
              </p>
            </div>
            <div>
              <p className="client-profileoverview-inner-des-head">Category</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {project.category}
              </p>
            </div>
          </div>

          <p className="client-profileoverview-inner-des-head">Tags</p>
          <p className="client-profileoverview-inner-des-tags">
            {project.tags.map((tag, i) => (
              <p className="job-tag-seps">{tag}</p>
            ))}
          </p>
          <p className="client-profileoverview-inner-des-head">Files</p>
          <p className="client-profileoverview-inner-des-file">
            {project.files.map((file, i) => (
              <p>
                <a href={file}>file {i + 1}</a>
              </p>
            ))}
          </p>
        </div>
      </section>
      <section className="client-oncooverview-side side1">
        <img
          className="client-profileoverview-side-dp"
          src={project?.clientID?.profilePic}
          alt="User"
        />
        <p className="client-oncooverview-side-head">
          {project?.clientID?.name}
        </p>
        <p className="client-oncooverview-side-type">
          @{project?.clientID?.userName}
        </p>
        <p className="client-oncooverview-side-cost">
          {project?.clientID?.description.substring(0, 50)}
        </p>
      </section>
      <section className="client-oncooverview-side side2">
        <p className="client-oncooverview-side-texxt">
          The client still did not accept your bid
        </p>
        <p className="client-oncooverview-side-head">
          total bids : {project.interested.length}+
        </p>
        <p className="client-oncooverview-side-chatbtn">Your bid : {amount}</p>
      </section>
    </main>
  );
}
