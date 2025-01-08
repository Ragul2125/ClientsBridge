import React from "react";
import "../Nav/Nav.css";
import logo from "../../assets/image/logo.svg";
import TopNav from "./TopNav.jsx";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAppRegistration } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

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
            <img src={logo} alt="profileImg" />
            <h2>CLIENTSBRIDGE</h2>
          </header>
          <div className="sideContent">
            <ul>
              <li
                className={
                  location.pathname === "/admin" ||
                  location.pathname === "dashboard"
                    ? "active"
                    : ""
                }
              >
                <div className="side"></div>
                <Link className="ln" to="/admin">
                  <h2>
                    <LuLayoutDashboard />
                  </h2>
                  <p>Dashboard</p>
                </Link>
              </li>
              <li
                className={
                  location.pathname.includes("/registration") ? "active" : ""
                }
              >
                <div className="side"></div>
                <Link className="ln" to="/admin/registration/client">
                  <h2>
                    <MdOutlineAppRegistration />
                  </h2>
                  <p>Registration</p>
                </Link>
              </li>
              <li
                className={location.pathname.includes("/inbox") ? "active" : ""}
              >
                <div className="side"></div>
                <Link className="ln" to="/admin/inbox">
                  <h2>
                    <AiOutlineMessage />
                  </h2>
                  <p>Inbox</p>
                </Link>
              </li>
              <li
                className={location.pathname.includes("/jobs") ? "active" : ""}
              >
                <div className="side"></div>
                <Link className="ln" to="/admin/jobs/pending">
                  <h2>
                    <GiWallet />
                  </h2>
                  <p>Job List</p>
                </Link>
              </li>
              <li
                className={
                  location.pathname.includes("/transaction") ? "active" : ""
                }
              >
                <div className="side"></div>
                <Link className="ln" to="/admin/transaction">
                  <h2>
                    <IoShieldCheckmark />
                  </h2>
                  <p>Transaction</p>
                </Link>
              </li>
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
        <Link
          to="/admin"
          className={`navbtmicon ${location.pathname === "/" ? "activeb" : ""}`}
        >
          <LuLayoutDashboard />
        </Link>
        <Link
          to="/admin/registration/client"
          className={`navbtmicon ${
            location.pathname.includes("/registration") ? "activeb" : ""
          }`}
        >
          <MdOutlineAppRegistration />
        </Link>
        <Link
          to="/admin/inbox"
          className={`navbtmicon ${
            location.pathname.includes("/inbox") ? "activeb" : ""
          }`}
        >
          <AiOutlineMessage />
        </Link>
        <Link
          to="/admin/jobs/pending"
          className={`navbtmicon ${
            location.pathname.includes("/order") ? "activeb" : ""
          }`}
        >
          <GiWallet />
        </Link>
        <Link
          to="/admin/transaction"
          className={`navbtmicon ${
            location.pathname.includes("/transaction") ? "activeb" : ""
          }`}
        >
          <IoShieldCheckmark />
        </Link>
      </nav>
    </>
  );
};

export default SideMenu;
