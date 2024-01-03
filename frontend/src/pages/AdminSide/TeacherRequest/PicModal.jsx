// PicModal component
import React from 'react';
import './PicModal.css';

const PicModal = ({ image, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <img src={`http://127.0.0.1:8000${image}`} alt="ID Proof" />
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default PicModal;
