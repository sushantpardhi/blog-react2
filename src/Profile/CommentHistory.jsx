import React, { useState, useMemo } from "react";
import "./CommentHistory.css";

const generateSampleComments = () => {
  const blogTitles = [
    "Getting Started with React",
    "Understanding JavaScript Promises",
    "CSS Grid Layout Guide",
    "Modern JavaScript Features",
    "React Hooks Deep Dive",
    "Web Performance Optimization",
  ];

  const sampleComments = [
    "This was really helpful, thanks!",
    "Could you explain this part in more detail?",
    "Great article, helped me understand the concept better.",
    "I've been using this approach in my projects, works great!",
    "Looking forward to more content like this.",
    "This solved my problem, thank you!",
    "Interesting perspective on this topic.",
    "Well explained with good examples.",
    "Thanks for sharing your knowledge!",
  ];

  const getRandomDate = () => {
    const start = new Date(2024, 0, 1); // January 1, 2024
    const end = new Date();
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
      .toISOString()
      .split("T")[0];
  };

  return Array.from({ length: 37 }, (_, index) => ({
    id: index + 1,
    blogTitle: blogTitles[Math.floor(Math.random() * blogTitles.length)],
    comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
    date: getRandomDate(),
  }));
};

const CommentHistory = () => {
  const [comments, setComments] = useState(generateSampleComments());
  const [editingComment, setEditingComment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedBlogs, setExpandedBlogs] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Group comments by blog title and sort by date
  const groupedComments = useMemo(() => {
    const filteredComments = comments.filter(
      (comment) =>
        comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.blogTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const grouped = filteredComments.reduce((acc, comment) => {
      if (!acc[comment.blogTitle]) {
        acc[comment.blogTitle] = [];
      }
      acc[comment.blogTitle].push(comment);
      return acc;
    }, {});

    // Sort comments within each blog group
    Object.keys(grouped).forEach((blogTitle) => {
      grouped[blogTitle].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });

    return grouped;
  }, [comments, searchQuery]);

  const stats = useMemo(() => {
    return {
      totalComments: comments.length,
      totalBlogs: Object.keys(groupedComments).length,
      mostCommentedBlog: Object.entries(groupedComments).sort(
        ([, a], [, b]) => b.length - a.length
      )[0],
    };
  }, [comments, groupedComments]);

  const toggleBlog = (blogTitle) => {
    const newExpanded = new Set(expandedBlogs);
    if (newExpanded.has(blogTitle)) {
      newExpanded.delete(blogTitle);
    } else {
      newExpanded.add(blogTitle);
    }
    setExpandedBlogs(newExpanded);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
    setShowModal(true);
  };

  const handleSave = (id, newText) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, comment: newText } : comment
      )
    );
    setShowModal(false);
  };

  return (
    <div className="ch-comment-history-wrapper">
      <div className="ch-comment-history">
        <h2>Manage Your Comments</h2>
        <div className="ch-blogs-list">
          {Object.entries(groupedComments).map(([blogTitle, blogComments]) => (
            <div key={blogTitle} className="ch-blog-section">
              <div
                className="ch-blog-header"
                onClick={() => toggleBlog(blogTitle)}
              >
                <div className="ch-blog-title-wrapper">
                  <h3 className="ch-blog-title">{blogTitle}</h3>
                  <span className="ch-comment-count">
                    {blogComments.length}
                  </span>
                </div>
                <span
                  className={`ch-expand-icon ${
                    expandedBlogs.has(blogTitle) ? "ch-expanded" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {expandedBlogs.has(blogTitle) && (
                <div className="ch-comments-container">
                  {blogComments.map((comment) => (
                    <div key={comment.id} className="ch-comment-card">
                      <p className="ch-comment-text">{comment.comment}</p>
                      <div className="ch-comment-footer">
                        <span className="ch-comment-date">{comment.date}</span>
                        <div className="ch-comment-actions">
                          <button
                            onClick={() => handleEdit(comment)}
                            className="ch-edit-btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="ch-delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {showModal && (
          <div className="ch-modal">
            <div className="ch-modal-content">
              <textarea
                defaultValue={editingComment?.comment}
                onChange={(e) =>
                  setEditingComment({
                    ...editingComment,
                    comment: e.target.value,
                  })
                }
              />
              <div className="ch-modal-actions">
                <button
                  onClick={() =>
                    handleSave(editingComment.id, editingComment.comment)
                  }
                >
                  Save
                </button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="ch-comment-sidebar">
        <div className="ch-search-wrapper">
          <div className="ch-search-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#757575"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="#757575"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search comments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ch-search-input"
          />
        </div>

        <div className="ch-stats-card">
          <h3>Statistics</h3>
          <div className="ch-stat-item">
            <span>Total Comments</span>
            <strong>{stats.totalComments}</strong>
          </div>
          <div className="ch-stat-item">
            <span>Blogs Commented</span>
            <strong>{stats.totalBlogs}</strong>
          </div>
        </div>

        <div className="ch-stats-card">
          <h3>Most Active On</h3>
          {stats.mostCommentedBlog && (
            <div className="ch-active-blog">
              <p>{stats.mostCommentedBlog[0]}</p>
              <span>{stats.mostCommentedBlog[1].length} comments</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentHistory;
