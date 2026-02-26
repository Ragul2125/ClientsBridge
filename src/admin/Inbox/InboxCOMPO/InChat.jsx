// src/Inbox/InboxCOMPO/Inchat.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchConversationById } from "../../api/conversationapi.js"; // Adjust path if needed
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import dp from "../../../assets/dp.png"; // Assuming this is the path to your default profile image
import "../Inbox.css";
import Load from "../../../USER/ReuseableComponents/Loaders/Load";

export default function Inchat() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentUserId, setCurrentUserId] = useState(""); // Replace with the actual current user ID

  useEffect(() => {
    const loadConversation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchConversationById(conversationId);
        setConversation(data.conversation);
        setCurrentUserId(data.conversation.participants.sender.id);
      } catch (error) {
        console.error("Error loading conversation:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversation();
  }, [conversationId]);

  const getCategoryStyle = (category) => {
    switch (category) {
      case "Primary":
        return { backgroundColor: "#00b69b3e", color: "#00b69b3e" };
      case "Work":
        return { backgroundColor: "#fd99563f", color: "#fd9a56" };
      case "Friend":
        return { backgroundColor: "#d356fd3f", color: "#d456fd" };
      case "Social":
        return { backgroundColor: "#5a8cff39", color: "#5a8cff" };
      default:
        return { backgroundColor: "grey", color: "black" };
    }
  };

  const formatTimestamp = (timestamp) => {
    try {
      if (!timestamp) {
        throw new Error("Timestamp is missing or undefined");
      }

      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid timestamp format");
      }

      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch (error) {
      console.error("Error formatting timestamp:", error.message);
      return "Invalid Time"; // Fallback display value
    }
  };

  if (isLoading) {
    return <Load type="load" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!conversation) {
    return <div>Conversation not found.</div>;
  }

  return (
    <section className="inboxchatmain">
      <article className="inboxchatinner">
        <header className="inboxchattop">
          <Link to="/admin/inbox" className="backbtn">
            <IoIosArrowBack />
          </Link>
          <p className="chatname">{conversation.participants.receiver.name}</p>
        </header>
        <div className="messagesbody">
          {conversation.messages.map((msg, index) => (
            <div
              key={index}
              className={`messagecon ${msg.msgByUserId === currentUserId ? "oppositemsgcon" : ""
                }`}
            >
              <div className="chatuserprofile">
                <img
                  src={
                    msg.msgByUserId === currentUserId
                      ? conversation.participants.sender.profilePic
                      : conversation.participants.receiver.profilePic
                  }
                  alt="User Profile"
                />
              </div>
              <div className="messagebody">
                {/* Text message */}
                {msg.text && <p className="message">{msg.text}</p>}

                {/* Image message */}
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Uploaded"
                    className="message-media"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  />
                )}

                {/* Video message */}
                {msg.videoUrl && (
                  <video
                    src={msg.videoUrl}
                    controls
                    className="message-media"
                    style={{
                      maxWidth: "100%",
                      marginTop: "10px",
                    }}
                  />
                )}

                {/* Audio message */}
                {msg.audioUrl && (
                  <audio
                    src={msg.audioUrl}
                    controls
                    className="message-media"
                    style={{
                      marginTop: "10px",
                    }}
                  />
                )}

                {/* PDF message */}
                {msg.pdfUrl && (
                  <a
                    href={msg.pdfUrl}
                    download
                    rel="noopener noreferrer"
                    className="message-media"
                    style={{
                      color: "#0056b3",
                      textDecoration: "underline",
                      marginTop: "10px",
                    }}
                  >
                    {msg.fileName || "View PDF"}
                  </a>
                )}

                <p className="messagetime">
                  {formatTimestamp(msg.createdAt)} {/* Use createdAt */}
                  <span style={{ marginLeft: "0.7em", cursor: "pointer" }}>
                    <BsThreeDotsVertical />
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
