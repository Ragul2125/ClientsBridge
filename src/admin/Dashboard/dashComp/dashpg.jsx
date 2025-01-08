import React, { useState } from "react";
import dashprofile from "../../../assets/svg/dashprofile.svg";
import tfreelancher from "../../../assets/svg/tfreelancer.svg";
import tcompany from "../../../assets/svg/tcompany.svg";
import pending from "../../../assets/svg/pending.svg";
import orders from "../../../assets/svg/order.svg";
import pendingorders from "../../../assets/svg/pendingorder.svg";
import companyorder from "../../../assets/svg/com-order.svg";
import totalorder from "../../../assets/svg/total-order.svg";
import loginuser from "../../../assets/svg/users.svg";
import grow from "../../../assets/svg/grow.svg";
import down from "../../../assets/svg/down.svg";
import "../dash.css";

const dashpg = ({ stats }) => {
  console.log(stats);
  const [dashboard, setDashBoard] = useState([
    {
      topic: "Total User",
      status: stats.totalUsers.status,
      img: dashprofile,
      value: stats.totalUsers.count,
      result: `${stats.totalUsers.value} ${stats.totalUsers.status} from last month`,
    },
    {
      topic: "Total Freelancer",
      img: tfreelancher,
      status: stats.totalFreelancers.status,
      value: stats.totalFreelancers.count,
      result: `${stats.totalFreelancers.value} ${stats.totalFreelancers.status} from last month`,
    },
    {
      topic: "Total Companies",
      img: tfreelancher,
      status: stats.totalCompanies.status,
      value: stats.totalCompanies.count,
      result: `${stats.totalCompanies.value} ${stats.totalCompanies.status} from last month`,
    },
    {
      topic: "Total Client",
      img: tcompany,
      status: stats.totalClients.status,
      value: stats.totalClients.count,
      result: `${stats.totalClients.value} ${stats.totalClients.status} from last month`,
    },
    {
      topic: "Total Pending Registrations",
      img: pending,
      status: stats.totalPendingRegisterations.status,
      value: stats.totalPendingRegisterations.count,
      result: `${stats.totalPendingRegisterations.value} ${stats.totalPendingRegisterations.status} from last month`,
    },

    {
      topic: "Total Rejected Registrations",
      img: pending,
      status: stats.totalRejected.status,
      value: stats.totalRejected.count,
      result: `${stats.totalRejected.value} ${stats.totalRejected.status} from last month`,
    },
    {
      topic: "Total Rejected Freelancers ",
      img: pending,
      status: stats.totalRejectedFreelancers.status,
      value: stats.totalRejectedFreelancers.count,
      result: `${stats.totalRejectedFreelancers.value} ${stats.totalRejectedFreelancers.status} from last month`,
    },
    {
      topic: "Total Rejected Companies ",
      img: pending,
      status: stats.totalRejectedCompanies.status,
      value: stats.totalRejectedCompanies.count,
      result: `${stats.totalRejectedCompanies.value} ${stats.totalRejectedCompanies.status} from last month`,
    },
    {
      topic: "Total Rejected Clients ",
      img: pending,
      status: stats.totalRejectedClients.status,
      value: stats.totalRejectedClients.count,
      result: `${stats.totalRejectedClients.value} ${stats.totalRejectedClients.status} from last month`,
    },
  ]);
  return (
    <div className="pgs">
      <header>
        <h1>Users</h1>
      </header>
      <div className="carts">
        {dashboard.map((details, index) => (
          <div className="cart" key={index}>
            <div className="cart-about">
              <div className="about-user">
                <p>{details.topic}</p>
                <h1>{details.value}</h1>
              </div>
              <img src={details.img} alt={details.topic} />
            </div>
            <div className="cart-result">
              <img
                src={details.status == "increasing" ? grow : down}
                alt="Growth Indicator"
              />
              <p>{details.result}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashpg;
