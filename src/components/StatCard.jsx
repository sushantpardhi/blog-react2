import React from "react";
import "./StatCard.css";
import ChartSection from "./ChartSection";

const StatCard = ({ title, value, detail, data, isExpanded, onCardClick }) => {
  const cardContent = (
    <div className="stat-card" onClick={() => onCardClick(title)}>
      <h3>{title}</h3>
      <p>{value}</p>
      <small className="metric-detail">{detail}</small>
    </div>
  );

  if (isExpanded) {
    return (
      <div className="expanded-row">
        {cardContent}
        <ChartSection data={data} type={title} />
      </div>
    );
  }

  return <div className="stat-card-wrapper">{cardContent}</div>;
};

export default StatCard;
