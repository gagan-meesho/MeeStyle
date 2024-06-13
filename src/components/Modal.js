import React from 'react';

const Modal = ({ image, onClose }) => {
  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
          <img src={image} alt="Selected" />
        </div>
      </div>
  );
};

export default Modal;
