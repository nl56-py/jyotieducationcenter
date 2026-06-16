"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        const handleMouseEnter = () => setHover(true);
        const handleMouseLeave = () => setHover(false);

        window.addEventListener("mousemove", moveCursor);

        const targets = document.querySelectorAll(
            "a, button, .sidebar-item, .nav-item"
        );

        targets.forEach((item) => {
            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);

            targets.forEach((item) => {
                item.removeEventListener("mouseenter", handleMouseEnter);
                item.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    return (
        <div
            className={`custom-cursor ${hover ? "hover" : ""}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        />
    );
}