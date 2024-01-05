import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, additionalInfo }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={onClose}>
              &times;
            </span>
            <div>{additionalInfo}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;