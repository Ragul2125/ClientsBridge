import { useState, useEffect } from "react";
import axios from "axios";
import dp from "../../../assets/dp.png";
import { FaEye } from "react-icons/fa";

const JobAssignPopup = ({ togglePopup, jobId }) => {
  const [freelancers, setFreelancers] = useState([]);
  const [selectedFreelancers, setSelectedFreelancers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/getFreelancersAnsCompanies`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFreelancers(response.data || []);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch freelancers. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreelancers();
  }, [jobId]);

  const handleCheckboxChange = (freelancerId) => {
    setSelectedFreelancers((prev) =>
      prev.includes(freelancerId)
        ? prev.filter((id) => id !== freelancerId)
        : [...prev, freelancerId]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/assignJob/${jobId}`,
        {
          freelancerIds: selectedFreelancers,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        togglePopup();
        window.location.href = "/admin/jobs/pending";
      } else {
        setError("Failed to assign freelancers. Please try again.");
      }
    } catch (err) {
      setError("Failed to assign freelancers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="assign-popup-overlay">
      <div className="assign-popup-content">
        <h2 className="assign-popup-title">Assign Freelancers</h2>
        {isLoading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="assign-freelancer-list">
            {freelancers.map((freelancer) => (
              <div className="assign-freelancer" key={freelancer._id}>
                <input
                  type="checkbox"
                  checked={selectedFreelancers.includes(freelancer._id)}
                  onChange={() => handleCheckboxChange(freelancer._id)}
                />
                <img
                  src={freelancer.profilePic || dp}
                  alt={freelancer.name}
                  className="assign-freelancer-img"
                />
                <div className="assign-freelancer-info">
                  <p className="assign-freelancer-name">{freelancer.name}</p>
                  <p className="assign-freelancer-username">
                    @{freelancer.userName}
                  </p>
                </div>
                <FaEye className="assign-eye-icon" />
              </div>
            ))}
          </div>
        )}
        <div className="assign-buttons-container">
          <button
            className="assign-confirm-btn"
            onClick={handleSubmit}
            disabled={selectedFreelancers.length === 0 || isLoading}
          >
            Confirm
          </button>
          <button className="assign-close-btn" onClick={togglePopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobAssignPopup;
