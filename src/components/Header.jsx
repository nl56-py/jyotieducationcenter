"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppLink } from "./AppLink.jsx";
import { assets } from "../data/assets.js";
import { site, navItems } from "../data/site.js";

export function Header({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const active = (target) => {
    if (target === "/") return pathname === "/";
    return pathname.startsWith(target);
  };

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="top-strip-inner">
          <span>{site.address}</span>
          <span>{site.phone}</span>
          <span>{site.hours}</span>
          <span>Ministry Approved | TITI Certified | ECAN Member</span>
        </div>
      </div>

      <div className="nav-shell">
        <Link href="/" className="brand" style={{ display: "flex", textDecoration: "none" }}>
          <img src={assets.logo} alt="EduMark logo" />
          <span>
            <strong>EduMark</strong>
            <small>Education Consultancy</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <div className="nav-group" key={item.path}>
              <AppLink
                to={item.path}
                className={active(item.path) ? "nav-item nav-item-active" : "nav-item"}
              >
                {item.label}
              </AppLink>
            </div>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="search-button" type="button" onClick={onSearch}>
            Search
          </button>
          <AppLink to="/book-free-consultation" className="primary-button compact">
            Book Free Consultation
          </AppLink>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-panel">
          {navItems.map((item) => (
            <div className="mobile-group" key={item.path}>
              <AppLink
                to={item.path}
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </AppLink>
            </div>
          ))}
          <AppLink
            to="/book-free-consultation"
            className="primary-button full"
            onClick={() => setMenuOpen(false)}
          >
            Book Free Consultation
          </AppLink>
        </div>
      ) : null}
    </header>
  );
}
