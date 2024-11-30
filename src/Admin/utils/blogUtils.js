import { getRandomElement } from "./userUtils";

const CATEGORIES = [
  "Technology",
  "Lifestyle",
  "Travel",
  "Food",
  "Business",
  "Health",
];
const BLOG_STATUS = ["Published", "Draft", "Archived"];

const BLOG_TITLES = [
  "Getting Started with React",
  "Top 10 Travel Destinations",
  "Healthy Living Tips",
  "Modern Web Development",
  "Business Strategy Guide",
  "Tech Trends 2024",
];

const generateRandomTitle = () => {
  const adjectives = [
    "Essential",
    "Ultimate",
    "Complete",
    "Beginner's",
    "Advanced",
  ];
  const nouns = [
    "Guide to",
    "Introduction to",
    "Overview of",
    "Analysis of",
    "Deep Dive into",
  ];
  const topics = [
    "Web Development",
    "Digital Marketing",
    "Data Science",
    "AI",
    "Cloud Computing",
  ];

  return `${getRandomElement(adjectives)} ${getRandomElement(
    nouns
  )} ${getRandomElement(topics)}`;
};

const generateRandomContent = () => {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ${Math.random()
    .toString(36)
    .substring(2)}`;
};

export const generateBlogs = (count = 100) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1, // Add unique ID
    title:
      Math.random() > 0.5
        ? getRandomElement(BLOG_TITLES)
        : generateRandomTitle(),
    author: "John Doe",
    category: getRandomElement(CATEGORIES),
    status: getRandomElement(BLOG_STATUS),
    views: Math.floor(Math.random() * 10000),
    comments: Math.floor(Math.random() * 100),
    publishDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
      .toISOString()
      .split("T")[0],
    content: generateRandomContent(),
  }));
};
