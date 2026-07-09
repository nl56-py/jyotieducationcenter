"use client";

import React from "react";
import Link from "next/link";

export function Logo({ isFooter = false }) {
  return (
    <Link href="/" className="edumark-logo-link">
      {/* Icon from apple-touch-icon.png */}
      <img
        src="/favicon/apple-touch-icon.png"
        alt="EduMark Icon"
        className="edumark-logo-icon"
      />
      
      {/* Text block */}
      <div className="edumark-logo-text">
        {/* EduMark */}
        <span className="edumark-logo-title">
          EduMark
        </span>
        
        {/* Red separator line */}
        <div className="edumark-logo-line" />
        
        {/* Tagline */}
        <span className="edumark-logo-tagline">
          Multi Destination Study Abroad and VISA Services
        </span>
      </div>
    </Link>
  );
}
