
import React, { useState } from 'react';

const EditBlogModal = ({ blog, onClose }) => {
  const [formData, setFormData] = useState(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add blog update logic here
    console.log('Updated blog:', formData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Blog</h2>
        <form onSubmit={handleSubmit}>
          {/* Add form fields */}
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;