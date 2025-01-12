import "../FreelancerReg.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { choice, getFreelancerById } from "../../../api/registerations";

const FreelancerProfile = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getFreelancer() {
      const res = await getFreelancerById(id);
      if (res) {
        setFreelancer(res);
      }
    }
    getFreelancer();
  }, []);

  const send = async (selection) => {
    const ress = await choice(selection, id, "freelancer");
    if (ress == true) {
      alert("Freelancer " + selection + "ed");
      navigate("/admin/registration/freelancer");
    } else if (ress == false) {
      alert("Freelancer" + selection + "ed");
      navigate("/admin/registration/freelancer");
    } else {
      alert(ress);
    }
  };
  if (!freelancer) {
    return (
      <p style={{ margin: "2em", fontSize: "xx-large" }}>
        Freelancer not found.
      </p>
    );
  }

  const freelancerDetails = [
    { label: "Name", value: freelancer?.name || "Unknown User" },
    { label: "Description", value: freelancer?.description || "N/A" },
    { label: "Email", value: freelancer?.mailId || "N/A" },
    { label: "Password", value: "*********" },
    {
      label: "Date of Birth",
      value: freelancer?.dob?.substring(0, 10) || "NaN",
    },
    { label: "city", value: freelancer?.city || "N/A" },
    { label: "state", value: freelancer?.state || "N/A" },
    { label: "City", value: freelancer?.city || "N/A" },
    { label: "Postal Code", value: freelancer?.zipCode || "N/A" },
    { label: "Country", value: freelancer?.country || "N/A" },
    {
      label: "Skills",
      value:
        (
          <div className="tagClose">
            {" "}
            {freelancer?.skills?.map((skill) => (
              <div className="tagBox">{skill}</div>
            ))}
          </div>
        ) || "N/A",
    },
    {
      label: "Social URL's",
      value:
        (
          <div className="tagClose">
            {" "}
            {freelancer?.socialUrls?.map((skill) => (
              <a href={skill} className="tagBox taglink" target="_blank">
                {skill}
              </a>
            ))}
          </div>
        ) || "N/A",
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
