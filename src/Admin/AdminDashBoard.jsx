import React, { useState } from "react";
import "./AdminDashboard.css";
import DashboardContent from "./DashboardContent";
import SideBar from "../components/SideBar";
import UserManagement from "./UserManagement";
import BlogManagement from "./BlogManagement";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  const renderContent = () => {
    switch (activeTab) {
      case "Tab1":
        return <DashboardContent />;
      case "Tab2":
        return <UserManagement />;
      case "Tab3":
        return <BlogManagement />;
      default:
        return <div>Dashboard Overview</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <SideBar onTabClick={setActiveTab} />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default AdminDashBoard;
