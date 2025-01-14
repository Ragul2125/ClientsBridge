// import React, { useEffect, useState } from "react";
// import "./dash.css";
// import Dashpg from "./dashComp/dashpg";
// import Freelancerpg from "../Dashboard/dashComp/Freelancherpg";
// import Company from "../Dashboard/dashComp/company";
// import Client from "../Dashboard/dashComp/Client";
// import ActiveProject from "./dashComp/ActiveProject";
// import axios from "axios";
// const Dashboard = () => {
//   console.log("runnning");
//   const [stats, setStats] = useState();
//   useEffect(() => {
//     async function runn() {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/statistics`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (res.status == 200) {
//         setStats(res.data);
//       }
//     }
//     runn();
//   }, []);
//   if (stats) {
//     return (
//       <div className="dashboard-page">
//         <Dashpg stats={stats} />
//         <Freelancerpg stats={stats} />
//         <ActiveProject stats={stats} />
//       </div>
//     );
//   }
// };

// export default Dashboard;
// ==================================================================
import React, { useEffect, useState } from "react";
import "./dash.css";
import Dashpg from "./dashComp/dashpg";
import Freelancerpg from "../Dashboard/dashComp/Freelancherpg";
import Company from "../Dashboard/dashComp/company";
import Client from "../Dashboard/dashComp/Client";
import ActiveProject from "./dashComp/ActiveProject";
import axios from "axios";
import Load from '../../USER/ReuseableComponents/Loaders/Load';
const Dashboard = () => {
  console.log("running");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function runn() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/statistics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          setStats(res.data);
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    runn();
  }, []);

  if (loading) {
    return <p
      style={{
        height: '100vh',
        width: '100%',
        display: 'grid',
        placeItems: 'center'
      }}
    ><Load type='load' /></p>;
  }

  if (error) {
    return <p
      style={{
        height: '100vh',
        width: '100%',
        display: 'grid',
        placeItems: 'center'
      }}
    ><Load type='err' />;</p>
  }

  if (stats) {
    return (
      <div className="dashboard-page">
        <Dashpg stats={stats} />
        <Freelancerpg stats={stats} />
        <ActiveProject stats={stats} />
      </div>
    );
  }

  return null;
};

export default Dashboard;
