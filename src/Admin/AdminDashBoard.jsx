import React, { useState } from "react";
import "./AdminDashboard.css";
import DashboardContent from "./DashboardContent";
import Layout from "../components/Layout";
import UserManagement from "./UserManagement";
import BlogManagement from "./BlogManagement";
import {
  FiHome,
  FiUser,
  FiFileText,
  FiTag,
  FiMessageSquare,
  FiSettings,
  FiBarChart,
} from "react-icons/fi";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [profile] = useState({
    name: "Admin User",
    role: "Administrator",
    avatar: "https://via.placeholder.com/40", // Replace with actual admin avatar
  });

  const menuItems = [
    { id: "Tab1", label: "Dashboard", icon: <FiHome /> },
    { id: "Tab2", label: "User", icon: <FiUser /> },
    { id: "Tab3", label: "Blogs", icon: <FiFileText /> },
    { id: "Tab4", label: "Categories", icon: <FiTag /> },
    { id: "Tab5", label: "Comments", icon: <FiMessageSquare /> },
    { id: "Tab6", label: "Analytics", icon: <FiBarChart /> },
    { id: "Tab7", label: "Settings", icon: <FiSettings /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Tab1":
        return <DashboardContent />;
      case "Tab2":
        return <UserManagement />;
      case "Tab3":
        return <BlogManagement />;
      case "Tab4":
        return <div>Categories Management</div>;
      case "Tab5":
        return <div>Comments Management</div>;
      case "Tab6":
        return <div>Analytics Dashboard</div>;
      case "Tab7":
        return <div>Settings</div>;
      default:
        return <div>Dashboard Overview</div>;
    }
  };

  return (
    <Layout menuItems={menuItems} onTabClick={setActiveTab} profile={profile}>
      {renderContent()}
    </Layout>
  );
};

export default AdminDashBoard;
