import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Callback = () => {
  const { token, role } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token, role);
    console.log(token == "false");
    if (token !== "false" && role) {
      console.log("not");
      // Store the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role.toLowerCase());
      // Redirect to the role-based page
      navigate(`/${role.toLowerCase()}`);
    } else if (token == "false") {
      console.log("works");
      navigate("/explore");
    }
  }, [token, role, navigate]);

  return (
    <div>
      <p>{token}</p>
      <p>{role}</p>
    </div>
  );
};

export default Callback;
