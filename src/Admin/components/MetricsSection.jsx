import React from "react";
import DashboardCard from "../DashboardCard";
import { visitsData, timeSpentData } from "../data/dashboardData";

const MetricsSection = () => {
  return (
    <>
      <h2 className="dashboard-metrics-title">Metrics</h2>
      <div className="dashboard-metrics-cards">
        <DashboardCard {...visitsData} />
        <DashboardCard {...timeSpentData} />
      </div>
    </>
  );
};

export default MetricsSection;
