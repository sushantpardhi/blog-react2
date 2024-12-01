import React, { useState, useRef, useEffect } from "react";
import StatusIndicator from "./components/StatusIndicator";
import ActionMenu from "./components/ActionMenu";

const BlogManagement = () => {
  // Add refs
  const dropdownRef = useRef(null);

  // Add states
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPageOptions = [5, 10, 20, 50];
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Add sorting and filtering states
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterConfig, setFilterConfig] = useState({});

  // Add column configuration
  const columnConfig = {
    status: { type: "filter", options: ["Active", "Inactive", "Pending"] },
    title: { type: "sort" },
    author: { type: "sort" },
    category: { type: "filter", options: ["Tech", "Lifestyle", "Business"] },
    publishDate: { type: "sort" },
  };

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

  // Add handlers
  const handleItemsPerPageSelect = (value) => {
    const newItemsPerPage = Number(value);
    setItemsPerPage(newItemsPerPage);
    setIsDropdownOpen(false);
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

  // Add clearAllFilters function
  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterConfig({});
    setSortConfig({ key: null, direction: "asc" });
  };

  // Add hasActiveFilters derived state
  const hasActiveFilters = Boolean(
    searchTerm || Object.keys(filterConfig).length > 0 || sortConfig.key
  );

  // Add blogs data state
  const [blogs] = useState(() =>
    Array.from({ length: 50 }, (_, index) => ({
      id: index,
      status: ["Active", "Inactive", "Pending"][Math.floor(Math.random() * 3)],
      name: `Blog ${index + 1}`,
      email: `author${index + 1}@example.com`,
      roles: ["Writer", "Editor"][Math.floor(Math.random() * 2)],
      blogCount: Math.floor(Math.random() * 20),
      lastLogin: new Date(
        Date.now() - Math.random() * 10000000000
      ).toLocaleDateString(),
    }))
  );

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Add data processing functions
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filterData = (data) => {
    return data.filter((item) => {
      return Object.entries(filterConfig).every(([key, value]) => {
        if (!value) return true;
        return item[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  };

  const processData = () => {
    let processed = [...blogs];

    if (searchTerm) {
      processed = processed.filter((blog) => {
        const searchLower = searchTerm.toLowerCase().trim();
        return (
          blog.name?.toLowerCase().includes(searchLower) ||
          blog.email?.toLowerCase().includes(searchLower) ||
          blog.roles?.toLowerCase().includes(searchLower)
        );
      });
    }

    processed = filterData(processed);

    if (sortConfig.key) {
      processed = sortData(processed, sortConfig.key, sortConfig.direction);
    }

    return processed;
  };

  // Add derived state
  const filteredBlogs = processData();
  const totalItems = filteredBlogs.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  // Add pagination-related calculations and functions
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="dashboard-content">
      <div className="header-section">
        <h2 className="section-heading">Blog Management</h2>
      </div>

      <div className="table-controls">
        <div className="controls-left">
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Search blogs..."
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

      <div className="table-container">
        <table className="blog-table">
          <thead>
            <tr>
              <TableHeader label="Status" field="status" />
              <TableHeader label="Name" field="name" />
              <TableHeader label="Email" field="email" />
              <TableHeader label="Roles" field="roles" />
              <TableHeader label="No. of Blogs" field="blogCount" />
              <th className="table-header">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentBlogs.map((blog) => (
              <tr key={blog.id}>
                <td className="table-cell">
                  <StatusIndicator status={blog.status} />
                </td>
                <td className="table-cell">{blog.name}</td>
                <td className="table-cell">{blog.email}</td>
                <td className="table-cell">{blog.roles}</td>
                <td className="table-cell">{blog.blogCount}</td>
                <td className="table-cell">
                  <ActionMenu blogId={blog.id} blogData={blog} />
                </td>
              </tr>
            ))}
            {currentBlogs.length === 0 && (
              <tr>
                <td colSpan="7" className="table-cell no-results">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

export default BlogManagement;
