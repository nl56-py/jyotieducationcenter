"use client";

import React from "react";
import Link from "next/link";

export function Logo({ isFooter = false }) {
  return (
    <Link href="/" className="edumark-logo-link" style={{ textDecoration: "none" }}>
      {/* Official JEC Logo Icon */}
      <img
        src="/images/brand/jec.jpeg"
        alt="Jyoti Education Corner"
        className="edumark-logo-icon"
        style={{
          height: isFooter ? "68px" : "62px",
          width: "auto",
          maxWidth: "180px",
          objectFit: "contain",
          borderRadius: "6px",
          display: "block",
          transition: "transform 0.25s ease",
        }}
      />
    </Link>
  );
}
