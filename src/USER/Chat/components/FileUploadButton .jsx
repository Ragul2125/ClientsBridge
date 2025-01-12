import React, { useState } from "react";
import { FaPlus, FaImage, FaVideo } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import "./FileUploadButton.css";
import uploadFile from "../../ReuseableComponents/helpers/uploadFile";

const FileUploadButton = ({ onImageUpload, onVideoUpload, onPdfUpload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFileUpload, setOpenFileUpload] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="file-upload-container">
      <motion.button
        onClick={toggleOpen}
        className="file-upload-button"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <FaPlus />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="file-upload-options"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <label className="file-upload-option">
              <FaImage className="file-upload-icon image" />
              <span>Image</span>
              <input
                type="file"
                className="hidden-input"
                onChange={onImageUpload}
                accept="image/*"
              />
            </label>
            <label className="file-upload-option">
              <FaVideo className="file-upload-icon video" />
              <span>Video</span>
              <input
                type="file"
                className="hidden-input"
                onChange={onVideoUpload}
                accept="video/*"
              />
            </label>
            <label className="file-upload-option">
              <IoDocumentAttach className="file-upload-icon document" />
              <span>PDF</span>
              <input
                type="file"
                className="hidden-input"
                onChange={onPdfUpload}
                accept=".pdf,.doc,.docx,.txt,.odt"
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploadButton;
