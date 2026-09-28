import React from "react";
import { useParams, Link } from "react-router-dom";
import { destinations } from "../data/Destination.js";
import { Errorpage } from "../Pages/Errorpage.jsx";

export const DestinationDetails = () => {
  const { slug } = useParams();

  // This is the WordPress "single post by slug" equivalent
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return <Errorpage />;
  }

  const { name, location, image, shortDescription, bestTime, duration, category } = destination;

  // Related: same category, excluding itself
  const related = destinations
    .filter((d) => d.category === category && d.slug !== slug)
    .slice(0, 4);

  return (
    <section className="container section-padding">
      {/* Hero */}
      <div className="destination-hero mb-5">
        <img src={image} alt={name} className="destination-hero-img" />
        <div className="destination-hero-overlay">
          <span className="destination-hero-badge">{category}</span>
          <h1 className="destination-hero-title">{name}</h1>
          <p className="destination-hero-location">{location}</p>
        </div>
      </div>

      {/* Content */}
      <div className="row g-5">
        <div className="col-md-8">
          <h3 className="mb-3">About {name}</h3>
          <p className="destination-details-desc">{shortDescription}</p>

          {/* Placeholder for richer content — add a `longDescription`,
              `gallery`, or `itinerary` field to Destination.js when ready */}
        </div>

        <div className="col-md-4">
          <div className="destination-info-card">
            <div className="info-row">
              <span className="info-label">Best Time</span>
              <span className="info-value">{bestTime}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Duration</span>
              <span className="info-value">{duration}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Category</span>
              <span className="info-value">{category}</span>
            </div>

            <Link to="/booknow" className="btn-book-now w-100 text-center d-block mt-4">
              Book This Tour
            </Link>
          </div>
        </div>
      </div>

      {/* Related destinations */}
      {related.length > 0 && (
        <div className="mt-5 pt-5">
          <h3 className="mb-4">You Might Also Like</h3>
          <div className="row g-4">
            {related.map((dest) => (
              <div className="col-12 col-sm-6 col-lg-3" key={dest.id}>
                <Link to={`/destination/${dest.slug}`} className="tour-card-link">
                  <div className="tour-card">
                    <div className="tour-card-img-wrap">
                      <img src={dest.image} alt={dest.name} className="tour-card-img" />
                    </div>
                    <div className="tour-card-body">
                      <h5 className="tour-card-title">{dest.name}</h5>
                      <p className="tour-card-location">{dest.location}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};