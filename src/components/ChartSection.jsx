import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./ChartSection.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartSection = ({ data, type }) => {
  const [timeFrame, setTimeFrame] = useState("week");
  const [chartType, setChartType] = useState("line"); // Add this state

  const topItemsByType = {
    "Total Views": {
      week: [
        { title: "Getting Started with React", value: 2547, trend: "+12%" },
        { title: "Modern JavaScript Features", value: 2123, trend: "+8%" },
        { title: "CSS Grid Layout Guide", value: 1893, trend: "+15%" },
        { title: "Web Development Best Practices", value: 1654, trend: "+5%" },
        { title: "Responsive Design Patterns", value: 1432, trend: "+10%" },
      ],
      month: [
        { title: "Complete React Guide", value: 12547, trend: "+22%" },
        { title: "JavaScript Deep Dive", value: 10123, trend: "+18%" },
        { title: "CSS Masterclass", value: 8893, trend: "+25%" },
        { title: "Frontend Architecture", value: 7654, trend: "+15%" },
        { title: "Web Performance Guide", value: 6432, trend: "+20%" },
      ],
      year: [
        { title: "Web Development in 2024", value: 52547, trend: "+42%" },
        { title: "Full Stack Development", value: 48123, trend: "+38%" },
        { title: "Modern Web Architecture", value: 45893, trend: "+35%" },
        { title: "React vs Other Frameworks", value: 41654, trend: "+25%" },
        { title: "Cloud Computing Basics", value: 38432, trend: "+30%" },
      ],
    },
    "Total Likes": {
      week: [
        { title: "React Hooks Tutorial", value: 847, trend: "+22%" },
        { title: "JavaScript Best Practices", value: 723, trend: "+18%" },
        { title: "Redux Made Simple", value: 693, trend: "+15%" },
        { title: "CSS Flexbox Guide", value: 554, trend: "+9%" },
        { title: "TypeScript Basics", value: 432, trend: "+12%" },
      ],
      month: [
        { title: "React Advanced Patterns", value: 3847, trend: "+32%" },
        { title: "JavaScript Design Patterns", value: 3223, trend: "+28%" },
        { title: "State Management Guide", value: 2893, trend: "+25%" },
        { title: "Modern CSS Techniques", value: 2554, trend: "+19%" },
        { title: "TypeScript Advanced", value: 2432, trend: "+22%" },
      ],
      year: [
        { title: "Complete Frontend Guide", value: 15847, trend: "+52%" },
        { title: "JavaScript Mastery", value: 14723, trend: "+48%" },
        { title: "React Ecosystem", value: 13693, trend: "+45%" },
        { title: "CSS Architecture", value: 12554, trend: "+39%" },
        { title: "Web Development Tools", value: 11432, trend: "+42%" },
      ],
    },
    "Total Comments": {
      week: [
        {
          title: "Controversial Programming Practices",
          value: 147,
          trend: "+32%",
        },
        { title: "React vs Vue", value: 123, trend: "+28%" },
        { title: "Should You Learn TypeScript?", value: 93, trend: "+15%" },
        { title: "Future of Web Development", value: 84, trend: "+19%" },
        { title: "Docker vs Kubernetes", value: 72, trend: "+12%" },
      ],
      month: [
        { title: "JavaScript vs TypeScript", value: 547, trend: "+42%" },
        { title: "Frontend vs Backend", value: 523, trend: "+38%" },
        { title: "Monolith vs Microservices", value: 493, trend: "+35%" },
        { title: "SQL vs NoSQL Debate", value: 484, trend: "+29%" },
        { title: "Native vs Cross-platform", value: 472, trend: "+32%" },
      ],
      year: [
        { title: "Web Development Trends 2024", value: 2147, trend: "+62%" },
        { title: "Programming Language Wars", value: 2023, trend: "+58%" },
        { title: "Framework Comparisons", value: 1893, trend: "+55%" },
        { title: "Tech Stack Decisions", value: 1784, trend: "+49%" },
        { title: "Career Path Discussions", value: 1672, trend: "+52%" },
      ],
    },
    "Total Shares": {
      week: [
        { title: "Complete Web Dev Roadmap", value: 347, trend: "+42%" },
        { title: "Git Commands Cheatsheet", value: 323, trend: "+38%" },
        { title: "React Performance Tips", value: 293, trend: "+25%" },
        { title: "SQL vs NoSQL", value: 284, trend: "+19%" },
        { title: "AWS Basics Guide", value: 272, trend: "+22%" },
      ],
      month: [
        { title: "Frontend Development Guide", value: 1347, trend: "+52%" },
        { title: "Ultimate Git Guide", value: 1323, trend: "+48%" },
        { title: "React Best Practices", value: 1293, trend: "+45%" },
        { title: "Database Selection Guide", value: 1284, trend: "+39%" },
        { title: "Cloud Computing Guide", value: 1272, trend: "+42%" },
      ],
      year: [
        { title: "Web Development Career Guide", value: 5347, trend: "+72%" },
        { title: "DevOps Handbook", value: 5123, trend: "+68%" },
        { title: "React Architecture Guide", value: 4893, trend: "+65%" },
        { title: "Database Design Patterns", value: 4784, trend: "+59%" },
        { title: "Cloud Architecture Guide", value: 4672, trend: "+62%" },
      ],
    },
    "Avg. Read Time": {
      week: [
        { title: "System Design Principles", value: 12.5, trend: "+15%" },
        { title: "Advanced Algorithm Analysis", value: 11.2, trend: "+12%" },
        { title: "Architecture Patterns", value: 10.8, trend: "+10%" },
        { title: "Database Optimization", value: 9.5, trend: "+8%" },
        { title: "Security Best Practices", value: 9.2, trend: "+7%" },
      ],
      month: [
        { title: "Microservices Architecture", value: 15.5, trend: "+25%" },
        { title: "Cloud Computing Guide", value: 14.2, trend: "+20%" },
        { title: "Advanced React Patterns", value: 13.8, trend: "+18%" },
        { title: "Performance Optimization", value: 12.5, trend: "+15%" },
        { title: "DevOps Practices", value: 12.2, trend: "+12%" },
      ],
      year: [
        { title: "Complete System Design", value: 18.5, trend: "+35%" },
        { title: "Enterprise Architecture", value: 17.2, trend: "+30%" },
        { title: "Advanced Development", value: 16.8, trend: "+28%" },
        { title: "Cloud Architecture", value: 15.5, trend: "+25%" },
        { title: "Security Architecture", value: 15.2, trend: "+22%" },
      ],
    },

    "Engagement Rate": {
      week: [
        { title: "Controversial Tech Debates", value: 82, trend: "+12%" },
        { title: "Future of JavaScript", value: 78, trend: "+10%" },
        { title: "AI in Web Development", value: 75, trend: "+8%" },
        { title: "Career Growth Tips", value: 72, trend: "+7%" },
        { title: "Tech Stack Comparisons", value: 70, trend: "+5%" },
      ],
      month: [
        { title: "Industry Trends 2024", value: 85, trend: "+15%" },
        { title: "Programming Languages", value: 82, trend: "+12%" },
        { title: "Framework Wars", value: 80, trend: "+10%" },
        { title: "Career Development", value: 78, trend: "+8%" },
        { title: "Tech Industry Insights", value: 75, trend: "+7%" },
      ],
      year: [
        { title: "Tech Industry Analysis", value: 88, trend: "+20%" },
        { title: "Development Trends", value: 85, trend: "+18%" },
        { title: "Career Guidance", value: 83, trend: "+15%" },
        { title: "Technology Impact", value: 80, trend: "+12%" },
        { title: "Future of Tech", value: 78, trend: "+10%" },
      ],
    },

    "Reader Retention": {
      week: [
        { title: "JavaScript Series", value: 85, trend: "+10%" },
        { title: "React Tutorial Series", value: 82, trend: "+8%" },
        { title: "Web Dev Fundamentals", value: 80, trend: "+7%" },
        { title: "Backend Development", value: 78, trend: "+6%" },
        { title: "Database Design", value: 75, trend: "+5%" },
      ],
      month: [
        { title: "Complete Web Dev", value: 88, trend: "+15%" },
        { title: "Full Stack Guide", value: 85, trend: "+12%" },
        { title: "Frontend Mastery", value: 83, trend: "+10%" },
        { title: "Backend Architecture", value: 80, trend: "+8%" },
        { title: "DevOps Guide", value: 78, trend: "+7%" },
      ],
      year: [
        { title: "Web Development Path", value: 90, trend: "+20%" },
        { title: "Programming Journey", value: 87, trend: "+18%" },
        { title: "Tech Career Guide", value: 85, trend: "+15%" },
        { title: "Software Architecture", value: 83, trend: "+12%" },
        { title: "Industry Best Practices", value: 80, trend: "+10%" },
      ],
    },
    "Total Posts": {
      week: [
        { title: "Technology", value: 8, trend: "+15%", color: "#3b82f6" },
        { title: "Programming", value: 6, trend: "+10%", color: "#8b5cf6" },
        { title: "Web Development", value: 5, trend: "+8%", color: "#ec4899" },
        {
          title: "Software Engineering",
          value: 4,
          trend: "+5%",
          color: "#10b981",
        },
        { title: "DevOps", value: 3, trend: "+3%", color: "#f59e0b" },
      ],
      month: [
        { title: "Technology", value: 35, trend: "+25%", color: "#3b82f6" },
        { title: "Programming", value: 28, trend: "+20%", color: "#8b5cf6" },
        {
          title: "Web Development",
          value: 22,
          trend: "+15%",
          color: "#ec4899",
        },
        {
          title: "Software Engineering",
          value: 18,
          trend: "+12%",
          color: "#10b981",
        },
        { title: "DevOps", value: 15, trend: "+10%", color: "#f59e0b" },
      ],
      year: [
        { title: "Technology", value: 420, trend: "+45%", color: "#3b82f6" },
        { title: "Programming", value: 350, trend: "+40%", color: "#8b5cf6" },
        {
          title: "Web Development",
          value: 280,
          trend: "+35%",
          color: "#ec4899",
        },
        {
          title: "Software Engineering",
          value: 230,
          trend: "+30%",
          color: "#10b981",
        },
        { title: "DevOps", value: 180, trend: "+25%", color: "#f59e0b" },
      ],
    },
  };

  const getSuffix = (type) => {
    switch (type) {
      case "Total Views":
        return "views";
      case "Total Likes":
        return "likes";
      case "Total Comments":
        return "comments";
      case "Total Shares":
        return "shares";
      case "Avg. Read Time":
        return "min";
      case "Total Posts":
        return "posts";
      case "Engagement Rate":
      case "Reader Retention":
        return "%";
      default:
        return "";
    }
  };

  const timeFrameData = {
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data:
        type === "Total Posts"
          ? Array(7)
              .fill(0)
              .map(() => Math.floor(Math.random() * 3)) // 0-2 posts per day
          : Array.isArray(data)
          ? data.slice(-7)
          : [data],
    },
    month: {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      data:
        type === "Total Posts"
          ? Array(30)
              .fill(0)
              .map(() => Math.floor(Math.random() * 3)) // 0-2 posts per day
          : Array.isArray(data)
          ? data.slice(-30)
          : Array(30)
              .fill(data)
              .map((v, i) =>
                typeof v === "number"
                  ? Math.round(v * (0.8 + Math.random() * 0.4))
                  : v
              ),
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
      data:
        type === "Total Posts"
          ? Array(12)
              .fill(0)
              .map(() => Math.floor(Math.random() * 30 + 15)) // 15-45 posts per month
          : Array.isArray(data)
          ? Array(12)
              .fill(0)
              .map((_, i) => {
                const monthData = data.slice(i * 7, (i + 1) * 7);
                return Math.round(
                  monthData.reduce((a, b) => a + b, 0) / monthData.length
                );
              })
          : Array(12).fill(data),
    },
  };

  const formatData = () => {
    const { labels, data: timeData } = timeFrameData[timeFrame];

    return {
      labels,
      datasets: [
        {
          label: type,
          data: timeData,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#3b82f6",
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#3b82f6",
          pointHoverBorderColor: "#ffffff",
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    animation: {
      duration: 750,
      easing: "easeInOutQuart",
    },
  };

  const getPerformanceLevel = (value) => {
    if (value >= 90) return { level: "Excellent", color: "#22c55e" };
    if (value >= 75) return { level: "Good", color: "#3b82f6" };
    if (value >= 50) return { level: "Average", color: "#eab308" };
    if (value >= 30) return { level: "Poor", color: "#f97316" };
    return { level: "Very Poor", color: "#ef4444" };
  };

  const renderChart = () => {
    const chartData = formatData(data);
    const topItems = topItemsByType[type]?.[timeFrame];

    const modifiedChartOptions = {
      ...chartOptions,
      scales: {
        ...chartOptions.scales,
        y: {
          ...chartOptions.scales.y,
          min: 0,
          max:
            type === "Total Posts"
              ? timeFrame === "week"
                ? 5
                : timeFrame === "month"
                ? 5
                : 50
              : undefined,
          ticks: {
            ...chartOptions.scales.y.ticks,
            stepSize: type === "Total Posts" ? 1 : undefined,
          },
        },
      },
      plugins: {
        ...chartOptions.plugins,
        legend: {
          ...chartOptions.plugins.legend,
          display: type !== "Total Posts",
        },
      },
    };

    const ChartTypeSelector = () => (
      <div className="chart-type-selector">
        <button
          className={`chart-type-btn ${chartType === "line" ? "active" : ""}`}
          onClick={() => setChartType("line")}
        >
          Line
        </button>
        <button
          className={`chart-type-btn ${chartType === "bar" ? "active" : ""}`}
          onClick={() => setChartType("bar")}
        >
          Bar
        </button>
      </div>
    );

    const renderSelectedChart = () => {
      const commonProps = {
        data: {
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              borderRadius: chartType === "bar" ? 4 : 0,
              fill: true, // Keep fill true for line charts to maintain the gradient
            },
          ],
        },
        options: modifiedChartOptions,
      };

      return chartType === "bar" ? (
        <Bar {...commonProps} />
      ) : (
        <Line {...commonProps} />
      );
    };

    if (type === "Total Posts") {
      return (
        <div className="views-analysis-grid">
          <div className="views-chart">
            <ChartTypeSelector />
            {renderSelectedChart()}
          </div>
          <div className="top-blogs-section">
            <h5>
              Top Categories by Posts -{" "}
              {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
            </h5>
            <div className="top-blogs-list">
              {topItems.map((item, index) => (
                <div key={index} className="top-blog-item">
                  <span className="blog-rank">{index + 1}</span>
                  <div className="blog-info">
                    <span className="blog-title">{item.title}</span>
                    <div className="blog-stats">
                      <span className="category-posts">{item.value} posts</span>
                      <span className="blog-trend">{item.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`views-analysis-grid ${!topItems ? "full-width" : ""}`}>
        <div className="views-chart">
          <ChartTypeSelector />
          {type === "Engagement Rate" || type === "Reader Retention" ? (
            <>
              <div className="performance-indicator">
                Current Performance:{" "}
                <span
                  style={{
                    color: getPerformanceLevel(timeFrameData[timeFrame].data[0])
                      .color,
                  }}
                >
                  {getPerformanceLevel(timeFrameData[timeFrame].data[0]).level}
                </span>
              </div>
              {renderSelectedChart()}
            </>
          ) : (
            renderSelectedChart()
          )}
        </div>
        {topItems && (
          <div className="top-blogs-section">
            <h5>
              Top Posts by {type.split(" ")[1]} -{" "}
              {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
            </h5>
            <div className="top-blogs-list">
              {topItems.map((item, index) => (
                <div key={index} className="top-blog-item">
                  <span className="blog-rank">{index + 1}</span>
                  <div className="blog-info">
                    <span className="blog-title">{item.title}</span>
                    <div className="blog-stats">
                      <span className="blog-views">
                        {item.value.toLocaleString()} {getSuffix(type)}
                      </span>
                      <span className="blog-trend">{item.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="chart-section">
      <div className="chart-header">
        <h4>Trend Analysis - {type}</h4>
        <div className="time-controls">
          <button
            className={`time-btn ${timeFrame === "week" ? "active" : ""}`}
            onClick={() => setTimeFrame("week")}
          >
            Week
          </button>
          <button
            className={`time-btn ${timeFrame === "month" ? "active" : ""}`}
            onClick={() => setTimeFrame("month")}
          >
            Month
          </button>
          <button
            className={`time-btn ${timeFrame === "year" ? "active" : ""}`}
            onClick={() => setTimeFrame("year")}
          >
            Year
          </button>
        </div>
      </div>
      <div className="chart-container">{renderChart()}</div>
    </div>
  );
};

export default ChartSection;
