import React, { useState } from "react";
import tfreelancher from "../../../assets/svg/tfreelancer.svg";
import pending from "../../../assets/svg/pending.svg";
import orders from "../../../assets/svg/order.svg";
import companyorder from "../../../assets/svg/com-order.svg";
import totalorder from "../../../assets/svg/total-order.svg";
import grow from "../../../assets/svg/grow.svg";
import "../dash.css";
import freelancerpending from "../../../assets/svg/freelancerpending.svg";

const freelancher = ({ stats }) => {
  const [freelancer, setFreelancher] = useState([
    {
      topic: "Total Jobs",
      img: orders,
      value: stats.totalJobs.count,
      result: `${stats.totalJobs.value} ${stats.totalJobs.status} from last month`,
    },
    {
      topic: "Total pending jobs",
      img: companyorder,
      value: stats.totalPendingJobs.count,
      result: `${stats.totalPendingJobs.value} ${stats.totalPendingJobs.status} from last month`,
    },
    {
      topic: "Total Active Jobs",
      img: freelancerpending,
      value: stats.totalActiveJobs.count,
      result: `${stats.totalActiveJobs.value} ${stats.totalActiveJobs.status} from last month`,
    },
    {
      topic: "Total Bidding Jobs",
      img: pending,
      value: stats.totalBiddingJobs.count,
      result: `${stats.totalBiddingJobs.value} ${stats.totalBiddingJobs.status} from last month`,
    },
    {
      topic: "Total Ongoing Jobs",
      img: tfreelancher,
      value: stats.totalOngoingJobs.count,
      result: `${stats.totalOngoingJobs.value} ${stats.totalOngoingJobs.status} from last month`,
    },
    {
      topic: "Total Satisfied Jobs",
      img: totalorder,
      value: stats.totalSatisfiedJobs.count,
      result: `${stats.totalSatisfiedJobs.value} ${stats.totalSatisfiedJobs.status} from last month`,
    },
    {
      topic: "Total Completed Jobs",
      img: totalorder,
      value: stats.totalCompletedJobs.count,
      result: `${stats.totalCompletedJobs.value} ${stats.totalCompletedJobs.status} from last month`,
    },
  ]);
  return (
    <div className="pgs">
      <header>
        <h1>Jobs</h1>
      </header>
      <div className="carts">
        {freelancer.map((details, index) => (
          <div className="cart" key={index}>
            <div className="cart-about">
              <div className="about-user">
                <p>{details.topic}</p>
                <h1>{details.value}</h1>
              </div>
              <img src={details.img} alt={details.topic} />
            </div>
            <div className="cart-result">
              <img src={grow} alt="Growth Indicator" />
              <p>{details.result}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default freelancher;
