const Layout = ({ project, children }) => {
  return (
    <main className="client-oncooverview-main">
      <section className="client-profileoverview-inner client-oncooverview-inner">
        <p className="client-profileoverview-inner-title">
          <h1>{project?.postTitle}</h1>
          <span className="client-profileoverview-inner-time">
            3 hours ago{" "}
          </span>
        </p>
        <p className="client-profileoverview-inner-threedot">...</p>

        <div className="client-profileoverview-inner-des">
          <p className="client-profileoverview-inner-des-head">Overview</p>
          <p className="client-profileoverview-inner-des-subtxt">
            {project.description}
          </p>
          <div className="client-profileoverview-inner-side-byside">
            <div>
              {" "}
              <p className="client-profileoverview-inner-des-head">Deadline</p>
              <p className="client-profileoverview-inner-des-subtxt">
                {project.deadline ? project.deadline.substring(0, 120) : "N/A"}
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
          {/* <ul className="client-profileoverview-inner-des-file">
            {project.files?.length ? (
              project.files.map((file, i) => (
                <p key={i}>
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    File {i + 1}
                  </a>
                </p>
              ))
            ) : (
              <li>No files uploaded.</li>
            )}
          </ul> */}
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
      {children}
    </main>
  );
};
export default Layout;
