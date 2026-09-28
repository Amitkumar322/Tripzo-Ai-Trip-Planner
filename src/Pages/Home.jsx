import React from "react";
import "./Styling/Home.css";
import groupimg from "../assets/Images/group.png";
import gallery from "../assets/Images/gallery4.jpg";

import { Slider } from "../Common/Slider";
import { Testimonials } from "../Common/Testimonials";
import { Gallery } from "../Common/Gallery";
import { Button } from "../Common/Button";
import { Benefits } from "../Common/Benefits";
import { Destinations } from '../Common/Destinations';

export const Home = () => {
  return (
    <>
      {" "}
      {/* Hero / Slider */}
      <section className="container text-center">
        <div className="row">
          <div className="col-12">
            <Slider />
          </div>
        </div>
      </section>

      {/* Main Banner */}
      <section className="container mt-5">
        <div className="row">
          <div className="col-12">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <Gallery />

      {/* banner section */}
       <section>
        <Benefits/>
      </section>
      
      {/* About company section */}
      <section className="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6 left-text">
              <h2>
                Passionate about your{" "}
                <span style={{ color: "#e6b566" }}>
                  {" "}
                  adventures with TRIPZO
                </span>
              </h2>
              <p>We are started with 2005s, 20+ years of experience</p>
            </div>
            <div className="col-md-6">
              <img src={gallery} alt="error" className="rounded-5 img-fluid w-100 h-100 object-fit-cover" />
            </div>

          {/* about-sec-2 */}

            <div className="row mt-5">
              <div className="col-md-6">
              <img src={gallery} alt="error" className="rounded-5 img-fluid w-100 h-100 object-fit-cover" />
            </div>
              <div className="col-md-6 right-text">
                <h2>
                  <span style={{ color: "#e6b566" }}>
                    Passionate about your{" "}
                  </span>{" "}
                  adventures with TRIPZO
                </h2>
                <p>
                  We believe travel is more than just a trip—it’s an experience
                  that shapes your life. Our mission is to create unforgettable
                  journeys that combine adventure, comfort, and authentic
                  cultural encounters.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="">
                      <li>Destination Search & Filters</li>
                      <li>Blog & Travel Guides</li>
                      <li>Pricing & Discounts</li>
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <ul>
                      <li>Online Booking System</li>
                      <li>Live Chat Support</li>
                      <li>Reviews & Ratings</li>
                    </ul>
                  </div>
                </div>

                <Button link="#" text="Explore More ↗" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Destinations/>
    
    </>
  );
};
