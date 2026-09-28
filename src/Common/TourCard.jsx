import React from "react";
import { Link } from "react-router-dom";
export const TourCard = ({ destination }) => {
  const { slug, name, location, image, shortDescription, duration, category } = destination;

  return (
    <Link to={`/destination/${slug}`} className="tour-card-link">
      <div className="tour-card">
        <div className="tour-card-img-wrap">
          <img src={image} alt={name} className="tour-card-img" loading="lazy" />
          <span className="tour-card-badge">{category}</span>
        </div>

        <div className="tour-card-body">
          <h5 className="tour-card-title">{name}</h5>
          <p className="tour-card-location">{location}</p>
          <p className="tour-card-desc">{shortDescription}</p>

          <div className="tour-card-meta">
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};