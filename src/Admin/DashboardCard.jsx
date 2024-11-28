<<<<<<< HEAD
import React, { useState, useMemo, useCallback } from "react";
import "./DashboardCard.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = ({ title, total, percentage, datasets, labels }) => {
  const [timeFrame, setTimeFrame] = useState("day");

  const timeFrameData = {
    day: {
      labels: ["12am", "4am", "8am", "12pm", "4pm", "8pm", "11pm"],
      divisor: 0.2,
    },
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      divisor: 1,
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      divisor: 7,
    },
    year: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      divisor: 30,
    },
  };

  const calculateTotalValue = useCallback(
    (dataset) => {
      const currentData = dataset.data[timeFrame];
      if (!currentData || currentData.length === 0) return 0;
      return currentData[currentData.length - 1].toLocaleString();
    },
    [timeFrame]
  );

  const currentPercentage = useMemo(() => {
    const calculatePercentageChange = (dataset) => {
      const currentData = dataset.data[timeFrame];
      if (!currentData || currentData.length < 2) return 0;

      const startValue = currentData[0];
      const endValue = currentData[currentData.length - 1];

      if (startValue === 0) return 100;
      return (((endValue - startValue) / startValue) * 100).toFixed(1);
    };

    if (!datasets || datasets.length === 0) return percentage || "+0.0%";

    const mainDataset = datasets[0]; // Use first dataset for single metric cards
    const change = calculatePercentageChange(mainDataset);
    return `${change > 0 ? "+" : ""}${change}%`;
  }, [datasets, timeFrame, percentage]);

  const currentTotal = useMemo(() => {
    if (!datasets || datasets.length === 0) return total;
    return calculateTotalValue(datasets[0]);
  }, [datasets, calculateTotalValue, total]);

  const adjustDataForTimeFrame = (dataset) => {
    if (!dataset?.data) return [];
    return dataset.data[timeFrame] || [];
  };

  const data = {
    labels: timeFrameData[timeFrame].labels,
    datasets: datasets
      ? datasets.map((dataset) => ({
          ...dataset,
          data: adjustDataForTimeFrame(dataset),
        }))
      : [
          {
            label: "Default",
            data: [65, 59, 80, 81, 56, 55, 72],
            fill: false,
            borderColor: "#4F46E5",
            tension: 0.4,
          },
        ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 6,
          boxHeight: 6,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(229, 231, 235, 0.5)",
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#6B7280",
          padding: 8,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#6B7280",
          padding: 8,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="title">
          <h3>{title || "Site Visits"}</h3>
          <span className="total-visits">{currentTotal || "468"}</span>
        </div>
        <div className="card-controls">
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="time-frame-select"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <span
            className={`percentage-increase ${
              currentPercentage.startsWith("-") ? "negative" : ""
            }`}
          >
            {currentPercentage}
          </span>
        </div>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
=======
import React from "react";
import "./DashboardCard.css";

const DashboardCard = () => {
  return <div className="dashboard-card"></div>;
>>>>>>> 7b2bb0a665ce71bd389921191279d95189c70abf
};

export default DashboardCard;
