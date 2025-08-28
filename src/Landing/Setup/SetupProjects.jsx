// src/components/SetupProjects/SetupProjects.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Modal from "./Modal"; // A new, reusable Modal component
import TagsInput from "../Registerations/TagsInput";
import logo from "../../assets/logo.png";
import "./Setup.css"; // We'll use a dedicated CSS file

const initialProjectState = {
  name: "",
  description: "",
  skills: [],
  images: [],
  videos: [],
};

const SetupProjects = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentProject, setCurrentProject] = useState(initialProjectState);

  // Effect to clean up blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      projects.forEach((p) => {
        p.images.forEach((file) => URL.revokeObjectURL(file.preview));
        p.videos.forEach((file) => URL.revokeObjectURL(file.preview));
      });
    };
  }, [projects]);

  const openModal = () => {
    setEditIndex(null);
    setCurrentProject(initialProjectState);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(initialProjectState);
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const handleTagsChange = (tags) => {
    setCurrentProject({ ...currentProject, skills: tags });
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files).map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const currentImagesCount = currentProject.images.length;
    const currentVideosCount = currentProject.videos.length;

    if (currentImagesCount + currentVideosCount + files.length > 5) {
      return toast.error("You can upload a maximum of 5 files total.");
    }
    if (
      type === "videos" &&
      files.some((file) => file.size > 25 * 1024 * 1024)
    ) {
      return toast.error("Each video must be less than 25 MB.");
    }

    setCurrentProject((prev) => ({
      ...prev,
      [type]: [...prev[type], ...files],
    }));
  };

  const removeFile = (type, indexToRemove) => {
    const fileToRemove = currentProject[type][indexToRemove];
    URL.revokeObjectURL(fileToRemove.preview); // Clean up blob URL
    setCurrentProject((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, index) => index !== indexToRemove),
    }));
  };

  const addOrUpdateProject = () => {
    if (
      !currentProject.name ||
      !currentProject.description ||
      currentProject.skills.length === 0
    ) {
      return toast.error("Please fill all required fields.");
    }

    if (editIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = currentProject;
      setProjects(updatedProjects);
      toast.success("Project updated!");
    } else {
      setProjects([...projects, currentProject]);
      toast.success("Project added!");
    }
    closeModal();
  };

  const editProject = (index) => {
    setEditIndex(index);
    setCurrentProject(projects[index]);
    setIsModalOpen(true);
  };

  const deleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
    toast.success("Project removed.");
  };

  const submitProjects = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      return toast.error("Authentication error. Please log in again.");
    }

    setIsSubmitting(true);
    const submissionPromise = async () => {
      // Use Promise.all to send requests in parallel for better performance
      const projectPromises = projects.map((project) => {
        const formData = new FormData();
        formData.append(
          "project",
          JSON.stringify({
            name: project.name,
            description: project.description,
            skillsUsed: project.skills,
          })
        );
        project.images.forEach((image) => formData.append("images", image));
        project.videos.forEach((video) => formData.append("videos", video));

        return axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/freelancer/${userId}/createProject`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      });

      await Promise.all(projectPromises);
    };

    toast
      .promise(submissionPromise(), {
        loading: "Submitting projects...",
        success: "All projects submitted successfully!",
        error: "An error occurred while submitting.",
      })
      .then(() => {
        const userRole = localStorage.getItem("role") || role;
        navigate(`/${userRole.toLowerCase()}`);
      })
      .catch(console.error)
      .finally(() => setIsSubmitting(false));
  };

  return (
    <main className="setup-container">
      <img src={logo} alt="ClientsBridge" className="logo" />
      <section className="setup-box">
        <div className="setup-content">
          <h1>Upload Projects</h1>
          <p>
            Showcase your best work by adding details of your personal projects.
          </p>

          {projects.length === 0 ? (
            <div className="empty-projects-view">
              <button onClick={openModal} className="add-project-button">
                <i className="fa-solid fa-plus plus-icon"></i>
                <span>Add Your First Project</span>
              </button>
            </div>
          ) : (
            <div className="projects-table-container">
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
                      <td data-label="Name">{project.name}</td>
                      <td data-label="Description">{project.description}</td>
                      <td data-label="Skills" className="skills-cell">
                        {project.skills.map((skill) => (
                          <span key={skill} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </td>
                      <td data-label="Actions" className="actions-cell">
                        <button
                          onClick={() => editProject(index)}
                          className="action-btn edit-btn"
                          aria-label="Edit Project"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => deleteProject(index)}
                          className="action-btn delete-btn"
                          aria-label="Delete Project"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bottom-actions">
            {projects.length > 0 && (
              <button onClick={openModal} className="btn-secondary">
                Add Another Project
              </button>
            )}
            <button
              onClick={
                projects.length > 0
                  ? submitProjects
                  : () => navigate(`/${role}`)
              }
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : projects.length > 0
                ? "Continue"
                : "Skip for Now"}
            </button>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addOrUpdateProject();
          }}
        >
          <h2>{editIndex !== null ? "Edit Project" : "Add New Project"}</h2>

          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={currentProject.name}
              onChange={handleInputChange}
              placeholder="e.g., E-commerce Platform"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Project Description</label>
            <textarea
              id="description"
              name="description"
              value={currentProject.description}
              onChange={handleInputChange}
              placeholder="Describe your project"
              required
            />
          </div>

          <div className="form-group">
            <label>Skills Used</label>
            <TagsInput
              onTagsChange={handleTagsChange}
              initialTags={currentProject.skills}
            />
          </div>

          <div className="form-group">
            <label>Upload Media (Up to 5 total)</label>
            <div className="file-inputs">
              <label htmlFor="images" className="file-label">
                Add Images
              </label>
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(e, "images")}
              />
              <label htmlFor="videos" className="file-label">
                Add Videos
              </label>
              <input
                id="videos"
                type="file"
                multiple
                accept="video/*"
                onChange={(e) => handleFileChange(e, "videos")}
              />
            </div>
          </div>

          <div className="preview-container">
            {currentProject.images.map((file, i) => (
              <div key={i} className="preview-item">
                <img src={file.preview} alt={file.name} />
                <button
                  type="button"
                  onClick={() => removeFile("images", i)}
                  className="remove-btn"
                >
                  &times;
                </button>
              </div>
            ))}
            {currentProject.videos.map((file, i) => (
              <div key={i} className="preview-item">
                <video src={file.preview} controls />
                <button
                  type="button"
                  onClick={() => removeFile("videos", i)}
                  className="remove-btn"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={closeModal}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editIndex !== null ? "Save Changes" : "Add Project"}
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default SetupProjects;
