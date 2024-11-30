import React, { useState, useEffect, useRef } from "react";
import StatusIndicator from "./components/StatusIndicator";
import ActionMenu from "./components/ActionMenu";
import { generateUsers } from "./utils/userUtils";
import "./styles/UserManagement.css";
import { ROLES, STATUSES } from "./constants/userConstants";

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

  // Add new state for sorting and filtering
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterConfig, setFilterConfig] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Update column configuration to use constants
  const columnConfig = {
    status: { type: "filter", options: STATUSES },
    roles: { type: "filter", options: ROLES },
    name: { type: "sort" },
    email: { type: "sort" },
    blogCount: { type: "sort" },
    lastLogin: { type: "sort" },
  };

  // Add state for dropdown position
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

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

  // Sort function
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Filter function
  const filterData = (data) => {
    return data.filter((item) => {
      return Object.entries(filterConfig).every(([key, value]) => {
        if (!value) return true;
        return item[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  };

  // Process data with filters and sorting
  const processData = () => {
    let processed = [...users];

    // Apply search filter
    if (searchTerm) {
      processed = processed.filter((user) => {
        const searchLower = searchTerm.toLowerCase().trim();
        return (
          user.name?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower) ||
          user.roles?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply column filters
    processed = filterData(processed);

    // Apply sorting
    if (sortConfig.key) {
      processed = sortData(processed, sortConfig.key, sortConfig.direction);
    }

    return processed;
  };

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
    setActiveDropdown(null);
  };

  const handleFilter = (key, value) => {
    setFilterConfig((current) => ({
      ...current,
      [key]: value,
    }));
  };

  // Update filteredUsers calculation
  const filteredUsers = processData();

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

  // Add clearAllFilters function
  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterConfig({});
    setSortConfig({ key: null, direction: "asc" });
    setActiveDropdown(null);
  };

  // Add hasActiveFilters derived state
  const hasActiveFilters = Boolean(
    searchTerm || Object.keys(filterConfig).length > 0 || sortConfig.key
  );

  // Modified TableHeader component
  const TableHeader = ({ label, field }) => {
    const isDropdownOpen = activeDropdown === field;
    const config = columnConfig[field];

    const handleToggleDropdown = (e) => {
      if (isDropdownOpen) {
        setActiveDropdown(null);
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
        });
        setActiveDropdown(field);
      }
    };

    return (
      <th className="table-header">
        <div
          className={`header-content ${
            sortConfig.key === field ? "active-sort" : ""
          } ${
            sortConfig.key === field && sortConfig.direction === "desc"
              ? "desc"
              : ""
          }`}
        >
          <span>{label}</span>
          {config && (
            <button
              className="header-dropdown-toggle"
              onClick={handleToggleDropdown}
            >
              ⋮
            </button>
          )}
          {isDropdownOpen && config && (
            <div
              className="header-dropdown"
              style={{
                position: "fixed",
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
              }}
            >
              {config.type === "sort" && (
                <div className="dropdown-section">
                  <div className="dropdown-title">Sort</div>
                  <button onClick={() => handleSort(field)}>
                    {sortConfig.key === field && sortConfig.direction === "asc"
                      ? "↑ Ascending"
                      : "↓ Descending"}
                  </button>
                </div>
              )}
              {config.type === "filter" && (
                <div className="dropdown-section">
                  <div className="dropdown-title">Filter</div>
                  {config.options.map((option) => (
                    <button
                      key={option}
                      className={`filter-option ${
                        filterConfig[field] === option ? "active" : ""
                      }`}
                      onClick={() =>
                        handleFilter(
                          field,
                          filterConfig[field] === option ? "" : option
                        )
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </th>
    );
  };

  // Render
  return (
    <div className="dashboard-content">
      {/* Header */}
      <div className="header-section">
        <h2 className="section-heading">User Management</h2>
      </div>

      {/* Controls */}
      <div className="table-controls">
        <div className="controls-left">
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => setSearchTerm("")}
              >
                ×
              </button>
            )}
          </div>
          {hasActiveFilters && (
            <button
              className="clear-filters-btn"
              onClick={clearAllFilters}
              title="Clear all filters and sorting"
            >
              Clear all filters
            </button>
          )}
        </div>
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
              <TableHeader label="Status" field="status" />
              <TableHeader label="Name" field="name" />
              <TableHeader label="Email" field="email" />
              <TableHeader label="Roles" field="roles" />
              <TableHeader label="No. of Blogs" field="blogCount" />
              <TableHeader label="Last Login" field="lastLogin" />
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
