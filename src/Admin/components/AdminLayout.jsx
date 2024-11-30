import React, { useState } from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

const AdminLayout = ({ children, menuItems, onTabClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <SideBar
        menuItems={menuItems}
        onTabClick={onTabClick}
        isCollapsed={isCollapsed}
      />
      <main className={`main-content ${isCollapsed ? "expanded" : ""}`}>
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
