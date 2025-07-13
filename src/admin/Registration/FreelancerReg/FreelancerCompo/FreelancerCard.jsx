import { Link, useLocation } from "react-router-dom";

const FreelancerCard = ({ freelancer, onAssign }) => {
  const location = useLocation();
  console.log(freelancer);
  
  return (
    <div className="freelancer-card">
      <div className="freelancerdp">
        {freelancer.name.charAt(0).toUpperCase()}
      </div>
      <p className="freelancerusername">{freelancer.name}</p>
      <p className="freelancerprofession">
        {freelancer.description?.substring(0, 30) + "..." || "N/A"}
      </p>

      {location.pathname.includes("assign") ? (
        <p onClick={() => onAssign(freelancer)} className="freelancerviewbtn">
          Assign
        </p>
      ) : (
        <Link to={`${freelancer?.id || ""}`} className="freelancerviewbtn">
          View
        </Link>
      )}
    </div>
  );
};

export default FreelancerCard;
