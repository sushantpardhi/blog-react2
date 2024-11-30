import React, { useState, useRef, useEffect } from "react";
import UserDetailsModal from "./modals/UserDetailsModal";
import EditUserModal from "./modals/EditUserModal";
import ConfirmationModal from "./modals/ConfirmationModal";
import LockUserModal from "./modals/LockUserModal";

const ActionMenu = ({ userId, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const getStatusActions = (status) => {
    switch (status) {
      case "locked":
        return [
          {
            action: "unlock",
            title: "Unlock Account",
            message: `Are you sure you want to unlock ${userData.name}'s account?`,
          },
          {
            action: "deactivate",
            title: "Deactivate Account",
            message: `Are you sure you want to deactivate ${userData.name}'s account?`,
          },
        ];
      case "deactivated":
        return [
          {
            action: "activate",
            title: "Activate Account",
            message: `Are you sure you want to activate ${userData.name}'s account?`,
          },
          {
            action: "lock",
            title: "Lock Account",
            message: `Are you sure you want to lock ${userData.name}'s account?`,
          },
        ];
      case "active":
        return [
          {
            action: "deactivate",
            title: "Deactivate Account",
            message: `Are you sure you want to deactivate ${userData.name}'s account?`,
          },
          {
            action: "lock",
            title: "Lock Account",
            message: `Are you sure you want to lock ${userData.name}'s account?`,
          },
        ];
      default:
        return [];
    }
  };

  const statusActions = getStatusActions(userData.status);

  const handleAction = (action) => {
    setIsOpen(false);
    setActiveModal(action);
  };

  const handleConfirmAction = (action, additionalData = {}) => {
    console.log(`Confirmed ${action} for user ${userId}`, additionalData);
    // Add actual action handling logic here
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: `${rect.bottom + 8}px`,
        left: `${rect.left - 180 + rect.width}px`, // Align right side with button
      });
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      updateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isOpen]);

  return (
    <div className="action-menu">
      <button
        ref={buttonRef}
        className="action-menu-button"
        onClick={toggleMenu}
        aria-label="Actions"
      >
        ⋮
      </button>
      {isOpen && (
        <ul 
          ref={menuRef} 
          className="action-menu-dropdown"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          <li className="detail-list-item">
            <button
              className="dropdown-button"
              onClick={() => handleAction("view")}
              data-action="view"
            >
              View Details
            </button>
          </li>
          <li className="detail-list-item">
            <button
              className="dropdown-button"
              onClick={() => handleAction("edit")}
              data-action="edit"
            >
              Edit User
            </button>
          </li>
          {statusActions.map(({ action, title }) => (
            <li key={action} className="detail-list-item">
              <button
                className="dropdown-button"
                onClick={() => handleAction(action)}
                data-action={action}
              >
                {title.split(" ")[0]}
              </button>
            </li>
          ))}
          <li className="detail-list-item">
            <button
              className="dropdown-button danger"
              onClick={() => handleAction("delete")}
              data-action="delete"
            >
              Delete
            </button>
          </li>
        </ul>
      )}
      {activeModal === "view" && (
        <UserDetailsModal
          user={userData}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "edit" && (
        <EditUserModal user={userData} onClose={() => setActiveModal(null)} />
      )}

      {activeModal === "lock" ? (
        <LockUserModal
          user={userData}
          onConfirm={(data) => handleConfirmAction("lock", data)}
          onClose={() => setActiveModal(null)}
        />
      ) : (
        statusActions.map(
          ({ action, title, message }) =>
            activeModal === action && (
              <ConfirmationModal
                key={action}
                title={title}
                message={message}
                onConfirm={() => handleConfirmAction(action)}
                onClose={() => setActiveModal(null)}
              />
            )
        )
      )}

      {activeModal === "delete" && (
        <ConfirmationModal
          title="Delete User"
          message={`Are you sure you want to delete ${userData.name}? This action cannot be undone.`}
          onConfirm={() => handleConfirmAction("delete")}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};

export default ActionMenu;
