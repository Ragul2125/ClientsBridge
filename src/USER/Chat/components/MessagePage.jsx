import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { FaPlus, FaImage, FaVideo } from "react-icons/fa";
import { IoDocumentAttach, IoClose, IoArrowBack } from "react-icons/io5";
import { FiArrowUpLeft } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import moment from "moment";
import uploadFile from "../../ReuseableComponents/helpers/uploadFile";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import ScrollToBottomButton from "./ScrollToBottomButton";
import "./MessagePage.css";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import FileUploadButton from "./FileUploadButton";

const MessagePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("chats");
  const [typingUsers, setTypingUsers] = useState(new Map());
  const [isTyping, setIsTyping] = useState(false);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [previewImage, setPreviewImage] = useState(null);
  const [seenMessages, setSeenMessages] = useState(new Set());

  const user = useSelector((state) => state?.user);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
    pdfUrl: "",
    fileName: "",
    audioUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const currentMessage = useRef(null);
  const [conversations, setConversations] = useState([]);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [onlineUserSet, setOnlineUserSet] = useState(new Set());
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessage]);

  useEffect(() => {
    if (socketConnection) {
      const handleOnlineUsers = (users) => {
        setOnlineUserSet(new Set(users));
      };

      const handleNewMessage = (message) => {
        setAllMessage((prev) => {
          const messageExists = prev.some((msg) => msg._id === message._id);
          if (!messageExists) {
            return [...prev, message];
          }
          return prev;
        });
      };

      const handleTyping = ({ userId }) => {
        setTypingUsers((prev) => new Map(prev).set(userId, true));
      };

      const handleStopTyping = ({ userId }) => {
        setTypingUsers((prev) => {
          const newMap = new Map(prev);
          newMap.delete(userId);
          return newMap;
        });
      };

      socketConnection.on("onlineUsers", handleOnlineUsers);
      socketConnection.on("new-message", handleNewMessage);
      socketConnection.on("typing", handleTyping);
      socketConnection.on("stop-typing", handleStopTyping);

      return () => {
        socketConnection.off("onlineUsers", handleOnlineUsers);
        socketConnection.off("new-message", handleNewMessage);
        socketConnection.off("typing", handleTyping);
        socketConnection.off("stop-typing", handleStopTyping);
      };
    }
  }, [socketConnection]);

  useEffect(() => {
    if (socketConnection && user?._id) {
      socketConnection.emit("user-online", user._id);
    }
  }, [socketConnection, user]);

  useEffect(() => {
    if (socketConnection && user?._id) {
      setIsLoadingConversations(true);
      socketConnection.emit("sidebar", user._id);

      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((conversation) => {
          const isCurrentUserSender = conversation?.sender?._id === user?._id;
          return {
            ...conversation,
            userDetails: isCurrentUserSender
              ? conversation.receiver
              : conversation.sender,
          };
        });

        const filteredConversations = conversationUserData.filter((conv) =>
          activeTab === "jobs" ? !conv.temp : conv.temp
        );

        setConversations(filteredConversations);
        setIsLoadingConversations(false);
      });

      return () => {
        socketConnection.off("conversation");
      };
    }
  }, [socketConnection, user, activeTab]);

  const debouncedEmitTyping = useCallback(
    debounce((isTyping, recipientId) => {
      if (socketConnection) {
        socketConnection.emit(isTyping ? "typing" : "stop-typing", {
          recipientId,
        });
      }
    }, 300),
    [socketConnection]
  );

  const handleUserSelect = useCallback(
    (conv) => {
      const userDetails = conv?.userDetails || conv;
      navigate(`/${localStorage.getItem("role")}/chat/${userDetails._id}`);
    },
    [navigate]
  );

  const handleBackToList = useCallback(() => {
    navigate(`/${localStorage.getItem("role")}/chat`);
  }, [navigate]);

  useEffect(() => {
    if (userId && conversations.length > 0) {
      const conversation = conversations.find(
        (conv) => conv.userDetails._id === userId
      );
      if (conversation) {
        if (socketConnection) {
          socketConnection.emit("message-page", userId);
          socketConnection.emit("seen", userId);
        }
      }
    }
  }, [userId, conversations, socketConnection]);

  useEffect(() => {
    if (location.pathname === `/${localStorage.getItem("role")}/chat`) {
      setAllMessage([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (socketConnection && userId) {
      socketConnection.on("message", (messages) => {
        setAllMessage(messages);

        const unseenMessages = messages.filter(
          (msg) =>
            !msg.seen &&
            msg.msgByUserId === userId &&
            msg.msgByUserId !== user._id
        );

        if (unseenMessages.length > 0) {
          unseenMessages.forEach((msg) => {
            socketConnection.emit("mark-seen", {
              messageId: msg._id,
              receiverId: userId,
              seenAt: new Date(),
            });
          });
        }

        if (chatContainerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } =
            chatContainerRef.current;
          const wasAtBottom = scrollHeight - scrollTop - clientHeight < 100;

          if (wasAtBottom) {
            setTimeout(() => {
              chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
            }, 100);
          }
        }
      });

      socketConnection.on("message-seen", ({ messageId, seenAt }) => {
        setAllMessage((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageId ? { ...msg, seen: true, seenAt } : msg
          )
        );
      });

      return () => {
        socketConnection.off("message");
        socketConnection.off("message-seen");
      };
    }
  }, [socketConnection, userId, user._id]);

  const handleMessageSeen = useCallback(
    (messageId) => {
      if (socketConnection && userId) {
        socketConnection.emit("mark-seen", {
          messageId,
          receiverId: userId,
          seenAt: new Date(),
        });
      }
    },
    [socketConnection, userId]
  );

  const handleMessageInput = (e) => {
    const newText = e.target.value;
    setMessage((prev) => ({ ...prev, text: newText }));

    if (userId) {
      if (newText.length > 0 && !isTyping) {
        socketConnection.emit("typing", { recipientId: userId });
        setIsTyping(true);
      } else if (newText.length === 0 && isTyping) {
        socketConnection.emit("stop-typing", { recipientId: userId });
        setIsTyping(false);
      }
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (
      !message.text &&
      !message.imageUrl &&
      !message.videoUrl &&
      !message.pdfUrl &&
      !message.audioUrl
    ) {
      return;
    }

    if (socketConnection && userId) {
      const newMessage = {
        sender: user._id,
        receiver: userId,
        text: message.text,
        imageUrl: message.imageUrl,
        videoUrl: message.videoUrl,
        pdfUrl: message.pdfUrl,
        fileName: "default",
        msgByUserId: user?._id,
        senderProfilePic: user?.profilePic,
        senderName: user?.name,
        seen: false,
        delivered: false,
      };

      socketConnection.emit("new-message", newMessage);
      setMessage({
        text: "",
        imageUrl: "",
        videoUrl: "",
        pdfUrl: "",
        fileName: "",
        audioUrl: "",
      });

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    messages.forEach((message) => {
      const messageDate = moment(message.createdAt);
      const today = moment().startOf("day");
      const yesterday = moment().subtract(1, "days").startOf("day");

      let dateKey;
      if (messageDate.isSame(today, "day")) {
        dateKey = "Today";
      } else if (messageDate.isSame(yesterday, "day")) {
        dateKey = "Yesterday";
      } else {
        dateKey = messageDate.format("DD-MM-YYYY");
      }

      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = [];
      }
      groupedMessages[dateKey].push(message);
    });
    return groupedMessages;
  };

  const isFirstInGroup = (message, index) => {
    if (index === 0) return true;
    const prevMessage = message[index - 1];
    return prevMessage.msgByUserId !== message.msgByUserId;
  };

  const isLastInGroup = (message, index) => {
    if (index === message.length - 1) return true;
    const nextMessage = message[index + 1];
    return nextMessage.msgByUserId !== message.msgByUserId;
  };

  return (
    <div className="message-page">
      <nav className="nav-bar">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === "chats" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("chats");
              navigate(`/${localStorage.getItem("role")}/chat`);
            }}
          >
            Chats
            {conversations.filter((conv) => conv.temp === true).length > 0 &&
              ` (${conversations.filter((conv) => conv.temp === true).length})`}
          </button>
          <button
            className={`nav-tab ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("jobs");
              navigate(`/${localStorage.getItem("role")}/chat`);
            }}
          >
            Jobs
            {conversations.filter((conv) => conv.temp === false).length > 0 &&
              ` (${
                conversations.filter((conv) => conv.temp === false).length
              })`}
          </button>
        </div>
      </nav>

      <div className="main-content">
        <div className={`conversation-list ${userId ? "hidden-mobile" : ""}`}>
          <div className="conversation-list-inner">
            {conversations.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FiArrowUpLeft size={50} />
                </div>
                <p className="empty-state-text">
                  Explore users to start a conversation with.
                </p>
              </div>
            ) : (
              conversations.map((conv) => {
                const isUserTyping = typingUsers.has(conv.userDetails._id);
                const hasUnreadMessages = conv.unseenMsg;
                const userDetails = conv.userDetails || {};
                const profilePic = userDetails.profilePic || "";
                const userName = userDetails.name || "Unknown User";

                const getLastMessageContent = () => {
                  if (isUserTyping) {
                    return {
                      text: "Typing...",
                      icon: <span className="typing-indicator-dot">●</span>,
                    };
                  }

                  if (!conv.lastMsg)
                    return { text: "No messages yet", icon: null };

                  if (conv.lastMsg.imageUrl) {
                    return {
                      text: "Photo",
                      icon: <FaImage className="message-type-icon" />,
                    };
                  }
                  if (conv.lastMsg.videoUrl) {
                    return {
                      text: "Video",
                      icon: <FaVideo className="message-type-icon" />,
                    };
                  }
                  if (conv.lastMsg.pdfUrl) {
                    return {
                      text: "PDF",
                      icon: <IoDocumentAttach className="message-type-icon" />,
                    };
                  }
                  return { text: conv.lastMsg.text, icon: null };
                };

                const lastMessageContent = getLastMessageContent();

                return (
                  <button
                    key={conv._id}
                    onClick={() => handleUserSelect(conv)}
                    className={`conversation-item ${
                      userId === conv.userDetails._id ? "selected" : ""
                    }`}
                  >
                    <Avatar
                      width={40}
                      height={40}
                      className="conversation-avatar"
                      imageUrl={conv.userDetails.profilePic}
                      name={conv.userDetails.name}
                      userId={conv.userDetails._id}
                    />
                    <div className="conversation-details">
                      <p className="conversation-name">
                        {conv.userDetails.name}
                      </p>
                      <p
                        className={`conversation-last-message ${
                          isUserTyping ? "typing" : ""
                        }`}
                      >
                        {lastMessageContent.icon}
                        {lastMessageContent.text}
                      </p>
                    </div>
                    {hasUnreadMessages > 0 && (
                      <span className="unread-badge">{hasUnreadMessages}</span>
                    )}
                    <span className="conversation-time">
                      {conv.lastMsg
                        ? moment(conv.lastMsg.createdAt).format("HH:mm")
                        : ""}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className={`chat-area ${!userId ? "hidden-mobile" : ""}`}>
          {userId ? (
            <>
              <div className="chat-header">
                <div className="chat-header-user">
                  <button className="back-button" onClick={handleBackToList}>
                    <IoArrowBack />
                  </button>
                  <Avatar
                    width={28}
                    height={28}
                    className="chat-header-avatar"
                    imageUrl={
                      conversations.find(
                        (conv) => conv.userDetails._id === userId
                      )?.userDetails.profilePic
                    }
                    name={
                      conversations.find(
                        (conv) => conv.userDetails._id === userId
                      )?.userDetails.name
                    }
                    userId={userId}
                  />
                  <div className="chat-header-info">
                    <span className="chat-header-name">
                      {
                        conversations.find(
                          (conv) => conv.userDetails._id === userId
                        )?.userDetails.name
                      }
                    </span>
                    <p className="chat-header-status">
                      {typingUsers.has(userId) ? (
                        <span className="typing-status">typing...</span>
                      ) : onlineUserSet.has(userId) ? (
                        "Online"
                      ) : (
                        "Offline"
                      )}
                    </p>
                  </div>
                </div>
                <button className="close-button" onClick={handleBackToList}>
                  <IoClose />
                </button>
              </div>

              <div ref={chatContainerRef} className="messages-container">
                <div className="messages-inner">
                  {Object.entries(groupMessagesByDate(allMessage)).map(
                    ([date, messages]) => (
                      <div key={date} className="message-group">
                        <div className="message-date">
                          <div className="message-date-inner">{date}</div>
                        </div>
                        <div className="message-list">
                          {messages.map((msg, index) => (
                            <MessageBubble
                              key={msg._id}
                              message={msg}
                              isOwnMessage={user._id === msg?.msgByUserId}
                              user={user}
                              onMessageSeen={handleMessageSeen}
                              onPreviewImage={setPreviewImage}
                              isFirstInGroup={isFirstInGroup(messages, index)}
                              isLastInGroup={isLastInGroup(messages, index)}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  )}
                  {typingUsers.has(userId) && (
                    <div className="typing-indicator-container">
                      <Avatar
                        width={32}
                        height={32}
                        imageUrl={
                          conversations.find(
                            (conv) => conv.userDetails._id === userId
                          )?.userDetails.profilePic
                        }
                        name={
                          conversations.find(
                            (conv) => conv.userDetails._id === userId
                          )?.userDetails.name
                        }
                        userId={userId}
                      />
                      <TypingIndicator />
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="message-input-area">
                <div className="message-input-container">
                  <FileUploadButton
                    onImageUpload={(file) =>
                      uploadFile(file, "image", userId, socketConnection)
                    }
                    onVideoUpload={(file) =>
                      uploadFile(file, "video", userId, socketConnection)
                    }
                    onPdfUpload={(file) =>
                      uploadFile(file, "pdf", userId, socketConnection)
                    }
                  />
                  <form className="message-form" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder="Write a message..."
                      value={message.text}
                      onChange={handleMessageInput}
                      className="message-input"
                    />
                    <button type="submit" className="send-button">
                      <IoMdSend />
                    </button>
                  </form>
                </div>
              </div>

              <ScrollToBottomButton
                className="scroll-to-bottom"
                containerRef={chatContainerRef}
                messages={allMessage}
                currentUserId={user?._id}
                onScrollToBottom={() => {
                  if (socketConnection && userId) {
                    socketConnection.emit("seen", userId);
                  }
                }}
              />
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-content">
                <h3 className="no-chat-title">Select a conversation</h3>
                <p className="no-chat-text">
                  Choose from your existing{" "}
                  {activeTab === "chats" ? "conversations" : "job discussions"}{" "}
                  or start a new one
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {previewImage && (
        <div className="image-preview-modal">
          <div className="image-preview-content">
            <img src={previewImage} alt="Preview" className="preview-image" />
            <button
              onClick={() => setPreviewImage(null)}
              className="close-preview-button"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <p className="loading-text">Uploading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
