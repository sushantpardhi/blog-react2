
import React from 'react';

const StatusIndicator = ({ status }) => (
  <div className="status-wrapper">
    <span
      className={`status-indicator ${status}`}
      title={status.charAt(0).toUpperCase() + status.slice(1)}
    ></span>
  </div>
);

export default StatusIndicator;