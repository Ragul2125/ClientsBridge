import axios from "axios";
import "../../CompanyReg/CompanyReg.css";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { choice } from "../../../api/registerations";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import toast from "react-hot-toast";

const ClientProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: client,
    error,
    loading,
    refetch,
  } = useAxiosFetch(`/admin/getRegisteration/${id}?role=client`);

  const send = async (selection) => {
    try {
      const res = await choice(selection, id, "client");
      if (res === true || res === false) {
        toast.success(`Client ${selection}ed successfully`);
        navigate("/admin/registration/client");
      } else {
        toast.error(res || "Unexpected error");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error fetching client data</h2>;
  if (!client) return <h2>No client data found</h2>;

  const clientDetails = [
    { label: "Name", value: client?.name || "Unknown User" },
    { label: "City", value: client?.city || "N/A" },
    { label: "State", value: client?.state || "N/A" },
    { label: "Country", value: client?.country || "N/A" },
    { label: "Description", value: client?.description || "N/A" },
    { label: "Email", value: client?.mailId || "N/A" },
    { label: "Phone Number", value: client?.phoneNumber || "N/A" },
    {
      label: "Social URLs",
      value: client?.socialUrls?.length ? (
        <div className="tagClose">
          {client.socialUrls.map((url) => (
            <a
              key={url}
              href={url}
              className="tagBox taglink"
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
          ))}
        </div>
      ) : (
        "N/A"
      ),
    },
  ];

  return (
    <div className="FreelancerProfile-container">
      <div className="freelancerprodetails-container">
        {clientDetails.map((detail) => (
          <div className="freelancerprodetails" key={detail.label}>
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

export default ClientProfile;
