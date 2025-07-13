import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import Avatar from "./Avatar";
import { IoDocumentAttach } from "react-icons/io5";
import "./MessageBubble.css";
import "./MediaPreview.css";

const MediaPreview = ({ type, url, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMediaClick = () => {
    setIsOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const renderMedia = () => {
    if (type === "image") {
      return (
        <img
          src={url}
          alt="Message attachment"
          className={`media-preview ${className}`}
          onClick={handleMediaClick}
        />
      );
    } else if (type === "video") {
      return (
        <video
          src={url}
          className={`media-preview ${className}`}
          onClick={handleMediaClick}
          controls
        />
      );
    }
    return null;
  };

  const renderFullScreenMedia = () => {
    if (type === "image") {
      return (
        <img src={url} alt="Full screen preview" className="fullscreen-media" />
      );
    } else if (type === "video") {
      return <video src={url} className="fullscreen-media" controls autoPlay />;
    }
    return null;
  };

  return (
    <>
      {renderMedia()}

      {isOpen && (
        <div className="overlay" onClick={handleClose}>
          <div className="overlay-content">
            <button className="close-button" onClick={handleClose}>
              <svg
                className="close-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {renderFullScreenMedia()}
          </div>
        </div>
      )}
    </>
  );
};

const MessageBubble = ({
  selectedUser,
  message,
  isOwnMessage,
  user,
  onMessageSeen,
  isFirstInGroup,
  isLastInGroup,
}) => {
  const messageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay to trigger the animation
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    if (messageRef.current && !isOwnMessage && !message.seen) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onMessageSeen(message._id);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(messageRef.current);
      return () => {
        observer.unobserve(messageRef.current);
        clearTimeout(timeoutId);
      };
    }

    return () => clearTimeout(timeoutId);
  }, [message._id, isOwnMessage, message.seen, onMessageSeen]);

  const messageClass = `message-bubble ${
    isOwnMessage ? "own-message" : "other-message"
  } ${isFirstInGroup ? "first-in-group" : "consecutive-message"}`;

  return (
    <div
      ref={messageRef}
      data-message-id={message._id}
      className={messageClass}
      style={{
        "--slide-x": isOwnMessage ? "10px" : "-10px",
      }}
    >
      {isFirstInGroup && (
        <div className="avatar-container">
          <Avatar
            width={28}
            height={28}
            imageUrl={
              isOwnMessage ? user?.profilePic : selectedUser?.profilePic
            }
            name={isOwnMessage ? user?.name : message.senderName}
            userId={message.msgByUserId}
            className={`avatar ${
              isOwnMessage ? "margin-left" : "margin-right"
            }`}
          />
        </div>
      )}

      <div
        className={`message-content ${
          isOwnMessage ? "align-end" : "align-start"
        }`}
      >
        <div
          className={`message-box ${isOwnMessage ? "own-bg" : "received-bg"}`}
        >
          {message.imageUrl && (
            <div className="media-container">
              <MediaPreview type="image" url={message.imageUrl} />
            </div>
          )}
          {message.videoUrl && (
            <div className="media-container">
              <MediaPreview type="video" url={message.videoUrl} />
            </div>
          )}
          {message.pdfUrl && (
            <div className="pdf-container">
              <IoDocumentAttach className="pdf-icon" />
              <a
                href={message.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-link"
              >
                {message.fileName || "Download PDF"}
              </a>
            </div>
          )}
          {message.text && <p className="message-text">{message.text}</p>}
        </div>
        <div className="message-meta">
          {isOwnMessage && (
            <span className="status">
              {message.seen ? "Seen" : "Delivered"}
            </span>
          )}
          <span className="timestamp">
            {moment(message.createdAt).format("h:mm A")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
