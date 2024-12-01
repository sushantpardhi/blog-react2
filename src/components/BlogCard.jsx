import React from "react";
import "./BlogCard.css";

const trimExcerpt = (text, wordLimit = 50) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const BlogCard = ({
  image,
  title,
  excerpt,
  date,
  author,
  status = "Draft",
  categories = ["General"],
}) => {
  return (
    <div className="blog-card">
      <div className="blog-card__image">
        <img src={image} alt={title} />
        {status && (
          <span
            className={`blog-card__status blog-card__status--${status.toLowerCase()}`}
          >
            {status}
          </span>
        )}
      </div>
      <div className="blog-card__content">
        <div className="blog-card__categories">
          {categories.map((category, index) => (
            <span key={index} className="blog-card__category">
              {category}
            </span>
          ))}
        </div>
        <h3 className="blog-card__title">{title}</h3>
        <p className="blog-card__excerpt">{trimExcerpt(excerpt)}</p>
        <div className="blog-card__meta">
          <span className="blog-card__date">{date}</span>
          <span className="blog-card__author">By {author}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
