import "../CompanyReg.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { choice } from "../../../api/registerations";

const CompanyProfile = () => {
  console.log("company profile runs");
  const navigate = useNavigate();
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [companyDetails, setCompanyDetails] = useState([]);
  useEffect(() => {
    async function getCompany() {
      try {
        console.log("useEffect runs");
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/getRegisteration/${id}?role=company`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    }
    getCompany();
  }, [id]);

  useEffect(() => {
    if (company) {
      setCompanyDetails([
        { label: "Name", value: company?.name || "Unknown User" },
        { label: "Owner name", value: company.ownerName || "Unknown User" },
        {
          label: "Manager name",
          value: company.managerName || "Unknown User",
        },
        { label: "Type", value: company.type || "N/A" },
        { label: "city", value: company.city || "N/A" },
        { label: "address", value: company.address || "N/A" },
        { label: "state", value: company.state || "N/A" },
        { label: "Country", value: company.country || "N/A" },
        { label: "Website URL", value: company.websiteUrl || "N/A" },
        { label: "Description", value: company.description || "N/A" },
        { label: "GST Number", value: company.gstNumber || "N/A" },
        { label: "License Number", value: company.licenseNumber || "N/A" },
        { label: "Email", value: company.mailId || "N/A" },
        { label: "Company size", value: company.size || "N/A" },
        { label: "Phone Number", value: company.phoneNumber || "N/A" },
      ]);
    }
  }, [company]);

  const send = async (selection) => {
    const ress = await choice(selection, id, "company");
    if (ress == true) {
      alert("Company " + selection + "ed");
      navigate("/registration/company");
    } else if (ress == false) {
      alert("Company" + selection + "ed");
      navigate("/registration/company");
    } else {
      alert(ress);
    }
  };

  if (company.name) {
    return (
      <div className="FreelancerProfile-container">
        <div className="freelancerprodetails-container">
          {companyDetails?.map((detail, index) => (
            <div className="freelancerprodetails" key={index}>
              <p className="freelancerprodetails-label">{detail.label}</p>
              <p className="freelancerprodetails-value">{detail.value}</p>
            </div>
          ))}
          <div className="freelancerprobtn-con">
            <p
              onClick={() => {
                send("reject");
              }}
              className="freelancerprobtn declinebtn"
            >
              Decline
            </p>
            <p
              onClick={() => {
                send("accept");
              }}
              className="freelancerprobtn acceptbtn"
            >
              Accept
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    <h2>Loading</h2>;
  }
};

export default CompanyProfile;
