import React from "react";
import DashboardCard from "../DashboardCard";
import { usersData, newUsersData } from "../data/dashboardData";

const UsersSection = () => {
  return (
    <>
      <h2 className="section-heading">Users</h2>
      <div className="dashboard-users-cards">
        <DashboardCard {...usersData} />
        <DashboardCard {...newUsersData} />
      </div>
    </>
  );
};

export default UsersSection;
