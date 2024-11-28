import React from "react";
import "./Dashboard.css";
import SideBar from "../components/SideBar";
import AdminDashBoard from "../components/AdminDashBoard";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <AdminDashBoard />
    </div>
  );
};

export default Dashboard;
