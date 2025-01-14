import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "./Avatar";
import { FaPlus, FaImage, FaVideo } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";
import { FiArrowUpLeft } from "react-icons/fi";
import { IoClose, IoArrowBack } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import moment from "moment";
import uploadFile from "../../ReuseableComponents/helpers/uploadFile";
import toast from "react-hot-toast";
import axios from "axios";
import { debounce } from "lodash";
import ScrollToBottomButton from "./ScrollToBottomButton";
import "./MessagePage.css";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FileUploadButton from "./FileUploadButton";

const MessagePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("chats");
  const [openFileUpload, setOpenFileUpload] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Map());
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [previewImage, setPreviewImage] = useState(null);
  const [seenMessages, setSeenMessages] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);

  // const [imagePreview, setImagePreview] = useState(null);
  // const [videoPreview, setVideoPreview] = useState(null);
  // const [pdfPreview, setPdfPreview] = useState(null);

  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profilePic: "",
    online: false,
    _id: "",
  });
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
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [conversations, setConversations] = useState([]);
  const dispatch = useDispatch();
  const {
    users = [],
    onlineUsers = [],
    authUser,
  } = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [onlineUserSet, setOnlineUserSet] = useState(new Set());
  // Add loading state for conversations
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [activeTabConversations, setActiveTabConversations] = useState([]);

  // Cache conversations by tab
  const conversationsCache = useRef({
    chats: [],
    jobs: [],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessage]);

  const [jobMessages, setJobMessages] = useState([]);

  const [isConnected, setIsConnected] = useState(false);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image file");
      return;
    }

    setLoading(true);
    try {
      const uploadResult = await uploadFile(file);

      if (socketConnection && selectedUser) {
        const newMessage = {
          sender: user?._id,
          receiver: selectedUser._id,
          msgByUserId: user?._id,
          fileType: "image",
          imageUrl: uploadResult.url,
          senderName: user?.name,
          senderProfilePic: user?.profilePic,
          createdAt: new Date(),
        };
        socketConnection.emit("new-message", newMessage);
        /* setAllMessage(prev => [...prev, newMessage]); */
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
      setOpenFileUpload(false);
    }
  };

  // Modified PDF upload handler
  const handleUploadPdf = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Define allowed document types
    const allowedTypes = {
      "application/pdf": "pdf",
      "application/msword": "doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "text/plain": "txt",
      "application/vnd.oasis.opendocument.text": "odt",
    };

    if (!Object.keys(allowedTypes).includes(file.type)) {
      toast.error(
        "Please select a valid document file (PDF, DOC, DOCX, TXT, ODT)"
      );
      return;
    }

    setLoading(true);
    try {
      const uploadResult = await uploadFile(file);

      if (socketConnection && selectedUser) {
        const newMessage = {
          sender: user?._id,
          receiver: selectedUser._id,
          msgByUserId: user?._id,
          fileType: allowedTypes[file.type],
          pdfUrl: uploadResult.url,
          fileName: file.name,
          senderName: user?.name,
          senderProfilePic: user?.profilePic,
          createdAt: new Date(),
        };

        socketConnection.emit("new-message", newMessage);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document");
    } finally {
      setLoading(false);
      setOpenFileUpload(false);
    }
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["video/mp4", "video/webm"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid video file");
      return;
    }

    setLoading(true);
    try {
      const uploadResult = await uploadFile(file);

      if (socketConnection && selectedUser) {
        const newMessage = {
          sender: user?._id,
          receiver: selectedUser._id,
          msgByUserId: user?._id,
          fileType: "video",
          videoUrl: uploadResult.url,
          fileName: file.name,
          senderName: user?.name,
          senderProfilePic: user?.profilePic,
          createdAt: new Date(),
        };

        socketConnection.emit("new-message", newMessage);
        /* setAllMessage(prev => [...prev, newMessage]); */
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload video");
    } finally {
      setLoading(false);
      setOpenFileUpload(false);
    }
  };

  // recieve online users and typing
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
        if (userId === selectedUser?._id) {
          setIsTyping(true);
        }
      };

      const handleStopTyping = ({ userId }) => {
        if (userId === selectedUser?._id) {
          setIsTyping(false);
        }
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
  }, [socketConnection, selectedUser]);

  //shows that we are online
  useEffect(() => {
    if (socketConnection && user?._id) {
      socketConnection.emit("user-online", user._id);
    }
  }, [socketConnection, user]);

  //scrolls down every 100ms
  useEffect(() => {
    if (currentMessage.current) {
      setTimeout(() => {
        currentMessage.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 100);
    }
  }, [allMessage, jobMessages]);

  //general connection management
  useEffect(() => {
    if (socketConnection) {
      socketConnection.on("connect", () => setIsConnected(true));
      socketConnection.on("disconnect", () => setIsConnected(false));

      socketConnection.on("error", (error) => {
        toast.error(error.message);
      });

      return () => {
        socketConnection.off("connect");
        socketConnection.off("disconnect");
        socketConnection.off("error");
      };
    }
  }, [socketConnection]);

  //sidebbar data
  useEffect(() => {
    if (socketConnection && user?._id) {
      setIsLoadingConversations(true);
      // First check if we have cached data for this tab
      if (conversationsCache.current[activeTab].length > 0) {
        setConversations(conversationsCache.current[activeTab]);
        setIsLoadingConversations(false);
      }
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

        // Filter and cache conversations based on activeTab
        const chatConversations = conversationUserData.filter(
          (conv) => conv.temp === true
        );
        const jobConversations = conversationUserData.filter(
          (conv) => conv.temp === false
        );

        conversationsCache.current = {
          chats: chatConversations,
          jobs: jobConversations,
        };

        // Set current tab's conversations
        setConversations(
          activeTab === "jobs" ? jobConversations : chatConversations
        );
        setIsLoadingConversations(false);

        // Filter conversations based on activeTab and temp field
        const filteredConversations = conversationUserData.filter((conv) => {
          if (activeTab === "jobs") {
            return conv.temp === false;
          } else {
            return conv.temp === true;
          }
        });

        setConversations(filteredConversations);
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

  // Update the typing event handlers
  useEffect(() => {
    if (socketConnection && selectedUser) {
      const handleTyping = ({ userId }) => {
        setTypingUsers((prev) => {
          const newMap = new Map(prev);
          // Clear existing timeout if any
          if (newMap.has(userId)) {
            clearTimeout(newMap.get(userId));
          }
          // Set new timeout
          const timeoutId = setTimeout(() => {
            setTypingUsers((current) => {
              const updated = new Map(current);
              updated.delete(userId);
              return updated;
            });
          }, 3000);
          newMap.set(userId, timeoutId);
          return newMap;
        });
      };

      socketConnection.on("typing", handleTyping);

      return () => {
        socketConnection.off("typing", handleTyping);
        // Clear all timeouts when unmounting
        typingUsers.forEach((timeoutId) => clearTimeout(timeoutId));
      };
    }
  }, [socketConnection, selectedUser]);

  const handleUserSelect = useCallback(
    (conv) => {
      const userDetails = conv?.userDetails || conv;
      setSelectedUser({
        ...userDetails,
        online: onlineUserSet.has(userDetails._id),
        profilePic: userDetails.profilePic,
      });
      setSelectedChatId(userDetails._id);
      navigate(
        `/${localStorage.getItem("role").toLowerCase()}/chat/${userDetails._id}`
      );

      if (socketConnection) {
        socketConnection.emit("message-page", userDetails._id);
        socketConnection.emit("seen", userDetails._id);

        setConversations((prev) =>
          prev.map((c) =>
            c.userDetails._id === userDetails._id ? { ...c, unseenMsg: 0 } : c
          )
        );
      }
    },
    [socketConnection, onlineUserSet, navigate]
  );

  // Modified handleBackToList
  const handleBackToList = useCallback(() => {
    setSelectedUser(null);
    setSelectedChatId(null);
    navigate("/messages");
  }, [navigate]);

  // Effect to handle URL-based user selection
  useEffect(() => {
    if (userId && conversations.length > 0) {
      const conversation = conversations.find(
        (conv) => conv.userDetails._id === userId
      );
      if (conversation) {
        const userDetails = conversation.userDetails;
        setSelectedUser({
          ...userDetails,
          online: onlineUserSet.has(userDetails._id),
          profilePic: userDetails.profilePic,
        });
        setSelectedChatId(userDetails._id);

        if (socketConnection) {
          socketConnection.emit("message-page", userDetails._id);
          socketConnection.emit("seen", userDetails._id);
        }
      }
    }
  }, [userId, conversations, socketConnection, onlineUserSet]);

  // Effect to clear selection when navigating to /messages
  useEffect(() => {
    if (location.pathname === "/messages" && selectedUser) {
      setSelectedUser(null);
      setSelectedChatId(null);
    }
  }, [location.pathname]);

  // Effect to handle route changes
  useEffect(() => {
    if (!userId) {
      setSelectedUser(null);
      setSelectedChatId(null);
    }
  }, [userId]);

  // Update seen status when messages are viewed (seen update)
  useEffect(() => {
    if (socketConnection && selectedUser) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const messageId = entry.target.dataset.messageId;
              if (messageId && !seenMessages.has(messageId)) {
                socketConnection.emit("seen", selectedUser._id);
                setSeenMessages((prev) => new Set(prev).add(messageId));
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      document.querySelectorAll("[data-message-id]").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [socketConnection, selectedUser, allMessage]);

  useEffect(() => {
    if (socketConnection && selectedUser) {
      // Listen for new messages
      socketConnection.on("message", (messages) => {
        setAllMessage(messages);

        // If we're the receiver and in the conversation, mark messages as seen
        const unseenMessages = messages.filter(
          (msg) =>
            !msg.seen &&
            msg.msgByUserId === selectedUser._id &&
            msg.msgByUserId !== user._id
        );

        if (unseenMessages.length > 0) {
          unseenMessages.forEach((msg) => {
            socketConnection.emit("mark-seen", {
              messageId: msg._id,
              receiverId: selectedUser._id,
              seenAt: new Date(),
            });
          });
        }
        // Check if user was already at bottom before new message
        if (chatContainerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } =
            chatContainerRef.current;
          const wasAtBottom = scrollHeight - scrollTop - clientHeight < 100;

          // Only scroll to bottom if user was already at bottom
          if (wasAtBottom) {
            setTimeout(() => {
              chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
            }, 100);
          }
        }
      });

      // Listen for message seen updates
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
  }, [socketConnection, selectedUser, user._id]);

  const handleMessageSeen = useCallback(
    (messageId) => {
      if (socketConnection && selectedUser) {
        socketConnection.emit("mark-seen", {
          messageId,
          receiverId: selectedUser._id,
          seenAt: new Date(),
        });
      }
    },
    [socketConnection, selectedUser]
  );

  const handleMessageInput = (e) => {
    const newText = e.target.value;
    setMessage((prev) => ({ ...prev, text: newText }));

    // Only emit typing events when text is being entered
    if (selectedUser?._id) {
      if (newText.length > 0 && !isTyping) {
        socketConnection.emit("typing", { recipientId: selectedUser._id });
        setIsTyping(true);
      } else if (newText.length === 0 && isTyping) {
        socketConnection.emit("stop-typing", { recipientId: selectedUser._id });
        setIsTyping(false);
      }
    }
  };

  useEffect(() => {
    let typingTimer;
    if (isTyping) {
      typingTimer = setTimeout(() => {
        if (socketConnection && selectedUser?._id) {
          socketConnection.emit("stop-typing", {
            recipientId: selectedUser._id,
          });
          setIsTyping(false);
        }
      }, 3000); // Stop typing after 3 seconds of no input
    }
    return () => clearTimeout(typingTimer);
  }, [isTyping, socketConnection, selectedUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    setUnreadMessages(0);

    if (
      !message.text &&
      !message.imageUrl &&
      !message.videoUrl &&
      !message.pdfUrl &&
      !message.audioUrl
    ) {
      return;
    }

    if (socketConnection && selectedUser) {
      const newMessage = {
        sender: user._id,
        receiver: selectedUser._id,
        text: message.text,
        imageUrl: message.imageUrl,
        videoUrl: message.videoUrl,
        pdfUrl: message.pdfUrl,
        fileName: "defff",
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

      // Always scroll to bottom when sending a message
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

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/user-details`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        dispatch({
          type: "SET_USERS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle typing events
  useEffect(() => {
    if (socketConnection && selectedUser) {
      const handleUserTyping = ({ userId }) => {
        setTypingUsers((prev) => new Set(prev).add(userId));
      };

      const handleUserStopTyping = ({ userId }) => {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      };

      socketConnection.on("user-typing", handleUserTyping);
      socketConnection.on("user-stop-typing", handleUserStopTyping);

      return () => {
        socketConnection.off("user-typing", handleUserTyping);
        socketConnection.off("user-stop-typing", handleUserStopTyping);
      };
    }
  }, [socketConnection, selectedUser]);

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
              setSelectedUser(null);
            }}
          >
            Chats{" "}
            {conversations.filter((conv) => conv.temp === true).length > 0 &&
              `(${conversations.filter((conv) => conv.temp === true).length})`}
          </button>
          <button
            className={`nav-tab ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("jobs");
              setSelectedUser(null);
            }}
          >
            Jobs{" "}
            {conversations.filter((conv) => conv.temp === false).length > 0 &&
              `(${conversations.filter((conv) => conv.temp === false).length})`}
          </button>
        </div>
      </nav>

      <div className="main-content">
        <div
          className={`conversation-list ${selectedUser ? "hidden-mobile" : ""}`}
        >
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
                const hasUnreadMessages =
                  !selectedUser || selectedUser._id !== conv.userDetails._id
                    ? conv.unseenMsg
                    : 0;
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
                      selectedUser?._id === conv.userDetails._id
                        ? "selected"
                        : ""
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

        <div className={`chat-area ${!selectedUser ? "hidden-mobile" : ""}`}>
          {selectedUser ? (
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
                    imageUrl={selectedUser.profilePic}
                    name={selectedUser.name}
                    userId={selectedUser._id}
                  />
                  <div className="chat-header-info">
                    <span className="chat-header-name">
                      {selectedUser.name}
                    </span>
                    <p className="chat-header-status">
                      {typingUsers.has(selectedUser?._id) ? (
                        <span className="typing-status">typing...</span>
                      ) : selectedUser.online ? (
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
                              selectedUser={selectedUser}
                              key={index}
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
                  {typingUsers.has(selectedUser?._id) && (
                    <div className="typing-indicator-container">
                      <Avatar
                        width={32}
                        height={32}
                        imageUrl={selectedUser.profilePic}
                        name={selectedUser.name}
                        userId={selectedUser._id}
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
                    onImageUpload={handleUploadImage}
                    onVideoUpload={handleUploadVideo}
                    onPdfUpload={handleUploadPdf}
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
                  if (socketConnection && selectedUser) {
                    socketConnection.emit("seen", selectedUser._id);
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
