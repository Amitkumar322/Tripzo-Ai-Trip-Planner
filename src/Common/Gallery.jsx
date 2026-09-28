import React from "react";
import gallery1 from "../assets/Images/gallery1.png";
import gallery2 from "../assets/Images/gallery2.jpg";
import gallery3 from "../assets/Images/gallery3.jpg";
import gallery4 from "../assets/Images/gallery4.jpg";
import gallery5 from "../assets/Images/gallery5.jpg";
import gallery6 from "../assets/Images/gallery6.jpg";
import gallery7 from "../assets/Images/gallery7.jpg";
import "./Style/Gallery.css"
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Static data outside the component so it isn't recreated on every render
const columns = [
  {
    key: "col-1",
    images: [{ src: gallery6, className: "gl1" }],
  },
  {
    key: "col-2",
    images: [
      { src: gallery3, className: "gl3" },
      { src: gallery2, className: "gl4" },
      { src: gallery1, className: "gl2" },
    ],
  },
  {
    key: "col-3",
    images: [
      { src: gallery5, className: "gl5" },
      { src: gallery4, className: "gl6" },
    ],
  },
];

export const Gallery = () => {
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Respect prefers-reduced-motion; only build the heavier reveal for users who want motion
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const images = gsap.utils.toArray(".gallery-img");
        if (images.length === 0) return;

        gsap.set(images, { willChange: "transform, opacity" });

        // batch() gives each image its own trigger instead of one shared
        // trigger for the whole section — images animate in as THEY enter
        // view rather than all at once when the section top crosses 70%,
        // which reads better on tall galleries and avoids animating
        // off-screen images unnecessarily.
        ScrollTrigger.batch(images, {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out",
              overwrite: true,
            }),
          onEnterBack: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            }),
        });

        gsap.set(images, { y: 80, opacity: 0, scale: 0.92 });
      });

      // Reduced-motion users just see the images, no transform/opacity animation
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".gallery-img", { clearProps: "all" });
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={galleryRef} className="container mt-5 section-padding">
      <div className="row g-3">
        {columns.slice(0, 2).map((col) => (
          <div className="col-12 col-md-4" key={col.key}>
            {col.images.map((img, i) => (
              <img
                key={img.className}
                src={img.src}
                alt="Tour destination highlight"
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className={`img-fluid w-100 rounded-3 gallery-img ${img.className} ${
                  i > 0 ? "mt-3" : ""
                }`}
              />
            ))}
          </div>
        ))}

        {/* Right Column */}
        <div className="col-12 col-md-4">
          {columns[2].images.map((img, i) => (
            <img
              key={img.className}
              src={img.src}
              alt="Tour destination highlight"
              width={480}
              height={360}
              loading="lazy"
              decoding="async"
              className={`img-fluid w-100 rounded-3 gallery-img ${img.className} ${
                i > 0 ? "mt-3" : ""
              }`}
            />
          ))}

          <div className="explore-box w-100 mt-3 p-4 rounded-4 bg-black position-relative overflow-hidden">
            <div className="explore-glow explore-glow--lg" />
            <div className="explore-glow explore-glow--sm" />

            <div className="position-relative">
              <h2 className="text-white mb-4 fw-semibold">
                Explore More <br />
                <span className="text-white-50">Happiness</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};