import React from "react";
import DashboardCard from "../DashboardCard";
import { visitsData, timeSpentData } from "../data/dashboardData";

const MetricsSection = () => {
  return (
    <>
      <h2 className="section-heading">Metrics</h2>
      <div className="dashboard-cards">
        <DashboardCard {...visitsData} />
        <DashboardCard {...timeSpentData} />
      </div>
    </>
  );
};

export default MetricsSection;
