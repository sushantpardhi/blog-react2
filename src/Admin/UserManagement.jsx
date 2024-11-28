import React, { useState, useRef, useEffect } from "react";
import "./UserManagement.css";

// Constants
const ROLES = ["Admin", "Moderator", "User"];
const STATUSES = ["active", "deactivated", "locked"];
const FIRST_NAMES = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Charles",
  "Karen",
  "Emma",
  "Oliver",
  "Noah",
  "Sophia",
  "Liam",
  "Ava",
  "Ethan",
  "Isabella",
  "Mason",
  "Mia",
];
const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Thompson",
  "White",
  "Harris",
  "Clark",
  "Lewis",
  "Robinson",
  "Walker",
  "Hall",
  "Young",
];

// Utility Functions
const generateRandomName = (FIRST_NAMES, LAST_NAMES) => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
};

const generateUsers = () => {
  return Array.from({ length: 120 }, (_, i) => {
    const name = generateRandomName(FIRST_NAMES, LAST_NAMES);
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`;
    return {
      name,
      email,
      roles: ROLES[Math.floor(Math.random() * ROLES.length)],
      blogCount: Math.floor(Math.random() * 30),
      lastLogin: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toLocaleString(),
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    };
  });
};

// Helper Components
const StatusIndicator = ({ status }) => (
  <div className="status-wrapper">
    <span
      className={`status-indicator ${status}`}
      title={status.charAt(0).toUpperCase() + status.slice(1)}
    ></span>
  </div>
);

// Add UserDetailsModal component
const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h3>User Details</h3>
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

// Add EditUserModal component
const EditUserModal = ({ user, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        ×
      </button>
      <h3>Edit User</h3>
      <form className="edit-user-form">
        <div className="form-row">
          <label>Name:</label>
          <input type="text" defaultValue={user.name} />
        </div>
        <div className="form-row">
          <label>Email:</label>
          <input type="email" defaultValue={user.email} />
        </div>
        <div className="form-row">
          <label>Role:</label>
          <select defaultValue={user.roles}>
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

// Add ConfirmationModal component
const ConfirmationModal = ({ title, message, onConfirm, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div
      className="modal-content confirmation-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="modal-close" onClick={onClose}>
        ×
      </button>
      <h3>{title}</h3>
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

// Update ActionMenu component to include user data and modal handling
const ActionMenu = ({ userId, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const dropdownRef = useRef(null);

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

  const handleConfirmAction = (action) => {
    console.log(`Confirmed ${action} for user ${userId}`);
    // Add actual action handling logic here
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside); // Use 'click' event
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="action-menu" ref={dropdownRef}>
      <button
        className="action-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Actions"
      >
        ⋮
      </button>
      {isOpen && (
        <ul className="action-menu-dropdown">
          <li onClick={() => handleAction("view")}>View Details</li>
          <li onClick={() => handleAction("edit")}>Edit User</li>
          {statusActions.map(({ action, title }) => (
            <li key={action} onClick={() => handleAction(action)}>
              {title.split(" ")[0]}
            </li>
          ))}
          <li onClick={() => handleAction("delete")}>Delete</li>
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

      {statusActions.map(
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

// Main Component
const UserManagement = () => {
  // Add search state
  const [searchTerm, setSearchTerm] = useState("");

  // State
  const [users] = useState(generateUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPageOptions = [5, 10, 20, 50];
  // Remove unused state
  // const [activeDropdown, setActiveDropdown] = useState(null);
  // const dropdownRef = useRef(null);

  // Add search filter logic
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.roles.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Derived State
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Page Navigation Functions
  const getVisiblePages = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
      }
    }
    return pages;
  };

  // Event Handlers
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleItemsPerPageSelect = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  // Effects
  // Remove unused useEffect
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setActiveDropdown(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // Render
  return (
    <div className="dashboard-content">
      {/* Header */}
      <div className="header-section">
        <h2>User Management</h2>
      </div>

      {/* Controls */}
      <div className="table-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm("")}>
              ×
            </button>
          )}
        </div>

        {/* Custom Dropdown */}
        <div className="custom-dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {itemsPerPage} per page ▼
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {itemsPerPageOptions.map((option) => (
                <li key={option}>
                  <button onClick={() => handleItemsPerPageSelect(option)}>
                    {option} per page
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>No. of Blogs</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <StatusIndicator status={user.status} />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>
                <td>{user.blogCount}</td>
                <td>{user.lastLogin}</td>
                <td>
                  <ActionMenu userId={index} userData={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        {currentPage > 3 && totalPages > 5 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="pagination-btn"
            >
              1
            </button>
            <span className="pagination-dots">...</span>
          </>
        )}
        {getVisiblePages().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`pagination-btn ${
              currentPage === pageNum ? "active" : ""
            }`}
          >
            {pageNum}
          </button>
        ))}
        {currentPage < totalPages - 2 && totalPages > 5 && (
          <>
            <span className="pagination-dots">...</span>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="pagination-btn"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>

      <div className="items-summary">
        Showing {indexOfFirstItem + 1} to{" "}
        {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
      </div>
    </div>
  );
};

export default UserManagement;
