// TagsInput Component
import { useState } from "react";

const TagsInput = ({ onTagsChange, placeholder, initialTags }) => {
  const [tags, setTags] = useState(initialTags || []);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        onTagsChange(newTags);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onTagsChange(newTags);
  };

  return (
    <div className="tags-input-container">
      <div className="tags">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <span className="remove-tag" onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder={placeholder || "Type and press Enter to add"}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="tags-input"
      />
    </div>
  );
};

export default TagsInput;
