import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to access the chat.");
      return;
    }

    // Initialize Socket.IO connection
    const newSocket = io(
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
      {
        auth: { token },
        transports: ["websocket"],
      }
    );

    newSocket.on("connect", () => {
      console.log("Connected to socket server:", newSocket.id);
    });

    // Handle errors
    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    // Handle online users
    newSocket.on("onlineUser", (users) => {
      setOnlineUsers(users);
      console.log("Online users:", users);
    });

    // Handle sidebar conversations
    newSocket.on("conversation", (conversations) => {
      setConversations(conversations);
    });

    // Handle messages
    newSocket.on("message", (messages) => {
      setMessages(messages);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    socket.emit("message-page", userId);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const data = {
      text: newMessage,
      sender: currentUser?._id,
      receiver: selectedUser,
      msgByUserId: currentUser?._id,
    };

    socket.emit("new-message", data);
    setNewMessage("");
  };

  const fetchSidebarConversations = () => {
    let currentUser = { _id: "67612b970417b32ce92f8d5f" };
    console.log("conv fetching");
    socket.emit("sidebar", currentUser?._id);
  };

  useEffect(() => {
    if (socket) {
      console.log("socket existds");
      socket.on("message-user", (userDetails) => {
        console.log(userDetails);
        setCurrentUser(userDetails);
      });
      fetchSidebarConversations();
    }
  }, [socket]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "25%",
          borderRight: "1px solid #ccc",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <h3>Conversations</h3>
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() => handleSelectUser(conversation.receiver._id)}
              style={{
                cursor: "pointer",
                margin: "10px 0",
                padding: "10px",
                backgroundColor:
                  selectedUser === conversation.receiver._id
                    ? "#f0f0f0"
                    : "#fff",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              {conversation.receiver.name}{" "}
              {conversation.unseenMsg > 0 && (
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "3px 7px",
                    borderRadius: "50%",
                    marginLeft: "5px",
                  }}
                >
                  {conversation.unseenMsg}
                </span>
              )}
            </div>
          ))
        ) : (
          <p>No conversations available.</p>
        )}
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          {selectedUser ? (
            messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    textAlign:
                      message.msgByUserId === currentUser?._id
                        ? "right"
                        : "left",
                    margin: "5px 0",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor:
                        message.msgByUserId === currentUser?._id
                          ? "#d4edda"
                          : "#f8d7da",
                      maxWidth: "70%",
                    }}
                  >
                    {message.text}
                  </span>
                </div>
              ))
            ) : (
              <p>No messages yet.</p>
            )
          ) : (
            <p>Select a conversation to start chatting.</p>
          )}
        </div>

        {/* Message Input */}
        {selectedUser && (
          <div style={{ display: "flex" }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
