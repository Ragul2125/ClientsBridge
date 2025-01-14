import "./ClientReg.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Load from '../../../USER/ReuseableComponents/Loaders/Load';

const ClientReg = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAllClients() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL
          }/api/admin/getAllClientRegisterations`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClients(data);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Failed to fetch client data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getAllClients();
  }, []);

  return (
    <>
      {loading ? (
        <Load type='load' />
      ) : error ? (
          <Load type='err' />
      ) : clients.length > 0 ? (
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
                {clients.map((client) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <Load type='nojobs' />
      )}
    </>
  );
};

export default ClientReg;
