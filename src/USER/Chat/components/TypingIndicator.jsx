import "./TypingIndicator.css";

const TypingIndicator = () => {
    return (
      <div className="typing-indicator">
        <div className="dots">
          <span className="dot" style={{ animationDelay: "0s" }}></span>
          <span className="dot" style={{ animationDelay: "0.2s" }}></span>
          <span className="dot" style={{ animationDelay: "0.4s" }}></span>
        </div>
        <span className="typing-text">Typing...</span>
      </div>
    );
  };

  
export default TypingIndicator;