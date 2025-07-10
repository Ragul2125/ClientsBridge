import { formatDistanceToNow } from "date-fns";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const JobCard = ({ project }) => {
  return (
    <div className="company-home-card" key={project._id}>
      <img
        className="company-home-card-img"
        src={project.clientID.profilePic}
        alt="dp"
      />
      <p className="company-home-card-title">
        {project.postTitle}
        <span className="company-home-card-info">
          {" "}
          {formatDistanceToNow(new Date(project.createdAt), {
            addSuffix: true,
          })}
        </span>{" "}
        {/* Update with actual data */}
        <span className="company-home-card-cost">₹ {project.budget}</span>
      </p>
      <p className="company-home-card-count">
        <MdOutlinePeopleAlt />
        {project.interested.length}+ Interested
      </p>
      <p className="company-home-card-summary">
        Summary
        <p className="company-home-card-summary-des">
          {project.description.substring(0, 300) + "...."}
        </p>
      </p>
      <Link
        to={`/company/home/${project._id}`}
        className="company-home-card-btn"
      >
        See more
      </Link>
    </div>
  );
};
export default JobCard;
