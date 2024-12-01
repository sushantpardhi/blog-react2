import React from "react";
import "./FilterTabs.css";

const FilterTabs = ({
  activeStatus,
  setActiveStatus,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  categories,
  searchQuery,
  setSearchQuery,
}) => {
  const statuses = ["All", "Published", "Draft", "Archived"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title", label: "Title A-Z" },
  ];

  const handleClearFilters = () => {
    setActiveStatus("All");
    setActiveCategory("All");
    setSortBy("newest");
    setSearchQuery("");
  };

  return (
    <div className="blog-filter-tabs">
      <div className="blog-filter-search-container">
        <div className="blog-filter-search-input-container">
          <svg
            className="blog-filter-search-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="blog-filter-search-input"
          />
          {searchQuery && (
            <button 
              className="blog-filter-search-close-btn"
              onClick={() => setSearchQuery("")}
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div className="blog-filter-section">
        <h4>Status:</h4>
        <div className="blog-filter-status-filters">
          {statuses.map((status) => (
            <button
              key={status}
              className={`blog-filter-btn ${
                activeStatus === status ? "active" : ""
              }`}
              onClick={() => setActiveStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-filter-section">
        <h4>Category:</h4>
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="blog-filter-category-select"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="blog-filter-section">
        <h4>Sort By:</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="blog-filter-sort-select"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="blog-filter-section blog-filter-clear-section">
        <button
          className="blog-filter-clear-btn"
          onClick={handleClearFilters}
          disabled={
            activeStatus === "All" &&
            activeCategory === "All" &&
            sortBy === "newest"
          }
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterTabs;
