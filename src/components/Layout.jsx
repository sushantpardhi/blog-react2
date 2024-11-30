import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import "./Layout.css";  // Add this line

const Layout = ({ children, menuItems, onTabClick, profile }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Header
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        profile={profile}
      />
      <div className="layout-container">
        <SideBar
          menuItems={menuItems}
          onTabClick={onTabClick}
          isCollapsed={isCollapsed}
        />
        <main className={`main-content ${isCollapsed ? "expanded" : ""}`}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
