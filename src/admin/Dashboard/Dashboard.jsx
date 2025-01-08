import React, { useEffect, useState } from "react";
import "./dash.css";
import Dashpg from "./dashComp/dashpg";
import Freelancerpg from "../Dashboard/dashComp/Freelancherpg";
import Company from "../Dashboard/dashComp/company";
import Client from "../Dashboard/dashComp/Client";
import ActiveProject from "./dashComp/ActiveProject";
import axios from "axios";
const Dashboard = () => {
  console.log("runnning");
  const [stats, setStats] = useState();
  useEffect(() => {
    async function runn() {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/statistics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status == 200) {
        setStats(res.data);
      }
    }
    runn();
  }, []);
  if (stats) {
    return (
      <div className="dashboard-page">
        <Dashpg stats={stats} />
        <Freelancerpg stats={stats} />
        <ActiveProject stats={stats} />
      </div>
    );
  }
};

export default Dashboard;
