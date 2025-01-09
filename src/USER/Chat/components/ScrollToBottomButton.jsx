import React, { useState, useEffect } from "react";
import { IoArrowDown } from "react-icons/io5";
import "./ScrollToBottomButton.css";

const ScrollToBottomButton = ({ 
  containerRef, 
  messages = [], 
  currentUserId, 
  onScrollToBottom 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setIsVisible(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  useEffect(() => {
    if (messages.length > 0) {
      const unseenMessages = messages.filter(
        (msg) => !msg.seen && msg.msgByUserId !== currentUserId
      ).length;

      if (isVisible) {
        setUnseenCount((prev) => prev + unseenMessages);
      }
    }
  }, [messages, currentUserId, isVisible]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
      setUnseenCount(0);
      if (onScrollToBottom) {
        onScrollToBottom();
      }
    }
  };

  if (!isVisible && unseenCount === 0) return null;

  return (
    <button
      onClick={scrollToBottom}
      className="scroll-to-bottom-button"
    >
      <IoArrowDown className="scroll-icon" />
      {unseenCount > 0 && (
        <span className="unseen-count">{unseenCount}</span>
      )}
    </button>
  );
};

export default ScrollToBottomButton;
