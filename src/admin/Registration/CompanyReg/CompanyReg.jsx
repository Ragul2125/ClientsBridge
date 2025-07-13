import "./CompanyReg.css";
import { useState } from "react";
import Load from "../../../USER/ReuseableComponents/Loaders/Load";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import CompanyCard from "./Companycomp/CompanyCard";

const CompanyReg = () => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const {
    data: companies,
    error,
    loading,
  } = useAxiosFetch(
    `/admin/getAllCompanyRegisterations?page=${page}&limit=${limit}`
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleAssignClick = (company) => {
    setSelectedCompany(company);
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setSelectedCompany(null);
    }, 2000);
  };

  const totalPages = Math.ceil(companies?.total / limit);

  return (
    <>
      {loading ? (
        <Load type="load" />
      ) : error ? (
        <Load type="err" />
      ) : companies?.data.length > 0 ? (
        <>
          <section className="freelancerreg-container">
            {companies.data.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
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
            <p>Job has been assigned successfully!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyReg;
