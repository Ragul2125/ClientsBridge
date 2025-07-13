import { Link, useLocation } from "react-router-dom";

const CompanyCard = ({ company, onAssign }) => {
  const location = useLocation();

  return (
    <div className="freelancer-card">
      <div className="freelancerdp">{company.name.charAt(0).toUpperCase()}</div>
      <p className="freelancerusername">{company.name}</p>
      <p className="freelancerprofession">{company.type || "N/A"}</p>

      {location.pathname.includes("assign") ? (
        <p onClick={() => onAssign(company)} className="freelancerviewbtn">
          Assign
        </p>
      ) : (
        <Link to={`${company?.id || ""}`} className="freelancerviewbtn">
          View
        </Link>
      )}
    </div>
  );
};

export default CompanyCard;
