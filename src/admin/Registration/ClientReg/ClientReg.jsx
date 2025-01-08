import "./ClientReg.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ClientReg = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    async function getAllClients() {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/getAllClientRegisterations`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClients(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllClients();
  }, []);

  return (
    <>
      {clients.length > 0 && (
        <section className="clientreg-container">
          <div className="clientreg-tablecon">
            <table className="clientreg-table">
              <thead className="clientreg-thead">
                <tr>
                  <th>Image</th>
                  <th>Client Name</th>
                  <th>Type</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>More</th>
                </tr>
              </thead>
              <tbody className="clientreg-tbody">
                {clients.map((client) => {
                  return (
                    <tr key={client._id}>
                      <td className="clientreg-avatar">
                        {client.name.charAt(0).toUpperCase()}
                      </td>
                      <td>{client.name}</td>
                      <td>{client.country}</td>
                      <td>{client.phoneNumber}</td>
                      <td>{client.mailId}</td>
                      <td>
                        <Link
                          to={`${client?._id || ""}`}
                          className="clientregviewbtn"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default ClientReg;
