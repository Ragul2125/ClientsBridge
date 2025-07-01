const JobDetailsLayout = ({ project, children }) => {
  if (!project) return <p>Loading...</p>;

  return (
    <main className="client-oncooverview-main">
      <section className="client-profileoverview-inner client-oncooverview-inner">
        <div className="client-profileoverview-inner-title">
          <h1>{project.postTitle || "Untitled Project"}</h1>
          <span className="client-profileoverview-inner-time">3 hours ago</span>
        </div>
        <p className="client-profileoverview-inner-threedot">...</p>

        <div className="client-profileoverview-inner-des">
          <p className="client-profileoverview-inner-des-head">Overview</p>
          <p className="client-profileoverview-inner-des-subtxt">
            {project.description || "No description provided."}
          </p>

          <div className="client-profileoverview-inner-side-byside">
            <div>
              <p className="client-profileoverview-inner-des-head">Deadline</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {project.deadline ? project.deadline.substring(0, 10) : "N/A"}
              </p>
            </div>
            <div>
              <p className="client-profileoverview-inner-des-head">Budget</p>
              <p className="client-profileoverview-inner-des-subtxt">
                ₹{project.budget || "N/A"}
              </p>
            </div>
            <div>
              <p className="client-profileoverview-inner-des-head">Category</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {project.category || "N/A"}
              </p>
            </div>
          </div>

          <p className="client-profileoverview-inner-des-head">Tags</p>
          <ul className="client-profileoverview-inner-des-tags">
            {project.tags?.length ? (
              project.tags.map((tag, i) => (
                <li key={i} className="job-tag-seps">
                  {tag}
                </li>
              ))
            ) : (
              <li className="job-tag-seps">No tags</li>
            )}
          </ul>

          <p className="client-profileoverview-inner-des-head">Files</p>
          <ul className="client-profileoverview-inner-des-file">
            {project.files?.length ? (
              project.files.map((file, i) => (
                <li key={i}>
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    File {i + 1}
                  </a>
                </li>
              ))
            ) : (
              <li>No files uploaded.</li>
            )}
          </ul>
        </div>
      </section>

      <aside className="client-oncooverview-side side1">
        <img
          className="client-profileoverview-side-dp"
          src={project.clientID?.profilePic || "/default-profile.png"}
          alt="Client"
        />
        <p className="client-oncooverview-side-head">
          {project.clientID?.name || "Unknown Client"}
        </p>
        <p className="client-oncooverview-side-type">
          @{project.clientID?.userName || "username"}
        </p>
        <p className="client-oncooverview-side-cost">
          {project.clientID?.description
            ? project.clientID.description.substring(0, 50)
            : "No bio available."}
        </p>
      </aside>

      {children}
    </main>
  );
};

export default JobDetailsLayout;
