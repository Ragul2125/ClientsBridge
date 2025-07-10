import { useState, useEffect } from "react";
import "./Home.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Load from "../../ReuseableComponents/Loaders/Load";
import JobCard from "./HomeComponents/JobCard";
import Header from "./HomeComponents/Header";
import useAxiosFetch from "../../../hooks/useAxiosFetch";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: projects,
    error,
    loading,
    refetch,
  } = useAxiosFetch("/jobs/userFeed");

  const filteredProjects = projects?.filter(
    (project) =>
      project.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Load type="load" />;
  }

  if (error) {
    return <Load type="err" />;
  }

  return (
    <>
      <main className="company-home-main">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="company-home-cards-section">
          <div className="company-home-cards-section-container">
            {filteredProjects?.length > 0 ? (
              filteredProjects.map((project) => <JobCard project={project} />)
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
