import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "./redux/userSlice";
import io from "socket.io-client";
import { useSocket } from "../../SocketContext";
import MessagePage from "./components/MessagePage";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();

  console.log("user", user);
  const token = localStorage.getItem("token");
  console.log(token);

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profilePic: "",
    online: false,
    _id: "",
  });

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
      console.log(userData);
      dispatch(setUser(userData));
      console.log("Fetched user details:", userData);

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
  }, [socket]);

  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(socketConnection);

    console.log("Token:", localStorage.getItem("token"));

    socketConnection.on("onlineUser", (data) => {
      console.log(data);
      dispatch(setOnlineUser(data));
    });
    dispatch(setSocketConnection(socketConnection));

    console.log(user, socket, token);
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const basePath = location.pathname === "/";

  return (
    <div className="home-container-chat">
      {/* <div className="sidebar-container">
        <Sidebar />
      </div> */}

      {basePath ? (
        <div className="empty-message-container">
          Select user to send message
        </div>
      ) : (
        <MessagePage />
      )}
    </div>
  );
};

export default Home;
