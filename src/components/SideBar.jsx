import React, { useState } from "react";
import "./Sidebar.css";
import { FiHome, FiUser, FiFileText } from "react-icons/fi";

const SideBar = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState("Tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabClick(tab);
  };

  return (
    <div className="sidebar">
      <div
        className={`tab ${activeTab === "Tab1" ? "active" : ""}`}
        onClick={() => handleTabClick("Tab1")}
      >
        <FiHome className="tab-icon" />
        <span>Dashboard</span>
      </div>
      <div
        className={`tab ${activeTab === "Tab2" ? "active" : ""}`}
        onClick={() => handleTabClick("Tab2")}
      >
        <FiUser className="tab-icon" />
        <span>User</span>
      </div>
      <div
        className={`tab ${activeTab === "Tab3" ? "active" : ""}`}
        onClick={() => handleTabClick("Tab3")}
      >
        <FiFileText className="tab-icon" />
        <span>Blogs</span>
      </div>
    </div>
  );
};

export default SideBar;
