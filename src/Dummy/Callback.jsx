import React, { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

const Callback = () => {
  const { token } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const role = searchParams.get("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== "false" && role) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role.toLowerCase());
      navigate(`/${role.toLowerCase()}`, { replace: true });
    } else if (token === "false") {
      navigate("/explore", { replace: true });
    }
  }, [token, role, navigate]);

  return null;
};

export default Callback;
