import React from 'react';
import StatusIndicator from '../StatusIndicator';

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h3 className="modal-title">User Details</h3>
        <div className="user-details">
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Role:</span>
            <span className="detail-value">{user.roles}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="detail-value">
              <StatusIndicator status={user.status} />
              {user.status}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Blog Count:</span>
            <span className="detail-value">{user.blogCount}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Last Login:</span>
            <span className="detail-value">{user.lastLogin}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;