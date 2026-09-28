import React from "react";
import { Link } from "react-router-dom";
import { destinations } from "../data/Destination.js";
import { TourCard } from "./TourCard.jsx";

export const Destinations = () => {
  // Only featured ones, capped at 4 for the home row
  const featured = destinations.filter((d) => d.featured).slice(0, 4);

  return (
    <section className="container section-padding">
      <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
        <div>
          <h2 className="mb-1">Popular Destinations</h2>
          <p className="text-muted mb-0">Handpicked places our travelers love the most</p>
        </div>
        <Link to="/destination" className="btn-view-all">
          View All Destinations ↗
        </Link>
      </div>

      <div className="row g-4 tour-card-row">
        {featured.map((dest) => (
          <div className="col-12 col-sm-6 col-lg-3" key={dest.id}>
            <TourCard destination={dest} />
          </div>
        ))}
      </div>
    </section>
  );
};