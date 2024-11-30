// Utility functions to generate random data
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomFloat = (min, max) =>
  +(Math.random() * (max - min) + min).toFixed(1);
const randomPercentage = () => `${randomFloat(-10, 25).toFixed(1)}%`;

const generateTimeSeriesData = (min, max, count) => {
  return Array(count)
    .fill(0)
    .map(() => randomInt(min, max));
};

const generateDataset = ({ dayRange, weekRange, monthRange, yearRange }) => ({
  day: generateTimeSeriesData(...dayRange, 7),
  week: generateTimeSeriesData(...weekRange, 7),
  month: generateTimeSeriesData(...monthRange, 4),
  year: generateTimeSeriesData(...yearRange, 12),
});

export const visitsData = {
  title: "Page Views",
  total: `${randomInt(12000, 18000).toLocaleString()}`,
  percentage: randomPercentage(),
  datasets: [
    {
      label: "Views",
      data: generateDataset({
        dayRange: [200, 1300],
        weekRange: [8000, 15000],
        monthRange: [240000, 350000],
        yearRange: [180000, 430000],
      }),
      borderColor: "#4F46E5",
      tension: 0.4,
    },
  ],
};

export const timeSpentData = {
  title: "Average Time Spent",
  total: `${randomInt(5, 12)}m ${randomInt(0, 59)}s`,
  percentage: randomPercentage(),
  datasets: [
    {
      label: "Time (minutes)",
      data: generateDataset({
        dayRange: [5, 10],
        weekRange: [6, 10],
        monthRange: [7, 10],
        yearRange: [5, 10],
      }),
      borderColor: "#10B981",
      tension: 0.4,
    },
  ],
};

export const usersData = {
  title: "Total Users",
  total: `${randomInt(10000, 15000).toLocaleString()}`,
  percentage: randomPercentage(),
  datasets: [
    {
      label: "Active Users",
      data: generateDataset({
        dayRange: [500, 1000],
        weekRange: [2500, 4000],
        monthRange: [10000, 16000],
        yearRange: [8000, 25000],
      }),
      borderColor: "#10B981",
      tension: 0.4,
    },
    {
      label: "Deactivated Users",
      data: generateDataset({
        dayRange: [30, 60],
        weekRange: [200, 300],
        monthRange: [800, 1000],
        yearRange: [500, 1200],
      }),
      borderColor: "#EF4444",
      tension: 0.4,
    },
    {
      label: "Locked Users",
      data: generateDataset({
        dayRange: [10, 20],
        weekRange: [70, 100],
        monthRange: [300, 400],
        yearRange: [200, 600],
      }),
      borderColor: "#F59E0B",
      tension: 0.4,
    },
  ],
};

export const newUsersData = {
  title: "New Users",
  total: `${randomInt(1000, 1500).toLocaleString()}`,
  percentage: randomPercentage(),
  datasets: [
    {
      label: "New Users",
      data: generateDataset({
        dayRange: [30, 50],
        weekRange: [200, 300],
        monthRange: [900, 1200],
        yearRange: [1300, 1800],
      }),
      borderColor: "#8B5CF6",
      tension: 0.4,
    },
  ],
};

export const blogStatusData = {
  title: "Blog Status",
  total: `${randomInt(700, 1000).toLocaleString()}`,
  percentage: randomPercentage(),
  datasets: [
    {
      label: "Published",
      data: generateDataset({
        dayRange: [400, 500],
        weekRange: [350, 500],
        monthRange: [300, 500],
        yearRange: [250, 600],
      }),
      borderColor: "#10B981",
      tension: 0.4,
    },
    {
      label: "Archived",
      data: generateDataset({
        dayRange: [200, 250],
        weekRange: [180, 250],
        monthRange: [150, 250],
        yearRange: [140, 260],
      }),
      borderColor: "#F59E0B",
      tension: 0.4,
    },
    {
      label: "Draft",
      data: generateDataset({
        dayRange: [100, 130],
        weekRange: [90, 130],
        monthRange: [80, 130],
        yearRange: [50, 130],
      }),
      borderColor: "#6B7280",
      tension: 0.4,
    },
  ],
};

export const newBlogsData = {
  title: "New Blogs",
  total: `${randomInt(100, 150).toLocaleString()}`,
  percentage: randomPercentage(),
  datasets: [
    {
      label: "New Blogs",
      data: generateDataset({
        dayRange: [10, 30],
        weekRange: [80, 110],
        monthRange: [300, 450],
        yearRange: [800, 1600],
      }),
      borderColor: "#8B5CF6",
      tension: 0.4,
    },
  ],
};
