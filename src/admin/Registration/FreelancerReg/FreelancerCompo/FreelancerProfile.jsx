import "../FreelancerReg.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { choice } from "../../../api/registerations";

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: freelancer,
    error,
    loading,
  } = useAxiosFetch(`/admin/getRegisteration/${id}?role=freelancer`);

  const send = async (selection) => {
    try {
      const ress = await choice(selection, id, "freelancer");
      console.log(ress);
      if (ress == true || ress == false) {
        toast.success(`Freelancer ${selection}ed successfully`);
        navigate("/admin/registration/freelancer");
      } else {
        toast.error(ress || "Unexpected error");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  if (!freelancer) return <h2>No freelancer data found.</h2>;

  const freelancerDetails = [
    { label: "Name", value: freelancer.name || "Unknown User" },
    { label: "Description", value: freelancer.description || "N/A" },
    { label: "Email", value: freelancer.mailId || "N/A" },
    { label: "Password", value: "*********" },
    {
      label: "Date of Birth",
      value: freelancer.dob?.substring(0, 10) || "NaN",
    },
    { label: "City", value: freelancer.city || "N/A" },
    { label: "State", value: freelancer.state || "N/A" },
    { label: "Postal Code", value: freelancer.zipCode || "N/A" },
    { label: "Country", value: freelancer.country || "N/A" },
    {
      label: "Skills",
      value: (
        <div className="tagClose">
          {freelancer.skills?.map((skill, i) => (
            <div className="tagBox" key={i}>
              {skill}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Social URLs",
      value: (
        <div className="tagClose">
          {freelancer.socialUrls?.map((url, i) => (
            <a
              key={i}
              href={url}
              className="tagBox taglink"
              target="_blank"
              rel="noreferrer"
            >
              {url}
            </a>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="FreelancerProfile-container">
      <div className="freelancerprodetails-container">
        {freelancerDetails.map((detail, index) => (
          <div className="freelancerprodetails" key={index}>
            <p className="freelancerprodetails-label">{detail.label}</p>
            <p className="freelancerprodetails-value">{detail.value}</p>
          </div>
        ))}
        <div className="freelancerprobtn-con">
          <p
            onClick={() => send("reject")}
            className="freelancerprobtn declinebtn"
          >
            Decline
          </p>
          <p
            onClick={() => send("accept")}
            className="freelancerprobtn acceptbtn"
          >
            Accept
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
