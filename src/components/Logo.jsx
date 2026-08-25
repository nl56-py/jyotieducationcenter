"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "../data/siteConfig";

export function Logo({ isFooter = false }) {
  return (
    <Link href="/" className="edumark-logo-link" style={{ textDecoration: "none" }}>
      {/* Official JEC Logo Icon */}
      <img
        src="/images/brand/jec.jpeg"
        alt="Jyoti Education Corner Logo"
        className="edumark-logo-icon"
        style={{ objectFit: "contain", borderRadius: "6px" }}
      />
      
      {/* Text block */}
      <div className="edumark-logo-text">
        <span className="edumark-logo-title">
          {siteConfig.brandName}
        </span>
        
        {/* Red separator line */}
        <div className="edumark-logo-line" />
        
        {/* Tagline */}
        <span className="edumark-logo-tagline">
          {siteConfig.tagline}
        </span>
      </div>
    </Link>
  );
}
