import React, { useState, useMemo } from "react";
import { destinations } from "../data/Destination.js";
import { TourCard } from "../Common/TourCard.jsx";

export const Destination = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(destinations.map((d) => d.category))],
    []
  );

  const filtered = useMemo(() => {
    if (activeCategory === "All") return destinations;
    return destinations.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="container section-padding">
      <div className="text-center mb-5">
        <h2>All Destinations</h2>
        <p className="text-muted">Explore every destination we offer, from mountains to beaches</p>
      </div>

      {/* Category filter */}
      <div className="d-flex justify-content-center gap-2 flex-wrap mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${activeCategory === cat ? "category-pill--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filtered.map((dest) => (
          <div className="col-12 col-sm-6 col-lg-3" key={dest.id}>
            <TourCard destination={dest} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted mt-5">No destinations found in this category.</p>
      )}
    </section>
  );
};