import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "./Style/Header.css";

export const Header = () => {

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {

    const ctx = gsap.context(() => {

      const tl = gsap.timeline();

      tl.from(headerRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })

      .from(
        logoRef.current,
        {
          x: -30,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        },
        "-=0.4"
      )

      .from(
        menuRef.current.children,
        {
          y: -15,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "power2.out"
        },
        "-=0.3"
      )

      .from(
        buttonRef.current,
        {
          x: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        },
        "-=0.4"
      );

    }, headerRef);

    return () => ctx.revert();

  }, []);

  return (

    <header
      ref={headerRef}
      className="tripzo-header position-fixed top-0 start-0 w-100"
    >

      <div className="container">

        <nav className="tripzo-nav navbar navbar-expand-lg">

          {/* LOGO */}

          <Link
            ref={logoRef}
            to="/"
            className="tripzo-logo navbar-brand"
          >
            TRIPZO
          </Link>


          {/* MOBILE BUTTON */}

          <button
            className="navbar-toggler tripzo-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#tripzoNavbar"
            aria-controls="tripzoNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>


          {/* MENU */}

          <div
            className="collapse navbar-collapse"
            id="tripzoNavbar"
          >

            <ul
              ref={menuRef}
              className="navbar-nav mx-auto gap-lg-4 tripzo-menu"
            >

              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/destination"
                  className="nav-link"
                >
                  Destinations
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/tours"
                  className="nav-link"
                >
                  Tours
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link"
                >
                  Contact
                </Link>
              </li>

            </ul>


            {/* CTA */}

            <Link
              ref={buttonRef}
              to="/tours"
              className="tripzo-header-btn"
            >
              Explore Tours

              <span>↗</span>

            </Link>

          </div>

        </nav>

      </div>

    </header>

  );
};

