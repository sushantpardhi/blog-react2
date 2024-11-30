import React from "react";
import { blogStatusData, newBlogsData } from "../data/dashboardData";
import DashboardCard from "../DashboardCard";

const BlogsSection = () => {
  return (
    <>
      <h2 className="dashboard-blogs-title">Blogs</h2>
      <div className="dashboard-blogs-cards">
        <DashboardCard {...blogStatusData} />
        <DashboardCard {...newBlogsData} />
      </div>
    </>
  );
};

export default BlogsSection;
