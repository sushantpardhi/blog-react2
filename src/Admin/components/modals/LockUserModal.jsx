import React, { useState } from 'react';

const LockUserModal = ({ user, onConfirm, onClose }) => {
  const [lockDate, setLockDate] = useState('');
  const [lockTime, setLockTime] = useState('');
  
  const handleSubmit = () => {
    const lockUntil = `${lockDate}T${lockTime}`;
    onConfirm({ userId: user.id, lockUntil });
    onClose();
  };

  const minDate = new Date().toISOString().split('T')[0];
  const minTime = new Date().toTimeString().slice(0, 5);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirmation-modal lock-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h3 className="modal-title">Lock Account</h3>
        <p>Set the duration for which {user.name}'s account will be locked.</p>
        <div className="datetime-inputs">
          <div className="form-row">
            <label>Lock Date:</label>
            <div className="date-input-wrapper">
              <input
                className="date-input"
                type="date"
                min={minDate}
                value={lockDate}
                onChange={(e) => setLockDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <label>Lock Time:</label>
            <div className="time-input-wrapper">
              <input
                className="time-input"
                type="time"
                min={lockDate === minDate ? minTime : undefined}
                value={lockTime}
                onChange={(e) => setLockTime(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button 
            className="btn-danger" 
            onClick={handleSubmit}
            disabled={!lockDate || !lockTime}
          >
            Lock Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LockUserModal;