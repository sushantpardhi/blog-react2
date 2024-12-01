
import React from 'react';

const BlogDetailsModal = ({ blog, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Blog Details</h2>
        <div className="blog-details">
          <p><strong>Title:</strong> {blog.name}</p>
          <p><strong>Status:</strong> {blog.status}</p>
          <p><strong>Author:</strong> {blog.email}</p>
          {/* Add more blog details */}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BlogDetailsModal;