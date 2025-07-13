import React, { useEffect, useState } from "react";
import "../OrderList.css";
import { Link } from "react-router-dom";
import Load from "../../../USER/ReuseableComponents/Loaders/Load";
import useAxiosFetch from "../../../hooks/useAxiosFetch";

export default function AllOrders() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getStatusFromPath = (pathname) => {
    if (pathname.includes("pending")) return "pending";
    if (pathname.includes("active")) return "active";
    if (pathname.includes("ongoing")) return "ongoing";
    if (pathname.includes("satisfied")) return "satisfied";
    if (pathname.includes("completed")) return "completed";
    return "all";
  };

  const getDescFromPath = (pathname = window.location.pathname) => {
    if (pathname.includes("pending")) return "Needs your approval";
    if (pathname.includes("active"))
      return "Open for bidding or has been suggested a list of freelancers / comapnies";
    if (pathname.includes("ongoing"))
      return "A Freelancers / Company has been assigned and doing the job";
    if (pathname.includes("satisfied"))
      return "The client is satisfied with the Freelancer/Company's work";
    if (pathname.includes("completed"))
      return "Jobs that are completed and payments are done";
    return "all";
  };

  const status = getStatusFromPath(window.location.pathname);

  const { data, error, loading, refetch } = useAxiosFetch(
    `/admin/getJobs?status=${status}&page=${page}&limit=20&search=${debouncedSearch}`
  );

  useEffect(() => {
    if (data) {
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [window.location.pathname]);

  // Debounce search input by 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const orderList = data?.data;

  return (
    <main className="orderlist-container">
      <p className="ordertxtmin">{getDescFromPath()}</p>
      <input
        type="text"
        className="search-input"
        placeholder="Search by job title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="order-tablecon">
        {loading ? (
          <Load type="load" />
        ) : error ? (
          <Load type="err" />
        ) : orderList?.length === 0 ? (
          <Load type="nojobs" />
        ) : (
          <>
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
                {orderList?.map((order) => (
                  <tr key={order._id}>
                    <td>{order.postTitle}</td>
                    <td>{order.clientID?.name || "N/A"}</td>
                    <td>₹ {order.budget}</td>
                    <td>{new Date(order.deadline).toLocaleDateString()}</td>
                    <td>{order.category}</td>
                    <td>
                      <Link
                        to={`/admin/jobs/${status}/${order._id}`}
                        className="orderviewbtn"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  className={`pagination-btn ${
                    pg === currentPage ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(pg)}
                >
                  {pg}
                </button>
              ))}

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
