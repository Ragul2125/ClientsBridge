import "../CompanyReg.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { choice } from "../../../api/registerations";

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: company,
    error,
    loading,
  } = useAxiosFetch(`/admin/getRegisteration/${id}?role=company`);

  const send = async (selection) => {
    try {
      const ress = await choice(selection, id, "company");
      if (ress === true || ress === false) {
        toast.success(`Company ${selection}ed successfully`);
        navigate("/admin/registration/company");
      } else {
        toast.error(ress || "Unexpected error");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  if (!company) return <h2>No company data found.</h2>;

  const companyDetails = [
    { label: "Name", value: company.name || "Unknown User" },
    { label: "Owner name", value: company.ownerName || "Unknown User" },
    { label: "Manager name", value: company.managerName || "Unknown User" },
    { label: "Type", value: company.type || "N/A" },
    { label: "City", value: company.city || "N/A" },
    { label: "Address", value: company.address || "N/A" },
    { label: "State", value: company.state || "N/A" },
    { label: "Country", value: company.country || "N/A" },
    { label: "Website URL", value: company.websiteUrl || "N/A" },
    { label: "Description", value: company.description || "N/A" },
    { label: "GST Number", value: company.gstNumber || "N/A" },
    { label: "License Number", value: company.licenseNumber || "N/A" },
    { label: "Email", value: company.mailId || "N/A" },
    { label: "Company size", value: company.size || "N/A" },
    { label: "Phone Number", value: company.phoneNumber || "N/A" },
  ];

  return (
    <div className="FreelancerProfile-container">
      <div className="freelancerprodetails-container">
        {companyDetails.map((detail, index) => (
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

export default CompanyProfile;
