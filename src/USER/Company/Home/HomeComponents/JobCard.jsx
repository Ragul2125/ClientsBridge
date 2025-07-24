import { formatDistanceToNow } from "date-fns";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const JobCard = ({ project }) => {
  return (
    <div className="company-home-card" key={project._id}>
      <div className="flex">
        <img
          className="company-home-card-img"
          src={project.clientID.profilePic}
          alt="dp"
        />
        <p className="company-home-card-title">{project.postTitle}</p>
      </div>
      <div className="flex-bw">
        <span className="company-home-card-cost">₹ {project.budget}</span>
        <span className="company-home-card-info">
          {formatDistanceToNow(new Date(project.createdAt), {
            addSuffix: true,
          })}
          <p className="company-home-card-count">
            <MdOutlinePeopleAlt />
            {project.interested.length}+ Interested
          </p>
        </span>
        {/* Update with actual data */}
      </div>
      <p className="company-home-card-summary">
        Summary
        <p className="company-home-card-summary-des">
          {project.description.substring(0, 100) + "...."}
        </p>
      </p>
      <Link
        to={`/${localStorage.getItem("role")}/home/${project._id}`}
        className="company-home-card-btn"
      >
        See more
      </Link>
    </div>
  );
};
export default JobCard;
