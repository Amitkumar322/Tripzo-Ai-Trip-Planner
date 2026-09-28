import React, { useEffect, useRef } from 'react'
import { gsap } from "gsap";
import "./Style/CustomCursor.css";

export const CustomCursor = () => {
    const dotRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            gsap.to(dotRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            gsap.to(circleRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power3.out",
            })
        }
        window.addEventListener("mousemove", moveCursor)
        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [])

    return (
        <>
            <div
                ref={dotRef}
                className="position-fixed top-0 start-0 rounded-circle bg-dark cursor-dot"></div>
            <div
                ref={circleRef}
                className="position-fixed top-0 start-0 rounded-circle border border-dark cursor-circle"></div>
        </>
    )
}