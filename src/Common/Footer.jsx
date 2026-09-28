import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Style/Footer.css";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef(null);
  const ctaRef = useRef(null);
  const contentRef = useRef(null);
  const bigTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* CTA animation */

      gsap.from(ctaRef.current, {
        y: 80,

        opacity: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: ctaRef.current,

          start: "top 85%",

          toggleActions: "play none none reverse",
        },
      });

      /* Footer content */

      gsap.from(contentRef.current, {
        y: 60,

        opacity: 0,

        duration: 1,

        delay: 0.2,

        ease: "power3.out",

        scrollTrigger: {
          trigger: contentRef.current,

          start: "top 90%",

          toggleActions: "play none none reverse",
        },
      });

      /* Big text */

      gsap.from(bigTextRef.current, {
        y: 100,

        opacity: 0,

        duration: 1.2,

        ease: "power3.out",

        scrollTrigger: {
          trigger: footerRef.current,

          start: "top 80%",

          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="tripzo-footer">
      <div className="container">
        {/*  CTA */}

        <div ref={ctaRef} className="footer-cta text-center">
          <div className="footer-label">START YOUR JOURNEY</div>

          <h2>
            Your next adventure
            <br />
            starts here.
          </h2>

          <p className="footer-description">
            Discover beautiful destinations, unforgettable experiences and
            carefully planned tours with Tripzo.
          </p>

          <Link to="/tours" className="footer-button">
            Explore Tours
            <span>↗</span>
          </Link>
        </div>

        {/* FOOTER CONTENT */}

        <div ref={contentRef} className="footer-content">
          {/* BRAND */}

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              TRIPZO
            </Link>

            <p>
              We create memorable travel experiences that make every journey
              worth remembering.
            </p>
          </div>

          {/* EXPLORE */}

          <div className="footer-column">
            <h6>Explore</h6>

            <Link to="/">Home</Link>

            <Link to="/destination">Destinations</Link>

            <Link to="/tours">Tours</Link>

            <Link to="/contact">Contact</Link>
          </div>

          {/* TOURS */}

          <div className="footer-column">
            <h6>Tours</h6>

            <Link to="/tours">Adventure Tours</Link>

            <Link to="/tours">Family Tours</Link>

            <Link to="/tours">Weekend Trips</Link>

            <Link to="/tours">Luxury Tours</Link>
          </div>

          {/* COMPANY */}

          <div className="footer-column">
            <h6>Company</h6>

            <Link to="/contact">About Us</Link>

            <Link to="/contact">Contact</Link>

            <Link to="/contact">Support</Link>

            <Link to="/contact">Enquiry</Link>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="footer-bottom">
          <p className="mb-0">© 2026 Tripzo. All rights reserved.</p>

          <div>
            <Link to="/">Privacy Policy</Link>

            <Link to="/">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* BIG BACKGROUND TEXT */}

      <div ref={bigTextRef} className="footer-big-text">
        TRIPZO
      </div>
    </footer>
  );
};
