import React, { useState, useEffect, useRef } from "react";
import StatusIndicator from "./components/StatusIndicator";
import ActionMenu from "./components/ActionMenu";
import { generateUsers } from "./utils/userUtils";
import "./styles/UserManagement.css";

const UserManagement = () => {
  const dropdownRef = useRef(null);
  // Add search state
  const [searchTerm, setSearchTerm] = useState("");

  // State
  const [users] = useState(() =>
    generateUsers().map((user, index) => ({
      ...user,
      id: index,
    }))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPageOptions = [5, 10, 20, 50];

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = users.filter((user) => {
    if (!user) return false;
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase().trim();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.roles?.toLowerCase().includes(searchLower)
    );
  });

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
    const newItemsPerPage = Number(value);
    const newTotalPages = Math.ceil(totalItems / newItemsPerPage);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(Math.min(currentPage, newTotalPages));
    setIsDropdownOpen(false);
  };

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
            className="search-input"
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
        <div className="custom-dropdown" ref={dropdownRef}>
          <button
            className="dropdown-toggle"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {itemsPerPage} items
          </button>
          {isDropdownOpen && (
            <div className="items-dropdown-menu">
              {itemsPerPageOptions.map((option) => (
                <button
                  key={option}
                  className={`items-dropdown-button ${
                    itemsPerPage === option ? "active" : ""
                  }`}
                  onClick={() => handleItemsPerPageSelect(option)}
                >
                  {option} items
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th className="table-header">Status</th>
              <th className="table-header">Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Roles</th>
              <th className="table-header">No. of Blogs</th>
              <th className="table-header">Last Login</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="table-cell">
                  <StatusIndicator status={user.status} />
                </td>
                <td className="table-cell">{user.name}</td>
                <td className="table-cell">{user.email}</td>
                <td className="table-cell">{user.roles}</td>
                <td className="table-cell">{user.blogCount}</td>
                <td className="table-cell">{user.lastLogin}</td>
                <td className="table-cell">
                  <ActionMenu userId={user.id} userData={user} />
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="7" className="table-cell no-results">
                  No users found
                </td>
              </tr>
            )}
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
