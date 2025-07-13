import "./FreelancerReg.css";
import { useState, useMemo } from "react";
import Load from "../../../USER/ReuseableComponents/Loaders/Load";
import assignedimg from "../../../assets/svg/assigned.svg";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import FreelancerCard from "./FreelancerCompo/FreelancerCard";

const LIMIT = 20;

const FreelancerReg = () => {
  const [page, setPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const {
    data: freelancers,
    error,
    loading,
  } = useAxiosFetch(
    `/admin/getAllFreelancerRegisterations?page=${page}&limit=${LIMIT}`
  );

  const totalPages = useMemo(() => {
    if (!freelancers?.total) return 1;
    return Math.ceil(freelancers.total / LIMIT);
  }, [freelancers]);

  const handleAssignClick = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setIsPopupOpen(true);

    // Avoid stale closure by referencing latest state
    setTimeout(() => {
      setIsPopupOpen(false);
      setSelectedFreelancer(null);
    }, 2000);
  };

  const paginationButtons = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  if (loading) return <Load type="load" />;
  if (error) return <Load type="err" />;
  if (!freelancers?.data?.length) return <Load type="nojobs" />;

  return (
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

        {paginationButtons.map((pg) => (
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
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={assignedimg} alt="Assigned success" />
            <p>Job has been assigned successfully!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FreelancerReg;
