import React, { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import "./BlogAnalytics.css";

const generateTimeSeriesWithTrends = (baseValue, days, options = {}) => {
  const {
    trend = 0.02, // Overall growth trend
    seasonality = 0.15, // Seasonal variation
    variance = 0.1, // Random variance
    weekendDip = true, // Lower values on weekends
    viralSpikes = true, // Occasional viral posts
  } = options;

  return Array.from({ length: days }, (_, i) => {
    const dayOfWeek = i % 7;

    // Base trend
    const trendFactor = 1 + (trend * i) / days;

    // Seasonality (monthly pattern)
    const seasonalFactor = 1 + seasonality * Math.sin((2 * Math.PI * i) / 30);

    // Weekend adjustment
    const weekendFactor =
      weekendDip && (dayOfWeek === 5 || dayOfWeek === 6) ? 0.7 : 1;

    // Random variance
    const randomFactor = 1 + (Math.random() - 0.5) * 2 * variance;

    // Viral spikes (roughly once a month)
    const viralFactor =
      viralSpikes && Math.random() < 0.03 ? Math.random() * 2 + 2 : 1;

    return Math.round(
      baseValue *
        trendFactor *
        seasonalFactor *
        weekendFactor *
        randomFactor *
        viralFactor
    );
  });
};

const BlogAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    views: [],
    likes: [],
    comments: [],
    totalPosts: [],
    averageReadTime: [],
    topCategory: "",
    engagementRate: [],
    totalShares: [],
    readerRetention: [],
  });

  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    // Generate 90 days of realistic data
    const baseViews = 500;
    const views = generateTimeSeriesWithTrends(baseViews, 90, {
      trend: 0.03,
      seasonality: 0.2,
      variance: 0.15,
      viralSpikes: true,
    });

    // Correlated metrics with more realistic rates
    const likes = views.map((v) =>
      Math.round(v * (0.15 + Math.random() * 0.05))
    );
    const comments = views.map((v) =>
      Math.round(v * (0.03 + Math.random() * 0.02))
    );
    const shares = views.map((v) =>
      Math.round(v * (0.05 + Math.random() * 0.03))
    );

    // Posts follow a more controlled pattern (2-3 posts per week)
    const posts = Array(90)
      .fill(0)
      .map((_, i) => {
        const week = Math.floor(i / 7);
        return week * 2 + (Math.random() < 0.3 ? 1 : 0);
      });

    // Read time gradually improves with content quality
    const readTime = Array(90)
      .fill(0)
      .map((_, i) => Number((3.5 + (i / 90) * 1.5 + Math.random()).toFixed(1)));

    // Engagement rate capped at 65% maximum
    const engagementRate = views.map((v, i) => {
      const rate = ((likes[i] + comments[i] * 2 + shares[i] * 3) / v) * 100;
      return Math.min(65, Math.max(15, Math.round(rate))); // Keep between 15-65%
    });

    // Reader retention capped at 85% maximum
    const retention = Array(90)
      .fill(0)
      .map((_, i) => {
        const baseRetention = 45 + (i / 90) * 30; // Base progression from 45% to 75%
        const variance = (Math.random() - 0.5) * 10; // Add some variance
        return Math.min(85, Math.max(40, Math.round(baseRetention + variance))); // Cap at 85%
      });

    setAnalyticsData({
      views,
      likes,
      comments,
      totalPosts: posts,
      averageReadTime: readTime,
      engagementRate,
      totalShares: shares,
      readerRetention: retention,
      topCategory: "Technology",
    });
  };

  const handleCardClick = (title) => {
    setExpandedCard(expandedCard === title ? null : title);
  };

  return (
    <div className="analytics-container">
      <h1>Blog Analytics Dashboard</h1>

      <div className="stats-cards">
        <StatCard
          title="Total Views"
          value={analyticsData.views.reduce((a, b) => a + b, 0)}
          detail="Total article impressions"
          data={analyticsData.views}
          isExpanded={expandedCard === "Total Views"}
          onCardClick={handleCardClick}
          style={{
            "--grid-column": expandedCard === "Total Views" ? "1 / -1" : "auto",
          }}
        />
        <StatCard
          title="Total Likes"
          value={analyticsData.likes.reduce((a, b) => a + b, 0)}
          detail="Positive reader reactions"
          data={analyticsData.likes}
          isExpanded={expandedCard === "Total Likes"}
          onCardClick={handleCardClick}
          style={{
            "--grid-column": expandedCard === "Total Likes" ? "1 / -1" : "auto",
          }}
        />
        <StatCard
          title="Total Comments"
          value={analyticsData.comments.reduce((a, b) => a + b, 0)}
          detail="Reader discussions"
          data={analyticsData.comments}
          isExpanded={expandedCard === "Total Comments"}
          onCardClick={handleCardClick}
          style={{
            "--grid-column":
              expandedCard === "Total Comments" ? "1 / -1" : "auto",
          }}
        />
        <StatCard
          title="Total Posts"
          value={analyticsData.totalPosts.reduce((a, b) => a + b, 0)}
          detail="Published articles"
          data={analyticsData.totalPosts}
          isExpanded={expandedCard === "Total Posts"}
          onCardClick={handleCardClick}
          style={{
            "--grid-column": expandedCard === "Total Posts" ? "1 / -1" : "auto",
          }}
        />
        <StatCard
          title="Engagement Rate"
          value={`${
            analyticsData.engagementRate[
              analyticsData.engagementRate.length - 1
            ] || 0
          }%`}
          detail="Based on likes, comments & shares"
          data={analyticsData.engagementRate}
          isExpanded={expandedCard === "Engagement Rate"}
          onCardClick={handleCardClick}
          style={{
            "--grid-column":
              expandedCard === "Engagement Rate" ? "1 / -1" : "auto",
          }}
        />
        <StatCard
          title="Avg. Read Time"
          value={`${(analyticsData.averageReadTime.reduce((a, b) => a + b, 0) / analyticsData.averageReadTime.length || 0).toFixed(2)} min`}
          detail="Time spent per article"
          data={analyticsData.averageReadTime}
          isExpanded={expandedCard === "Avg. Read Time"}
          onCardClick={handleCardClick}
          style={{
            "--grid-column":
              expandedCard === "Avg. Read Time" ? "1 / -1" : "auto",
          }}
        />
        <StatCard
          title="Total Shares"
          value={analyticsData.totalShares.reduce((a, b) => a + b, 0)}
          detail="Content redistributions"
          data={analyticsData.totalShares}
          isExpanded={expandedCard === "Total Shares"}
          onCardClick={handleCardClick}
          style={{
            "--grid-column":
              expandedCard === "Total Shares" ? "1 / -1" : "auto",
          }}
        />
        <StatCard
          title="Reader Retention"
          value={`${
            analyticsData.readerRetention[
              analyticsData.readerRetention.length - 1
            ] || 0
          }%`}
          detail="Of readers return for more content"
          data={analyticsData.readerRetention}
          isExpanded={expandedCard === "Reader Retention"}
          onCardClick={handleCardClick}
          style={{
            "--grid-column":
              expandedCard === "Reader Retention" ? "1 / -1" : "auto",
          }}
        />
      </div>
    </div>
  );
};

export default BlogAnalytics;
