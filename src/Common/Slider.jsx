import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Style/Slider.css"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Sliderdata } from "../data/Sliderdata.js";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import { Button } from "./Button.jsx";

export const Slider = () => {
  const progressRef = useRef(null);

  // Wraps each word of the heading in a span so we can stagger them in
  const splitWords = (text) =>
    text.split(" ").map((word, i) => (
      <span className="word-wrap" key={i}>
        <span className="word">{word}&nbsp;</span>
      </span>
    ));

  const animateSlide = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const words = activeSlide.querySelectorAll(".word");
    const eyebrow = activeSlide.querySelector(".slide-eyebrow");
    const description = activeSlide.querySelector(".slide-description");
    const button = activeSlide.querySelector(".slide-button");
    const imageWrap = activeSlide.querySelector(".slide-image-wrap");
    const image = activeSlide.querySelector(".slide-image");

    const targets = [eyebrow, ...words, description, button, imageWrap, image].filter(Boolean);
    if (targets.length === 0) return;

    gsap.killTweensOf(targets);

    // Initial state
    gsap.set(words, { yPercent: 120, opacity: 0 });
    gsap.set([eyebrow, description, button], { opacity: 0, y: 24 });
    gsap.set(imageWrap, { clipPath: "inset(0% 100% 0% 0%)" });
    gsap.set(image, { scale: 1.25 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (eyebrow) {
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 });
    }

    if (words.length) {
      tl.to(
        words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
        },
        "-=0.25"
      );
    }

    if (description) {
      tl.to(description, { opacity: 1, y: 0, duration: 0.6 }, "-=0.55");
    }

    if (button) {
      tl.to(button, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
    }

    if (imageWrap) {
      tl.to(
        imageWrap,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "expo.inOut",
        },
        "-=0.9"
      );
    }

    if (image) {
      tl.to(
        image,
        { scale: 1, duration: 1.4, ease: "power3.out" },
        "-=1.1"
      );
    }
  };

  // Drives the autoplay progress bar in sync with Swiper's own timer
  const handleAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1 - progress,
        duration: 0.25,
        ease: "none",
      });
    }
  };

  // Gentle parallax tilt on the image, following the pointer
  const handleMouseMove = (e) => {
    const wrap = e.currentTarget;
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(wrap, {
      rotateY: x * 6,
      rotateX: y * -6,
      duration: 0.6,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <div className="slider-shell position-relative">
      <Swiper
        slidesPerView={1}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onAutoplayTimeLeft={handleAutoplayTimeLeft}
        onInit={(swiper) => animateSlide(swiper)}
        onSlideChange={(swiper) => animateSlide(swiper)}
        style={{
          "--swiper-pagination-color": "#ffc107",
          "--swiper-pagination-bullet-inactive-opacity": "0.4",
        }}
      >
        {Sliderdata.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="container section-padding">
              <div className="row align-items-center">
                {/* Content */}
                <div className="col-md-6">
                  <span className="slide-eyebrow">{slide.tag || "Featured Tour"}</span>

                  <h2 className="slide-heading" style={{ fontSize: "5rem" }}>
                    {splitWords(slide.title)}
                  </h2>

                  <p className="slide-description">{slide.description}</p>

                  <div className="slide-button">
                    <Button link={"/"} text={"Explore Tours ↗"} />
                  </div>
                </div>

                {/* Image */}
                <div className="col-md-6">
                  <div
                    className="slide-image-wrap"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="img-fluid rounded-5 slide-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Autoplay progress bar */}
      <div className="autoplay-progress">
        <div ref={progressRef} className="autoplay-progress-bar"></div>
      </div>
    </div>
  );
};