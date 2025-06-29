import axios from "axios";
import "../../CompanyReg/CompanyReg.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { choice } from "../../../api/registerations";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import toast from "react-hot-toast";

const ClientProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [clientDetails, setClientDetails] = useState([]);

  const {
    data: client,
    error,
    loading,
    refetch,
  } = useAxiosFetch(`/admin/getRegisteration/${id}?role=client`);

  useEffect(() => {
    if (client) {
      setClientDetails([
        { label: "Name", value: client?.name || "Unknown User" },
        { label: "city", value: client.city || "N/A" },
        { label: "state", value: client.state || "N/A" },
        { label: "Country", value: client.country || "N/A" },
        { label: "Description", value: client.description || "N/A" },
        { label: "Email", value: client.mailId || "N/A" },
        { label: "Phone Number", value: client.phoneNumber || "N/A" },
        {
          label: "Social URL's",
          value:
            (
              <div className="tagClose">
                {" "}
                {client?.socialUrls?.map((skill) => (
                  <a href={skill} className="tagBox taglink" target="_blank">
                    {skill}
                  </a>
                ))}
              </div>
            ) || "N/A",
        },
      ]);
    }
  }, [client]);

  const send = async (selection) => {
    try {
      const ress = await choice(selection, id, "client");
      if (ress === true) {
        toast.success(`Client ${selection}ed successfully`);
        navigate("/admin/registration/client");
      } else if (ress === false) {
        toast.success(`Client ${selection}ed successfully`);
        navigate("/admin/registration/client");
      } else {
        toast.error(ress || "Unexpected error");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  if (client?.name) {
    return (
      <div className="FreelancerProfile-container">
        <div className="freelancerprodetails-container">
          {clientDetails?.map((detail, index) => (
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
export default ClientProfile;
