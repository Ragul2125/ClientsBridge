import React, { useState, useEffect } from "react";
import { fetchAllConversations } from "../../api/conversationapi.js"; // Update the path if needed
import { IoSearch } from "react-icons/io5";
import { MdMoveToInbox, MdInfo, MdDelete } from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa";
import { TbRestore } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import "../Inbox.css";
import Load from '../../../USER/ReuseableComponents/Loaders/Load.jsx'
export default function InboxAllChat() {
  const [favoriteChats, setFavoriteChats] = useState([]);
  const [selectedChats, setSelectedChats] = useState([]);
  const [deletedChats, setDeletedChats] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [searchChats, setSearchChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchAllConversations();
        setChatData(data.conversations);
        setSearchChats(data.conversations);
      } catch (error) {
        console.error("Error loading conversations:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const addfavchats = (id) => {
    setFavoriteChats((prev) =>
      prev.includes(id) ? prev.filter((chatId) => chatId !== id) : [...prev, id]
    );
  };

  const addselectedchats = (id) => {
    setSelectedChats((prev) =>
      prev.includes(id) ? prev.filter((chatId) => chatId !== id) : [...prev, id]
    );
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredChats = chatData.filter((chat) => {
      const nameMatch = chat.participants.receiver.name
        .toLowerCase()
        .includes(searchTerm);
      const lastMessageMatch =
        chat.lastMessage?.text?.toLowerCase().includes(searchTerm) || "";

      return nameMatch || lastMessageMatch;
    });

    setSearchChats(filteredChats);
  };

  const handleDelete = () => {
    if (currentPath.includes("bin")) {
      const restoredChats = selectedChats.map((id) => {
        const chat = deletedChats.find((chat) => chat.conversationId === id);
        return chat;
      });
      setChatData((prev) => [...prev, ...restoredChats]);
      setDeletedChats((prev) =>
        prev.filter((chat) => !selectedChats.includes(chat.conversationId))
      );
    } else {
      const updatedChats = chatData.filter(
        (chat) => !selectedChats.includes(chat.conversationId)
      );
      const deleted = chatData.filter((chat) =>
        selectedChats.includes(chat.conversationId)
      );
      setDeletedChats((prev) => [...prev, ...deleted]);
      setChatData(updatedChats);
    }
    setSelectedChats([]);
  };

  if (isLoading) {
    return <Load type='load'/>
  }

  if (error) {
    return <Load type='err' />
  }

  return (
    <section className="inboxallchatmain">
      <article className="inboxallchatinner">
        <header className="inboxallchattop">
          <div className="allchatsearchcon">
            <IoSearch />
            <input
              type="search"
              className="allchatsearch"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
          <div className="allchatoptionscon">
            <div className="allchatopt">
              <MdMoveToInbox />
            </div>
            <div className="allchatopt">
              <MdInfo />
            </div>
            {currentPath.includes("bin") ? (
              <div className="allchatopt" onClick={handleDelete}>
                <TbRestore />
              </div>
            ) : (
              <div className="allchatopt" onClick={handleDelete}>
                <MdDelete />
              </div>
            )}
          </div>
        </header>
        <div className="allchatbody">
          {searchChats.map((chat) => (
            <div className="chatcon" key={chat.conversationId}>
              {/* <input
                type="checkbox"
                className="chatselect"
                checked={selectedChats.includes(chat.conversationId)}
                onChange={() => addselectedchats(chat.conversationId)}
              />
              <span className="chatfavcon">
                <span
                  className="befstaricon"
                  style={{
                    display: favoriteChats.includes(chat.conversationId)
                      ? "none"
                      : "block",
                  }}
                >
                  <FaRegStar />
                </span>
                <span
                  className="aftrstaricon"
                  style={{
                    display: favoriteChats.includes(chat.conversationId)
                      ? "block"
                      : "none",
                  }}
                >
                  <FaStar />
                </span>
                <input
                  type="checkbox"
                  className="chatfav"
                  checked={favoriteChats.includes(chat.conversationId)}
                  onChange={() => addfavchats(chat.conversationId)}
                />
              </span> */}
              <img
                className="chatProImg"
                src={chat.participants.sender.profilePic}
              />
              <img
                className="chatProImg"
                src={chat.participants.receiver.profilePic}
              />
              <Link to={`chat/${chat.conversationId}`} className="chatlinkcon">
                <p className="chatname">
                  {chat.participants.sender.userName} ||{" "}
                  {chat.participants.receiver.userName}
                </p>
                <p className="chathighlight">
                  {chat.lastMessage?.text || "No messages yet"}
                </p>
                <p className="chattime">
                  {new Date(chat.updatedAt).toLocaleString()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
