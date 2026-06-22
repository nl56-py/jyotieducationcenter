"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppLink } from "./AppLink.jsx";
import { assets } from "../data/assets.js";
import { navItems } from "../data/site.js";
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";

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
          <img src={assets.logo} alt="EduMark logo"
            style={{
              height: "56px",
              width: "auto",
              transition: ".3s"
            }}

            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }} />
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
                <span className="nav-item-label">{item.label}</span>
                {item.children ? <ChevronDown size={14} className="nav-chevron" /> : null}
              </AppLink>
              {item.children ? (
                <>
                  <div className="nav-dropdown-bridge" />
                  <div className="nav-menu">
                    {item.children.map((child) => (
                      <AppLink key={child.path} to={child.path} className="nav-subitem">
                        <span>{child.label}</span>
                        <ArrowUpRight size={14} className="nav-subitem-arrow" />
                      </AppLink>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="nav-actions">
          <AppLink to="/book-free-consultation" className="book-now-button">
            Book Now
            <ArrowRight size={15} className="book-now-arrow" />
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
              {item.children
                ? item.children.map((child) => (
                  <AppLink
                    key={child.path}
                    to={child.path}
                    className="mobile-link mobile-sublink"
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                  </AppLink>
                ))
                : null}
            </div>
          ))}
          <AppLink
            to="/book-free-consultation"
            className="book-now-button full"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
            <ArrowRight size={15} className="book-now-arrow" />
          </AppLink>
        </div>
      ) : null}
    </header>
  );
}