import axios from "axios";
import "../../CompanyReg/CompanyReg.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { choice } from "../../../api/registerations";

const ClientProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [clientDetails, setClientDetails] = useState([]);
  useEffect(() => {
    async function getClient() {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/getRegisteration/${id}?role=client`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClient(data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    }
    getClient();
  }, [id]);

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
    const ress = await choice(selection, id, "client");
    if (ress == true) {
      alert("client " + selection + "ed");
      navigate("/registration/client");
    } else if (ress == false) {
      alert("client" + selection + "ed");
      navigate("/registration/client");
    } else {
      alert(ress);
    }
  };

  if (client.name) {
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
