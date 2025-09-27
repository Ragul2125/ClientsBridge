import React from "react";
import "./Nav.css";
import logo from "../../assets/image/logo.svg";
import TopNav from "./TopNav.jsx";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAppRegistration } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { IoShieldCheckmark, IoLogOutOutline } from "react-icons/io5";
import { BiHomeAlt2 } from "react-icons/bi";
import { color } from "framer-motion";

const adminNav = [
  {
    label: "Dashboard",
    icon: <LuLayoutDashboard />,
    path: "/admin",
    match: (path) => path === "/admin" || path === "dashboard",
  },
  {
    label: "Registration",
    icon: <MdOutlineAppRegistration />,
    path: "/admin/registration/client",
    match: (path) => path.includes("/registration"),
  },
  {
    label: "Inbox",
    icon: <AiOutlineMessage />,
    path: "/admin/inbox",
    match: (path) => path.includes("/inbox"),
  },
  {
    label: "Job List",
    icon: <GiWallet />,
    path: "/admin/jobs/pending",
    match: (path) => path.includes("/jobs"),
  },
  {
    label: "Transaction",
    icon: <IoShieldCheckmark />,
    path: "/admin/transaction",
    match: (path) => path.includes("/transaction"),
  },
];

const clientNav = [
  {
    label: "Dashboard",
    path: "/client/dashboard",
    icon: <LuLayoutDashboard />,
    match: (path) => path === "/Client" || path.includes("/client/dashboard"),
  },
  {
    label: "Inbox",
    path: "/client/chat",
    icon: <AiOutlineMessage />,
    match: (path) =>
      path.includes("/client/chat") || path === "/client/chat/:id",
  },
  {
    label: "Jobs",
    path: "/client/jobs/unassigned",
    icon: <GiWallet />,
    match: (path) => path.includes("/client/jobs"),
  },
  /* {
      name: "Transaction",
      path: "/client/transaction",
      icon: <IoShieldCheckmark />,
    }, */
];

const companyNav = [
  {
    label: "Dashboard",
    path: "/company/home",
    icon: <BiHomeAlt2 />,
    match: (path) => path.includes("/company/home") || path === "/company",
  },
  {
    label: "Inbox",
    path: "/company/chat",
    icon: <AiOutlineMessage />,
    match: (path) => path.includes("/company/chat"),
  },
  {
    label: "Jobs",
    path: "/company/jobs/bidded",
    icon: <GiWallet />,
    match: (path) => path.includes("/company/jobs"),
  },
  /* {
        name: "Transaction",
        path: "/company/transaction",
        icon: <IoShieldCheckmark />,
      }, */
];
const freelancerNav = [
  {
    label: "Dashboard",
    path: "/freelancer/home",
    icon: <BiHomeAlt2 />,
    match: (path) =>
      path.includes("/freelancer/home") || path === "/freelancer",
  },
  {
    label: "Inbox",
    path: "/freelancer/chat",
    icon: <AiOutlineMessage />,
    match: (path) => path.includes("/freelancer/chat"),
  },
  {
    label: "Jobs",
    path: "/freelancer/jobs/bidded",
    icon: <GiWallet />,
    match: (path) =>
      path === "/freelancer/jobs/bidded" ||
      path === "/freelancer/jobs/bidded/:id" ||
      path === "/freelancer/jobs/ongoing" ||
      path === "/freelancer/jobs/completed",
  },
  /* {
        name: "Transaction",
        path: "/freelancer/transaction",
        icon: <IoShieldCheckmark />,
      }, */
];
const navItems = location.pathname
  .toLowerCase()
  .includes("admin" || "dashboard")
  ? adminNav
  : location.pathname.toLowerCase().includes("client")
  ? clientNav
  : location.pathname.toLowerCase().includes("company")
  ? companyNav
  : freelancerNav;

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="sidebar">
        <TopNav />
        <div className="Nav-top">
          <header>
            <img src={logo} alt="logo" />
            <h2>CLIENTSBRIDGE</h2>
          </header>
          <div className="sideContent">
            <ul>
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={item.match(location.pathname) ? "active" : ""}
                >
                  <div className="side"></div>
                  <Link className="ln" to={item.path}>
                    <h2>{item.icon}</h2>
                    <p>{item.label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="Logout">
          <ul>
            <li onClick={logout}>
              <h2>
                <IoLogOutOutline />
              </h2>
              <p>Log out</p>
            </li>
          </ul>
        </div>
      </div>

      <nav className="navbottom">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`navbtmicon ${
              item.match(location.pathname) ? "activeb" : ""
            }`}
          >
            {item.icon}
          </Link>
        ))}
        {["Client", "Company", "Freelancer"].some((role) =>
          location.pathname.includes(role)
        ) ? (
          <div className="Logout" style={{ color: "white", cursor: "pointer" }}>
            <h2 onClick={logout}>
              <IoLogOutOutline />
            </h2>
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
};

export default SideMenu;
