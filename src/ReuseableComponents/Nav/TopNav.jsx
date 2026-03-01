import React, { useState } from "react";
import "./Nav.css";
import search from "../../assets/image/search.svg";
import back from "../../assets/image/back.svg";
import profileImg from "../../assets/image/profileImg.svg";
import more from "../../assets/image/More.svg";
import { GoArrowUpRight } from "react-icons/go";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosFetch from "../../hooks/useAxiosFetch";

const TopNav = () => {
  const [gsearch, setgsearch] = useState("");
  const [path, setPath] = useState("");

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

  const { data, error, loading, refetch } = useAxiosFetch("/log");

  {
    !loading && console.log(data);
  }

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenProfile = () => {
    const currentPath = location.pathname;
    let selectedPath = "";

    if (currentPath.includes("client") || currentPath.includes("Client")) {
      selectedPath = "client";
    } else if (currentPath.includes("company") || currentPath.includes("Company")) {
      selectedPath = "company";
    } else if (currentPath.includes("freelancer") || currentPath.includes("Freelancer")) {
      selectedPath = "freelancer";
    }

    if (selectedPath) {
      setPath(selectedPath);
      if (!currentPath.includes("myProfile")) {
        navigate(`/${selectedPath}/myProfile`);
      }
    } else {
      console.warn("Could not determine user role from path", currentPath);
    }
  };

  return (
    <>
      <div className="top-Nav">
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
        <div className="profile">
          <img
            src={data?.profilePic || profileImg}
            className="navproimg"
            alt="profileImg"
            onClick={handleOpenProfile}
          />
          <div className="profile-about">
            <h4>{data?.name || "Feron"}</h4>
            <p>{data?.role || "Admin"}</p>
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
                      onClick={() => {
                        setgsearch("");
                      }}
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
