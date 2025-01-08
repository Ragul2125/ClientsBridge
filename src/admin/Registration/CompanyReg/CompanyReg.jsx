/* import { useEffect, useState } from "react";
import "./CompanyReg.css";
import axios from "axios";
import { Link } from "react-router-dom";
const CompanyReg = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    async function getAllCompanies() {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/getAllCompanyRegisterations`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompanies(data);
        console.log(companies);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCompanies();
  }, []);
*/

import "./CompanyReg.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const CompanyReg = () => {
  const [companies, setCompanies] = useState([]);
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  useEffect(() => {
    async function getAllCompanies() {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/getAllCompanyRegisterations`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompanies(data);
        console.log(companies);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCompanies();
  }, []);

  const handleAssignClick = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setSelectedFreelancer(null);
    }, 2000);
  };

  return (
    <>
      <section className="freelancerreg-container">
        {companies && companies.length > 0 ? (
          companies.map((freelancer, index) => (
            <div className="freelancer-card" key={index}>
              <div className="freelancerdp">
                {freelancer.name.charAt(0).toUpperCase()}
              </div>
              <p className="freelancerusername">{freelancer.name}</p>
              <p className="freelancerprofession">{freelancer.type || "N/A"}</p>

              {location.pathname.includes("assign") ? (
                <p
                  onClick={() => handleAssignClick(freelancer)}
                  className="freelancerviewbtn"
                >
                  Assign
                </p>
              ) : (
                <Link
                  to={`${freelancer?.id || ""}`}
                  className="freelancerviewbtn"
                >
                  View
                </Link>
              )}
            </div>
          ))
        ) : (
          <p>No freelancers available</p>
        )}
        <p
          style={{
            width: "100%",
            textAlign: "center",
            color: "gray",
            fontStyle: "italic",
          }}
        >
          No more Company registrations to show.
        </p>
      </section>
      {/* -------------------------------Popup--------------- */}
      {/* {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={assignedimg} alt="" />
            <p>Job Has been assigned sucessfully!</p>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CompanyReg;
