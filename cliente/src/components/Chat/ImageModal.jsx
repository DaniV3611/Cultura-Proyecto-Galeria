import React from 'react';
import Modal from 'react-modal';

const ImageModal = ({ isOpen, onRequestClose, imgSrc }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={{
      content: {
        maxHeight: '80%',
        maxWidth: '80%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: 'none',
        background: 'none',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      },
    }}
  >
    <img src={imgSrc} style={{ width: '100%', height: 'auto' }} alt="Full Screen" />
  </Modal>
);

export default ImageModal;
