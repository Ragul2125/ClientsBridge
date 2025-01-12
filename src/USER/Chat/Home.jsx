import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "./redux/userSlice";
import io from "socket.io-client";
import { useSocket } from "../../SocketContext";
import MessagePage from "./components/MessagePage";
import axios from "axios";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const socket = useSocket();
  const [activeTab, setActiveTaab] = useState("chats");

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage. Redirecting to login.");
        dispatch(logout());
        navigate("/auth");
        return;
      }

      const URL = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/message/user-details`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const userData = response.data.data;
      dispatch(setUser(userData));

      if (userData.logout) {
        dispatch(logout());
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);

      if (error.response?.status === 401) {
        dispatch(logout());
        navigate("/auth");
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("onlineUser", (data) => {
        dispatch(setOnlineUser(data));
      });
    }
  }, [socket, dispatch]);

  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnlineUser(data));
    });
    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    // Set activeTab based on the current URL
    const path = location.pathname;
    if (path.includes("/chat")) {
      setActiveTab(path.includes("/jobs") ? "jobs" : "chats");
    }
  }, [location]);

  const setActiveTab = (tab) => {
    console.log(tab);
    setActiveTaab(tab);
  };

  return (
    <div className="home-container">
      {location.pathname.includes("/chat") ? (
        <MessagePage activeTab={activeTab} setActiveTab={setActiveTab} />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Home;
