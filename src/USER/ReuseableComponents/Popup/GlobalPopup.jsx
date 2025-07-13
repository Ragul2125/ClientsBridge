import React from "react";
import "./GlobalPopup.css";

const GlobalPopup = ({
  text = "Are you sure?",
  buttons = [],
  className = "",
}) => {
  return (
    <div className={`global-popup-overlay ${className}`}>
      <div className="global-popup-container">
        <p className="global-popup-text">{text}</p>
        <div className="global-popup-buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`global-popup-button ${button.className || ""}`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalPopup;
