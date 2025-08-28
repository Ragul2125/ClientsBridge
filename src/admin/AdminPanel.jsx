import profileImg from "../assets/image/profileImg.svg";
import { Outlet, Routes, Route, useNavigate } from "react-router-dom";

// Components
import SideMenu from "../ReuseableComponents/Nav/SideMenu.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Registration from "./Registration/Reg.jsx";
import ClientReg from "./Registration/ClientReg/ClientReg.jsx";
import FreelancerReg from "./Registration/FreelancerReg/FreelancerReg.jsx";
import FreelancerProfile from "./Registration/FreelancerReg/FreelancerCompo/FreelancerProfile.jsx";
import CompanyReg from "./Registration/CompanyReg/CompanyReg.jsx";
import CompanyProfile from "./Registration/CompanyReg/Companycomp/CompanyProfile.jsx";
import ClientProfile from "./Registration/ClientReg/Clientcomp/ClientProfile.jsx";
import Inbox from "./Inbox/Inbox.jsx";
import InAllChat from "./Inbox/InboxCOMPO/InAllChat.jsx";
import InChat from "./Inbox/InboxCOMPO/InChat.jsx";
import OrderList from "./OrderList/OrderList.jsx";
import Transaction from "./Transaction/Transaction.jsx";
import { useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   async function summa() {
  //     try {
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/api/log`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       console.log("logger runs");
  //     } catch (error) {
  //       if (error.status == 401) {
  //         localStorage.clear("token");
  //         localStorage.clear("role");
  //         navigate("/login");
  //       }
  //     }
  //   }
  //   summa();
  // }, []);
  return (
    <>
      {/* Top bar for mobile view */}
      <div className="mobiletop">
        <div className="logocon">
          <h3>CLIENTSBRIDGE</h3>
        </div>
        <img className="userdp" src={profileImg} alt="profile" />
      </div>

      {/* Main Admin Container */}
      <main className="admin-container">
        <SideMenu />
        <Routes>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Registration */}
          <Route path="registration" element={<Registration />}>
            <Route index element={<ClientReg />} />
            <Route path="client" element={<ClientReg />} />
            <Route path="client/:id" element={<ClientProfile />} />
            <Route path="freelancer" element={<FreelancerReg />} />
            <Route path="freelancer/:id" element={<FreelancerProfile />} />
            <Route path="company" element={<CompanyReg />} />
            <Route path="company/:id" element={<CompanyProfile />} />
          </Route>

          {/* Inbox */}
          <Route path="inbox" element={<Inbox />}>
            <Route index element={<InAllChat />} />
            <Route path="bin" element={<InAllChat />} />
            <Route path="chat/:conversationId" element={<InChat />} />
          </Route>

          {/* Order List */}
          <Route path="jobs/*" element={<OrderList />} />

          {/* Transaction */}
          <Route path="transaction" element={<Transaction />} />
        </Routes>
      </main>
    </>
  );
}
