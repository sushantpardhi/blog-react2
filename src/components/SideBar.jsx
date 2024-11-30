import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const SideBar = ({ menuItems, onTabClick, isCollapsed, setIsCollapsed }) => {
  const [activeTab, setActiveTab] = useState(menuItems[0]?.id || "");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabClick(tab);
    if (isMobile && setIsCollapsed) {
      setIsCollapsed(true);
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`tab ${activeTab === item.id ? "active" : ""}`}
          onClick={() => handleTabClick(item.id)}
        >
          {item.icon && <span className="tab-icon">{item.icon}</span>}
          <span className="tab-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
