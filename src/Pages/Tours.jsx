import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Styling/Tour.css';
import { toursData } from '../data/Tourdata.js'
import { AIItinerary } from '../Common/AIItinerary.jsx'; 

const tourCategories = ["All", "Adventure", "Beach", "Cultural", "Family", "Luxury"];

export const Tours = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [customForm, setCustomForm] = useState({
    destination: "",
    travelDates: "",
    travellers: "",
    tourType: "",
    budget: "",
    requirements: "",
  });

  // ASYNC DATA FLOW: teen states chahiye —
  // result (AI se jo aaya), loading (button dabne se lekar response aane tak), error (agar kuch fail ho)
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const filteredTours = activeCategory === "All" ? toursData : toursData.filter((tour) => tour.category === activeCategory);

  const handleCustomFormChange = (e) => {
    const { name, value } = e.target;
    setCustomForm((prev) => ({ ...prev, [name]: value }));
  };

  //Ye function serverless function ko call karta hai
  const handleGenerateItinerary = async () => {
    if (!customForm.destination || !customForm.travellers) {
      setAiError("Please fill at least Destination and Travellers.");
      return;
    }

    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setAiResult(data);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <div className="container section-padding">
        {/* Page Heading */}
        <section>
          <div className="text-center mb-5">
            <h2 >Explore Our Tours</h2>
            <p className="text-muted">Find a Journey That Feels Like Yours</p>
          </div>
        </section>

        {/* Banner / What We Offer */}
        <section>
          <div className="container banner-sec rounded-5">
            <div className="row">
              <div className="col-md-6">
                <div className="text-left m-5 ">
                  <h2 className="text-white ban-sec-h">What We Offer</h2>
                </div>
              </div>
              <div className="col-md-6">
                 <p className="text-white w-75 m-5 ">
                    From adventurous escapes to relaxing beach holidays,
                    cultural journeys and luxury getaways, Tripzo offers
                    thoughtfully planned tours for every kind of traveller.
                    From adventurous escapes to relaxing beach holidays,
                    cultural journeys and luxury getaways, Tripzo offers
                    thoughtfully planned tours for every kind of traveller.
                    From adventurous escapes to relaxing beach holidays,
                    cultural journeys and luxury getaways, Tripzo offers
                    thoughtfully planned tours for every kind of traveller.
                  </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Tours We Offer / Experience Section */}
        <section className="offer-details-sec section-padding">
          <div className="text-center mb-5 ">
            <h3>What Our Tours Include</h3>
            <p className="text-muted">Everything planned, so you can just enjoy the journey</p>
          </div>
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="offer-card text-center">
                <h5>Handpicked Stays</h5>
                <p className="text-muted small">Comfortable, verified hotels and resorts</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="offer-card text-center">
                <h5>Guided Experiences</h5>
                <p className="text-muted small">Local experts for every destination</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="offer-card text-center">
                <h5>Flexible Itineraries</h5>
                <p className="text-muted small">Tours built around how you want to travel</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="offer-card text-center">
                <h5>24/7 Support</h5>
                <p className="text-muted small">We're with you before and during the trip</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="filter-sec section-padding">
          <div className="text-center mb-4 filter-btn-group">
            {tourCategories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tour Cards */}
          <div className="row g-4">
            {filteredTours.map((tour) => (
              <div className="col-md-4 col-sm-6" key={tour.id}>
                <div className="tour-card h-100">
                  <div className="tour-card-img">
                    <img src={tour.image} alt={tour.destination} className="img-fluid" />
                    <span className="tour-category-badge">{tour.category}</span>
                  </div>
                  <div className="tour-card-body">
                    <h5>{tour.destination}</h5>
                    <p className="tour-duration text-muted mb-1">{tour.duration}</p>
                    <p className="tour-desc">{tour.description}</p>
                    <ul className="tour-inclusions">
                      {tour.inclusions.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <div className="tour-card-footer d-flex justify-content-between align-items-center">
                      <span className="tour-price">{tour.price}</span>
                      <button className="btn btn-tour-book">Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <p className="text-center text-muted mt-4">No tours found in this category.</p>
          )}
        </section>

        {/* Customized Tour Section */}
        <section className="custom-tour-sec section-padding">
          <div className="text-center mb-4">
            <h3>Can't Find What You're Looking For?</h3>
            <p className="text-muted">Build a tour customized entirely around you</p>
          </div>

          <div className="custom-tour-form">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Destination</label>
                <input
                  type="text"
                  name="destination"
                  className="form-control"
                  placeholder="Where do you want to go?"
                  value={customForm.destination}
                  onChange={handleCustomFormChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Travel Dates</label>
                <input
                  type="text"
                  name="travelDates"
                  className="form-control"
                  placeholder="e.g. 12 - 18 Dec"
                  value={customForm.travelDates}
                  onChange={handleCustomFormChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Travellers</label>
                <input
                  type="number"
                  name="travellers"
                  className="form-control"
                  placeholder="No. of travellers"
                  value={customForm.travellers}
                  onChange={handleCustomFormChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Tour Type</label>
                <select
                  name="tourType"
                  className="form-select"
                  value={customForm.tourType}
                  onChange={handleCustomFormChange}
                >
                  <option value="">Select type</option>
                  {tourCategories
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Budget</label>
                <input
                  type="text"
                  name="budget"
                  className="form-control"
                  placeholder="Approx. budget"
                  value={customForm.budget}
                  onChange={handleCustomFormChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Requirements</label>
                <textarea
                  name="requirements"
                  className="form-control"
                  rows="3"
                  placeholder="Anything specific you'd like us to include?"
                  value={customForm.requirements}
                  onChange={handleCustomFormChange}
                ></textarea>
              </div>
              <div className="col-12 text-center mt-3 d-flex gap-2 justify-content-center flex-wrap">
                <button
                  type="button"
                  className="btn btn-custom-tour"
                  onClick={handleGenerateItinerary}
                  disabled={aiLoading}
                >
                  {aiLoading ? "Generating..." : "Generate AI Itinerary"}
                </button>
                <Link to="/contact" className="btn btn-custom-tour">
                  Create My Custom Tour
                </Link>
              </div>

              {aiError && (
                <div className="col-12 text-center text-danger mt-2">{aiError}</div>
              )}
            </div>
          </div>

          {/* 📌 Result yahan render hota hai, jab aiResult mil jaaye */}
          <AIItinerary result={aiResult} />
        </section>
      </div>
    </>
  );
};