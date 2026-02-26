import "./dash.css";
import Dashpg from "./dashComp/dashpg";
import Freelancerpg from "../Dashboard/dashComp/Freelancherpg";
import ActiveProject from "./dashComp/ActiveProject";
import Load from "../../USER/ReuseableComponents/Loaders/Load";
import useAxiosFetch from "../../hooks/useAxiosFetch";
const Dashboard = () => {
  const { data: stats, error, loading } = useAxiosFetch("/admin/statistics");

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <Load type="load" />
      </div>
    );
  }
  if (error) {
    return (
      <p
        style={{
          height: "100vh",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Load type="err" />;
      </p>
    );
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
