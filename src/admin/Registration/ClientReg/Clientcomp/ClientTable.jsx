import { Link } from "react-router-dom";

const ClientTable = ({ data, page, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  const handlePageClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <>
      <div className="client-table-wrapper">
        <table className="clientreg-table">
          <thead className="clientreg-thead">
            <tr>
              <th>Image</th>
              <th>Client Name</th>
              <th>Country</th>
              <th>Phone</th>
              <th>Email</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody className="clientreg-tbody">
            {data.map((client) => (
              <tr key={client._id}>
                <td className="clientreg-avatar">
                  {client.name.charAt(0).toUpperCase()}
                </td>
                <td>{client.name}</td>
                <td>{client.country}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.mailId}</td>
                <td>
                  <Link to={`${client._id || ""}`} className="clientregviewbtn">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => handlePageClick(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
          <button
            key={pg}
            className={`pagination-btn ${pg === page ? "active" : ""}`}
            onClick={() => handlePageClick(pg)}
          >
            {pg}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={() => handlePageClick(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ClientTable;
