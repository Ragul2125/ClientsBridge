import React, { useEffect, useState } from "react";
import "../OrderList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Load from "../../../USER/ReuseableComponents/Loaders/Load";

export default function AllOrders() {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getStatusFromPath = (pathname) => {
    if (pathname.includes("pending")) return "pending";
    if (pathname.includes("active")) return "active";
    if (pathname.includes("ongoing")) return "ongoing";
    if (pathname.includes("satisfied")) return "satisfied"; // Adjust based on actual backend mapping
    if (pathname.includes("completed")) return "completed";
    return "all"; // Default case
  };

  const fetchOrders = async () => {
    const status = getStatusFromPath(window.location.pathname);
    let endpoint = "/api/admin/getJobs?status=" + status;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data) {
        setOrderList(data);
        setLoading(false);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [window.location.pathname]);

  return (
    <main className="orderlist-container">
      <p className="ordertxtmin">Active Members</p>
      <div className="order-tablecon">
        {loading ? (
          <Load type="load" />
        ) : error ? (
          <Load type="err" />
        ) : orderList.length === 0 ? (
          <Load type="nojobs" />
        ) : (
          <table className="order-table">
            <thead className="order-thead">
              <tr>
                <th>Projects Name</th>
                <th>Clients</th>
                <th>Budget</th>
                <th>Deadline</th>
                <th>Category</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody className="order-tbody">
              {orderList.map((order) => (
                <tr key={order._id}>
                  <td>{order.postTitle}</td>
                  <td>{order.clientID.name || "N/A"}</td>
                  <td>₹ {order.budget}</td>
                  <td>{new Date(order.deadline).toLocaleDateString()}</td>
                  <td>{order.category}</td>
                  <td>
                    <Link
                      to={`/admin/jobs/${getStatusFromPath(
                        window.location.pathname
                      )}/${order._id}`}
                      className="orderviewbtn"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
