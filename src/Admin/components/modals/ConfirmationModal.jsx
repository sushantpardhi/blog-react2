import React from 'react';

const ConfirmationModal = ({ title, message, onConfirm, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div
      className="modal-content confirmation-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="modal-close" onClick={onClose}>
        ×
      </button>
      <h3 className="modal-title">{title}</h3>
      <p>{message}</p>
      <div className="modal-actions">
        <button className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn-danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;