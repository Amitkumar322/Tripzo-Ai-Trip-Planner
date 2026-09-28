import React, { useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Style/Testimonials.css"
import { Pagination, Autoplay } from "swiper/modules";
import { testimonials } from "../data/Testimonial.js";
import { gsap } from "gsap";

import groupimg from "../assets/Images/group.png";

const Stars = ({ rating = 5 }) => (
  <div className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? "star star--filled" : "star"}>
        ★
      </span>
    ))}
  </div>
);

export const Testimonials = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const animateSlide = () => {
      const activeSlide = swiper.slides[swiper.activeIndex];
      if (!activeSlide) return;

      const image = activeSlide.querySelector(".testimonial-image");
      const content = activeSlide.querySelectorAll(".testimonial-content");

      if (!image && content.length === 0) return;

      if (image) gsap.killTweensOf(image);
      if (content.length > 0) gsap.killTweensOf(content);

      if (image) gsap.set(image, { opacity: 0, scale: 1.1 });
      if (content.length > 0) gsap.set(content, { opacity: 0, y: 30 });

      const tl = gsap.timeline();

      if (image) {
        tl.to(image, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (content.length > 0) {
        tl.to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    };

    const initialTimer = setTimeout(animateSlide, 100);
    swiper.on("slideChangeTransitionStart", animateSlide);

    return () => {
      clearTimeout(initialTimer);
      swiper.off("slideChangeTransitionStart", animateSlide);
    };
  }, []);

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      slidesPerView={1}
      loop={true}
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      style={{
        "--swiper-pagination-color": "#ffc107",
        "--swiper-pagination-bullet-inactive-color": "#ffffff",
        "--swiper-pagination-bullet-inactive-opacity": "0.4",
      }}
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <div className="section-padding bg-black rounded-5">
            <div className="row align-items-center g-4">
              {/* Trust stat */}
              <div className="col-md-4 col-12 text-center">
                <h3 className="trust-number text-white">10M+</h3>
                <p className="text-white-50 mb-4">Trusted clients / happy clients</p>
                <img
                  src={groupimg}
                  alt="Trusted clients"
                  className="img-fluid mx-auto d-block"
                />
              </div>

              {/* Testimonial */}
              <div className="col-md-6 col-12 offset-md-1">
                <div className="testimonial-card position-relative overflow-hidden">
                  <div className="testimonial-glow testimonial-glow--lg" />
                  <div className="testimonial-glow testimonial-glow--sm" />

                  <div className="position-relative">
                    <span className="testimonial-quote-mark">&ldquo;</span>

                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-image"
                    />

                    <p className="testimonial-content testimonial-text">
                      {testimonial.text}
                    </p>

                    <div className="testimonial-content">
                      <Stars rating={testimonial.rating} />
                    </div>

                    <p className="testimonial-content testimonial-author">
                      {testimonial.name}
                      <span className="testimonial-location">
                        {testimonial.location}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};