import "../Navbar.css";
import React, { useEffect, useState } from "react";
import search from "../../../../assets/search.svg";
import back from "../../../../assets/back.svg";
// import profileImg from "../../../../assets/profileImg.svg";
import dp from '../../../assets/userdp.svg'
import { GoArrowUpRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TopNav = () => {
  const [userData, setUserData] = useState({});
  const [gsearch, setgsearch] = useState("");
  const navigate = useNavigate();

  const suggestions = [
    { name: "Client Registration", path: "/registration/client" },
    { name: "Freelancer Registration", path: "/registration/freelancer" },
    { name: "Company Registration", path: "/registration/company" },
    { name: "All Messages", path: "/inbox" },
    { name: "All Projects", path: "/order" },
    { name: "Active Members", path: "/order" },
    { name: "Recent Transactions", path: "/transaction" },
  ];

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().includes(gsearch.toLowerCase())
  );

  useEffect(() => {
    async function summa() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/log`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data) {
          setUserData(res.data);
        }
      } catch (error) {
        if (error.status == 401) {
          localStorage.clear("token");
          localStorage.clear("role");
          navigate("/login");
        }
      }
    }
    summa();
  }, []);

  return (
    <>
      <div className="topNav">
        <img
          className="backbtn"
          src={back}
          alt="back"
          style={{ cursor: "pointer" }}
          onClick={() => window.history.back()}
        />
        <div className="search">
          <img src={search} alt="search" />
          <input
            type="text"
            placeholder="Search"
            value={gsearch}
            onChange={(e) => setgsearch(e.target.value)}
          />
        </div>
        <div
          onClick={() =>
            navigate(`/${localStorage.getItem("role").toLowerCase()}/myProfile`)
          }
          className="profile"
        >
          {/* <img
            src={userData?.profilePic}
            className="profileImg"
            alt="Profile"
          /> */}
          {/* -------------------------------------------------DP----------- */}
          <img
            src={userData?.profilePic || dp}
            className="profileImg"
            alt="Profile"
            onError={(e) => { e.target.src = dp; }}
          />
          {/* -------------------------------------------------DP----------- */}

          <div className="profile-about">
            <h4>{userData.name || "Jayasree"}</h4>
            <p>{userData.userName || "Client"}</p>
          </div>
        </div>

        {gsearch && (
          <div className="searchsuggestioncon">
            <ul>
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <li key={index}>
                    <GoArrowUpRight />
                    <Link
                      onClick={() => setgsearch("")}
                      className="gslink"
                      to={suggestion.path}
                    >
                      {suggestion.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>🚫 No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default TopNav;
