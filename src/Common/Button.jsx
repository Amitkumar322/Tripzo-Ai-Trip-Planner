import './Style/Button.css'
import { gsap } from 'gsap'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

export const Button = ({ text, link }) => {
    const btnRef = useRef(null);

    const handleMouseEnter = () => {
        if (!btnRef.current) return; // safety check
        gsap.to(btnRef.current, {
            backgroundColor: "#e6b566",
            color: "#111",
            duration: 0.4,
            ease: "power2.out",
        })
    }

    const handleMouseLeave = () => {
        if (!btnRef.current) return;
        gsap.to(btnRef.current, {
            backgroundColor: "#0f3d3e",
            color: "#fff",
            duration: 0.4,
            ease: "power2.out",
        })
    }

    return (
        <Link
            ref={btnRef}
            to={link}
            className='btn-tripzo'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {text}
        </Link>
    )
}