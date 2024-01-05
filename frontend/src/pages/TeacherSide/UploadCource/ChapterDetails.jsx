import React, { useState } from 'react';
import Modal from 'react-modal';
import { Image_URL } from '../../../constants/constans';

const ChapterDetails = ({ chapter, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const closeModal = () => {
    setModalIsOpen(false);
    onClose();
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Chapter Details Modal"
      >
        {chapter && (
          <div className="flex justify-center pb-10 items-center flex-col pt-10">
            <h1 className="text-2xl font-semibold text-gray-500 pb-5">
              {chapter.chapter}
            </h1>
            <video width="720" height="480" controls>
              <source src={`${Image_URL}${chapter.videos}`} type="video/mp4" />
              <h1>Your browser does not support the video tag.</h1>
            </video>
            <div className="pt-5 w-2/3">
              <span className="font-bold text-lg pt-3">Description: </span>
              <div className="text-justify pt-3">
                {chapter.description}
              </div>
            </div>
            <button className='bg-cyan-600 p-3 rounded-lg' onClick={closeModal}>Close Modal</button>
          </div>
        )}
      </Modal>
    </>
  )
}

export default ChapterDetails
