import React, { useState } from "react";
import "./Profile.css";
import {
  FiUser,
  FiLock,
  FiClock,
  FiBookmark,
  FiBell,
  FiEdit,
  FiMessageSquare,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import PersonalInformation from "./PersonalInformation";
import Layout from "../components/Layout";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("personal");

  const menuItems = [
    { id: "personal", label: "Personal Information", icon: <FiUser /> },
    { id: "posts", label: "My Blog Posts", icon: <FiEdit /> },
    { id: "comments", label: "My Comments", icon: <FiMessageSquare /> },
    { id: "analytics", label: "Blog Analytics", icon: <FiBarChart2 /> },
    { id: "saved", label: "Saved Posts", icon: <FiBookmark /> },
    { id: "security", label: "Security", icon: <FiLock /> },
    { id: "activity", label: "Activity History", icon: <FiClock /> },
    { id: "notifications", label: "Notifications", icon: <FiBell /> },
    { id: "settings", label: "Profile Settings", icon: <FiSettings /> },
  ];

  const handleTabClick = (tabId) => {
    setActiveSection(tabId);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInformation />;
      case "posts":
        return <h2 className="section-title">My Blog Posts Management</h2>;
      case "comments":
        return <h2 className="section-title">My Comments History</h2>;
      case "analytics":
        return <h2 className="section-title">Blog Analytics Dashboard</h2>;
      case "saved":
        return <h2 className="section-title">Saved Posts Section</h2>;
      case "security":
        return <h2 className="section-title">Security Section</h2>;
      case "activity":
        return <h2 className="section-title">Activity History Section</h2>;
      case "notifications":
        return <h2 className="section-title">Notifications Section</h2>;
      case "settings":
        return <h2 className="section-title">Profile Settings</h2>;
      default:
        return <h2 className="section-title">Select a section</h2>;
    }
  };

  return (
    <div className="profile-container">
      <Layout menuItems={menuItems} onTabClick={handleTabClick}>
        {renderMainContent()}
      </Layout>{" "}
    </div>
  );
};

export default Profile;
