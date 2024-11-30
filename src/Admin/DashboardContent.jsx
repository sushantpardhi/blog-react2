import React from "react";
import "./DashboardContent.css";
import MetricsSection from "./components/MetricsSection";
import UsersSection from "./components/UsersSection";
import BlogsSection from "./components/BlogsSection";

const DashboardContent = () => {
  return (
    <div className="dashboard-content">
      <MetricsSection />
      <UsersSection />
      <BlogsSection />
    </div>
  );
};

export default DashboardContent;
