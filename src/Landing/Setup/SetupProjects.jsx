import React, { useState } from "react";
import logo from "../../assets/logo.png";
import axios from "axios";
import TagsInput from "../Registerations/TagsInput";

const SetupProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    skills: "",
    images: [],
    videos: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleTagsChange = (tags) => {
    setNewProject({ ...newProject, skills: tags });
  };
  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    const totalFiles = [...newProject.images, ...newProject.videos, ...files];
    if (totalFiles.length > 5) {
      alert(
        "You can only upload a maximum of 5 files (images and videos combined)."
      );
      return;
    }
    if (
      type === "videos" &&
      files.some((file) => file.size > 25 * 1024 * 1024)
    ) {
      alert("Each video must be less than 25 MB.");
      return;
    }
    console.log(files);
    console.log([type], [...newProject[type], ...files]);
    setNewProject({
      ...newProject,
      [type]: [...newProject[type], ...files],
    });
  };

  const addOrEditProject = () => {
    if (!newProject.name || !newProject.description || !newProject.skills) {
      alert("Please fill all required fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = newProject;
      setProjects(updatedProjects);
      setEditIndex(null);
    } else {
      setProjects([...projects, newProject]);
    }

    setNewProject({
      name: "",
      description: "",
      skills: "",
      images: [],
      videos: [],
    });
    setShowPopup(false);
  };

  const deleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const editProject = (index) => {
    setNewProject(projects[index]);
    setEditIndex(index);
    setShowPopup(true);
  };
  const removeFile = (type, indexToRemove) => {
    setNewProject((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, index) => index !== indexToRemove),
    }));
  };
  const submitProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token not found.");
      return;
    }

    for (const project of projects) {
      const formData = new FormData();
      // Add the project object as a JSON string
      formData.append(
        "project",
        JSON.stringify({
          name: project.name,
          description: project.description,
          skillsUsed: project.skills.split(",").map((skill) => skill.trim()),
        })
      );

      // Add images to the form-data
      project.images.forEach((image) => {
        formData.append("images", image);
      });

      // Add videos to the form-data
      project.videos.forEach((video) => {
        formData.append("videos", video);
      });

      /* try {
        const response = await axios.post(
          "http://localhost:8000/api/freelancer/6761255b7fa484c00446a07f/createProject",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log(`Project "${project.name}" submitted successfully!`);
        } else {
          throw new Error(`Failed to add project: ${project.name}`);
        }
      } catch (error) {
        alert(`Error submitting project "${project.name}": ${error.message}`);
        return;
      } */
      console.log(formData.get("project"));
      console.log(formData.getAll("images"));
      console.log(formData.getAll("videos"));
    }

    alert("All projects submitted successfully!");
  };

  return (
    <div className="setup">
      <img src={logo} alt="ClientsBridge" className="logo" />
      <div className="setup-box">
        <div className="set-upl">
          <h1>Upload Projects</h1>
          <p>Please provide the details of your personal projects</p>
          {projects.length === 0 ? (
            <div className="upl-box">
              <button onClick={() => setShowPopup(true)}>
                <i className="fa-solid fa-plus plus-icon"></i>
                <p>Add Project</p>
              </button>
            </div>
          ) : (
            <table className="project-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Skills</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.skills}</td>
                    <td>
                      <button onClick={() => editProject(index)}>Edit</button>
                      <button onClick={() => deleteProject(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="set-btns">
            {projects.length > 0 && (
              <>
                <button onClick={() => setShowPopup(true)}>
                  Add Another Project
                </button>
                <button
                  onClick={submitProjects}
                  disabled={projects.length === 0}
                >
                  Continue
                </button>
              </>
            )}
            {projects.length === 0 && <button>Skip</button>}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>
              {editIndex !== null ? "Edit Project" : "Add Project"} Details
            </h2>

            <label htmlFor="projectName">Project Name</label>
            <input
              id="projectName"
              type="text"
              name="name"
              placeholder="Project name"
              value={newProject.name}
              onChange={handleInputChange}
            />

            <label htmlFor="projectDescription">Project Description</label>
            <textarea
              id="projectDescription"
              name="description"
              placeholder="Project description"
              value={newProject.description}
              onChange={handleInputChange}
            />

            <label>Skills Used:</label>
            <TagsInput
              onTagsChange={handleTagsChange}
              initialTags={newProject.skills}
              placeholder={"Type and press Enter to add skills"}
            />

            <label>Upload Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, "images")}
            />
            <div className="preview-container">
              {newProject.images.map((image, index) => (
                <div key={index} className="preview">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${JSON.stringify(newProject)}`}
                  />
                  <span
                    className="remove-preview"
                    onClick={() => removeFile("images", index)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>

            <label htmlFor="projectVideos">Upload Videos</label>
            <input
              id="projectVideos"
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => handleFileChange(e, "videos")}
            />
            <div className="preview-container">
              {newProject.videos.map((video, index) => (
                <div key={index} className="preview">
                  <video src={video} controls />
                  <span
                    className="remove-preview"
                    onClick={() => removeFile("videos", index)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>

            <div className="btn-grp">
              <button onClick={addOrEditProject}>
                {editIndex !== null ? "Save Changes" : "Add"}
              </button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupProjects;
