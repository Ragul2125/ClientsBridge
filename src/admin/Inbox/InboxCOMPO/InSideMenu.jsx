import "../Inbox.css";
import { LuMail } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchAllConversations } from "../../api/conversationapi";

export default function InboxSideMenu() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ conversations: [] });
  const [deletedMessageCount, setDeletedMessageCount] = useState(0);

  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchedData = await fetchAllConversations(); // Replace with actual API call
        setData(fetchedData);

        // Calculate deleted message count if applicable
        const deletedMessages = fetchedData.conversations.filter(
          (c) => c.isDeleted
        );
        setDeletedMessageCount(deletedMessages.length);
      } catch (error) {
        console.error("Error loading conversations:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const messageCount = data.conversations.length;
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <section className="inboxsidemenumain">
      <article className="inboxsidemenuinner">
        <p className="messagetxt">Messages</p>
        <Link
          to="/admin/inbox"
          className="messageopt inmessages"
          style={{
            backgroundColor:
              currentPath.startsWith("/inbox") &&
              !currentPath.startsWith("/inbox/bin")
                ? "#487fff27"
                : "transparent",
            color:
              currentPath.startsWith("/inbox") &&
              !currentPath.startsWith("/inbox/bin")
                ? "#4880ff"
                : "black",
          }}
        >
          <LuMail /> Messages
          <span className="count">{messageCount}</span>
        </Link>
      </article>
      <article className="inboxsidemenuinnermob">
        <p className="composebtn">+</p>
        <Link
          to="/admin/inbox"
          className="messageopt inmessages"
          style={{
            backgroundColor:
              currentPath.startsWith("/inbox") &&
              !currentPath.startsWith("/inbox/bin")
                ? "#487fff27"
                : "transparent",
            color:
              currentPath.startsWith("/inbox") &&
              !currentPath.startsWith("/inbox/bin")
                ? "#4880ff"
                : "black",
          }}
        >
          <LuMail />
        </Link>
        <Link
          to="/inbox/bin"
          className="messageopt inbin"
          style={{
            backgroundColor:
              currentPath === "/inbox/bin" ? "#487fff27" : "transparent",
            color: currentPath === "/inbox/bin" ? "#4880ff" : "black",
          }}
        >
          <RiDeleteBinLine />
        </Link>
      </article>
    </section>
  );
}
