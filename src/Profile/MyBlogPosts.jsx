import React, { useState, useMemo } from "react";
import "./MyBlogPost.css";
import BlogCard from "../components/BlogCard";
import FilterTabs from "./FilterTabs"; // Make sure this path is correct

const generateDummyData = () => {
  const titles = [
    "Getting Started with React",
    "Advanced CSS Techniques",
    "JavaScript Best Practices",
    "Node.js Fundamentals",
    "MongoDB Essentials",
    "Redux State Management",
    "REST API Design",
    "TypeScript Tutorial",
    "Docker Basics",
    "Git Advanced Commands",
  ];

  const categories = [
    "React",
    "JavaScript",
    "CSS",
    "Node.js",
    "Database",
    "DevOps",
    "Frontend",
    "Backend",
    "Web Development",
    "Programming",
  ];

  const authors = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Wilson",
    "David Brown",
    "Emma Davis",
    "Alex Turner",
    "Lisa Anderson",
  ];

  const statuses = ["Published", "Draft", "Archived"];

  const getRandomItems = (array, min = 1, max = 3) => {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const dummyData = Array.from({ length: 47 }, (_, index) => ({
    id: index + 1,
    image: `https://via.placeholder.com/350x200/${Math.floor(
      Math.random() * 16777215
    ).toString(16)}/ffffff?text=Blog+${index + 1}`,
    title: titles[index % titles.length],
    excerpt: `This is a sample excerpt for blog post ${
      index + 1
    }. Click to read more about ${titles[index % titles.length]}...`,
    date: getRandomDate(),
    author: authors[Math.floor(Math.random() * authors.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    categories: getRandomItems(categories), // Now returning array of categories
  }));

  return dummyData;
};

const MyBlogPosts = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = generateDummyData();
  const allCategories = [...new Set(blogPosts.flatMap(post => post.categories))];

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.categories.some(cat => cat.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (activeStatus !== "All") {
      filtered = filtered.filter(post => post.status === activeStatus);
    }

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(post => 
        post.categories.includes(activeCategory)
      );
    }

    // Sort posts
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "title":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
  }, [blogPosts, activeStatus, activeCategory, sortBy, searchQuery]);

  return (
    <div className="blog-posts-section">
      <FilterTabs
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={allCategories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="my-blog-post-container">
        {filteredAndSortedPosts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default MyBlogPosts;
