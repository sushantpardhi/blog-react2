import React from "react";
import "./DashboardContent.css";
import DashboardCard from "./DashboardCard";

const DashboardContent = () => {
  return (
    <div className="dashboard-content">
      <h2 className="dashboard-metrics-title">Metrics</h2>
      <div className="dashboard-metrics-cards">
        <DashboardCard />
        <DashboardCard />
      </div>
      <h2 className="dashboard-users-title">Users</h2>
      <div className="dashboard-users-cards">
        <DashboardCard />
        <DashboardCard />
      </div>
      <h2 className="dashboard-blogs-title">Blogs</h2>
      <div className="dashboard-blogs-cards">
        <DashboardCard />
        <DashboardCard />
      </div>
    </div>
  );
};

export default DashboardContent;
