import React from "react";
import { ROLES } from "../../constants/userConstants";

const EditUserModal = ({ user, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        ×
      </button>
      <h3 className="modal-title">Edit User</h3>
      <form className="edit-user-form">
        <div className="form-row">
          <label>Name:</label>
          <input className="form-input" type="text" defaultValue={user.name} />
        </div>
        <div className="form-row">
          <label>Email:</label>
          <input className="form-input" type="email" defaultValue={user.email} />
        </div>
        <div className="form-row">
          <label>Role:</label>
          <select className="form-select" defaultValue={user.roles}>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default EditUserModal;
