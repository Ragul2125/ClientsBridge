import "./FreelancerReg.css";
import { useState } from "react";
import Load from "../../../USER/ReuseableComponents/Loaders/Load";
import assignedimg from "../../../assets/svg/assigned.svg";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import FreelancerCard from "./FreelancerCompo/FreelancerCard";

const FreelancerReg = () => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const {
    data: freelancers,
    error,
    loading,
  } = useAxiosFetch(
    `/admin/getAllFreelancerRegisterations?page=${page}&limit=${limit}`
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const handleAssignClick = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setSelectedFreelancer(null);
    }, 2000);
  };

  const totalPages = Math.ceil(freelancers?.total / limit);

  return (
    <>
      {loading ? (
        <Load type="load" />
      ) : error ? (
        <Load type="err" />
      ) : freelancers?.data?.length > 0 ? (
        <>
          <section className="freelancerreg-container">
            {freelancers.data.map((freelancer) => (
              <FreelancerCard
                key={freelancer.id}
                freelancer={freelancer}
                onAssign={handleAssignClick}
              />
            ))}
          </section>
          <div className="pagination-container">
            <button
              className="pagination-btn"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                className={`pagination-btn ${pg === page ? "active" : ""}`}
                onClick={() => setPage(pg)}
              >
                {pg}
              </button>
            ))}

            <button
              className="pagination-btn"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <Load type="nojobs" />
      )}

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={assignedimg} alt="" />
            <p>Job has been assigned successfully!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FreelancerReg;
