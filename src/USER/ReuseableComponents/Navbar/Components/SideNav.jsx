import "../Navbar.css";
import React, { useState } from "react";
import {
  useLocation,
  Link,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineMessage } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { LuPanelLeftOpen } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiHomeAlt2 } from "react-icons/bi";

export default function SideNav() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Define the arrays
  const array1 = [
    {
      name: "Dashboard",
      path: "/client/dashboard",
      icon: <LuLayoutDashboard />,
    },
    { name: "Inbox", path: "/client/chat", icon: <AiOutlineMessage /> },
    { name: "Jobs", path: "/client/jobs/unassigned", icon: <GiWallet /> },
    /* {
      name: "Transaction",
      path: "/client/transaction",
      icon: <IoShieldCheckmark />,
    }, */
  ];

  const array2 = [
    { name: "Home", path: "/company/home", icon: <BiHomeAlt2 /> },
    { name: "Inbox", path: "/company/chat", icon: <AiOutlineMessage /> },
    { name: "Jobs", path: "/company/jobs/bidded", icon: <GiWallet /> },
    /* {
      name: "Transaction",
      path: "/company/transaction",
      icon: <IoShieldCheckmark />,
    }, */
  ];
  const array3 = [
    { name: "Home", path: "/freelancer/home", icon: <BiHomeAlt2 /> },
    { name: "Inbox", path: "/freelancer/chat", icon: <AiOutlineMessage /> },
    { name: "Jobs", path: "/freelancer/jobs/bidded", icon: <GiWallet /> },
    /* {
      name: "Transaction",
      path: "/freelancer/transaction",
      icon: <IoShieldCheckmark />,
    }, */
  ];

  const menuItems = location.pathname.toLowerCase().includes("client")
    ? array1
    : location.pathname.toLowerCase().includes("company")
    ? array2
    : array3;

  return (
    <div className={`Sidenav ${isExpanded ? "expanded" : ""}`}>
      <div className="navbar-top">
        <header>
          <img src={logo} alt="profileImg" />
          <h2 className="logotxt">{isExpanded && <p>CLIENTSBRIDGE</p>}</h2>
        </header>
        <div className="sidebar-content">
          <ul>
            <li onClick={toggleSidebar}>
              {!isExpanded && (
                <h2>
                  <LuPanelLeftOpen />
                </h2>
              )}
              {isExpanded && (
                <>
                  <h2>
                    <IoCloseCircleOutline />
                  </h2>
                  <p>Close</p>
                </>
              )}
            </li>
            {menuItems.map((item, index) => (
              <Link to={item.path} key={index}>
                <li>
                  <h2>{item.icon}</h2>
                  {isExpanded && <p>{item.name}</p>}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-bottom">
        <ul>
          {/* <li>
            <h2>
              <IoSettingsOutline />
            </h2>
            {isExpanded && <p>Setting</p>}
          </li> */}
          <li onClick={logout}>
            <h2>
              <IoLogOutOutline />
            </h2>
            {isExpanded && <p>Log out</p>}
          </li>
        </ul>
      </div>
    </div>
  );
}
