import React, { useState, useEffect } from "react";
import "./Home.css";
import { MdOutlinePeopleAlt } from "react-icons/md";
import dp from "../../assets/userdp.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Load from '../../ReuseableComponents/Loaders/Load'
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs/userFeed`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects(response.data); // Assuming the response contains an array of jobs
        setLoading(false);
      } catch (err) {
        console.error("[fetchJobs] Error:", err);
        setError(err.response?.data?.message || "Failed to fetch jobs");
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

  const filteredProjects = projects.filter(
    (project) =>
      project.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Load type='load' />;
  }

  if (error) {
    return <Load type='err' />;
  }

  return (
    <>
      <main className="company-home-main">
        <section className="company-home-search-section">
          <div className="company-home-search-section-inner">
            <div className="company-home-search-text">
              <p className="company-home-search-text-head">
                Are you searching for projects to showcase your expertise?
              </p>
              <p className="company-home-search-text-des">
                At Clientsbridge, we connect your company with clients seeking
                skilled professionals. Explore over 10,000 client projects and
                find the perfect opportunities to grow your business.
              </p>
            </div>
            <div className="company-home-search-section-search-container">
              <input
                placeholder="Search Jobs"
                type="search"
                className="company-home-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <p className="company-home-search-btn">Search</p>
            </div>
          </div>
        </section>
        <section className="company-home-cards-section">
          <div className="company-home-cards-section-container">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div className="company-home-card" key={project._id}>
                  <img className="company-home-card-img" src={dp} alt="dp" />
                  <p className="company-home-card-title">
                    {project.postTitle}
                    <span className="company-home-card-info">2w ago</span>{" "}
                    {/* Update with actual data */}
                    <span className="company-home-card-cost">
                      ${project.budget}
                    </span>
                  </p>
                  <p className="company-home-card-count">
                    <MdOutlinePeopleAlt />
                    {project.interested.length}+ Interested
                  </p>
                  <p className="company-home-card-summary">
                    Summary
                    <p className="company-home-card-summary-des">
                      {project.description}
                    </p>
                  </p>
                  <Link
                    to={`/company/home/${project._id}`}
                    className="company-home-card-btn"
                  >
                    See more
                  </Link>
                </div>
              ))
            ) : (
                <p className="company-home-no-results">
                No projects found matching your search.
              </p>
            )}
          </div>
          <br />
        </section>
      </main>
    </>
  );
}
