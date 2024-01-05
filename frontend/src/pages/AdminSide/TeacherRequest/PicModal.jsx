// PicModal component
import React from 'react';
import './PicModal.css';
import { Image_URL } from '../../../constants/constans';

const PicModal = ({ image, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <img src={`${Image_URL}${image}`} alt="ID Proof" />
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default PicModal;
