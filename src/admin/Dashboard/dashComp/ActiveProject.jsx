import React, { useState } from "react";
import more from "../../../assets/image/more.svg";
import orders from "../../../assets/svg/order.svg";

const ActiveProject = ({ stats }) => {
  const [heading, setHeading] = useState([
    "Project Title",
    "Description",
    "Budget",
    "Deadline",
    "Category",
  ]);
  const [rows, setRows] = useState(stats?.activeJobs);
  return (
    <div className="activeProject">
      <div className="active-box">
        <header>
          <h2>Active Project</h2>
          <div className="month">
            <p>october</p>
            <img src={more} alt="" />
          </div>
        </header>
        <div className="table">
          <table>
            <thead>
              <tr>
                {heading.map((details, index) => (
                  <th key={index}>{details}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((details, index) => (
                <tr key={index}>
                  <td className="first-col">
                    <img src={orders} alt="" />
                    <p>{details.postTitle}</p>
                  </td>
                  <td>{details.description.substring(0, 20)}</td>
                  <td>{details.budget}</td>
                  <td>{details.deadline.substring(0, 10)}</td>
                  <td>{details.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveProject;
