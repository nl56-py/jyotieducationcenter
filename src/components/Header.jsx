"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppLink } from "./AppLink.jsx";
import { assets } from "../data/assets.js";
import { navItems } from "../data/site.js";
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import "../styles/frontend.css";


export function Header({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const active = (target) => {
    if (target === "/") return pathname === "/";
    return pathname.startsWith(target);
  };

  return (
    <header className="site-header">
      <style>{`
        .site-header .nav-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 42px;
          padding: 0 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 700;
          color: #26344d;
          overflow: hidden;
          background: transparent !important;
          transition: color 0.25s ease;
        }

        .site-header .nav-item span.nav-item-label {
          position: relative;
          display: inline-block;
        }

        .site-header .nav-item span.nav-item-label::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: -4px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--red), var(--purple));
          transition: right 0.35s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .site-header .nav-item:hover,
        .site-header .nav-item-active {
          color: var(--red);
          background: transparent !important;
        }

        .site-header .nav-item:hover span.nav-item-label::after,
        .site-header .nav-item-active span.nav-item-label::after {
          right: 0;
        }

        .site-header .book-now-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 42px;
          padding: 0 18px 0 20px;
          border-radius: 999px;
          border: none;
          font-size: 14px;
          font-weight: 800;
          color: var(--white);
          text-decoration: none;
          background: linear-gradient(135deg, var(--red), var(--purple));
          box-shadow: 0 10px 24px rgba(233, 38, 45, 0.28);
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .site-header .book-now-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: rgba(255, 255, 255, 0.35);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }

        .site-header .book-now-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(233, 38, 45, 0.36);
        }

        .site-header .book-now-button:hover::before {
          left: 130%;
        }

        .site-header .book-now-button .book-now-arrow {
          transition: transform 0.25s ease;
        }

        .site-header .book-now-button:hover .book-now-arrow {
          transform: translateX(3px);
        }

        /* ---- Dropdown ---- */
        .site-header .nav-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .site-header .nav-dropdown-bridge {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          min-width: 260px;
          height: 16px;
          z-index: 99;
        }

        .site-header .nav-menu {
          display: flex !important;
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translate(-50%, 8px);
          width: 280px;
          background: var(--white);
          border-radius: 14px;
          box-shadow: 0 20px 45px rgba(8, 31, 61, 0.16), 0 2px 8px rgba(8, 31, 61, 0.06);
          padding: 10px;
          z-index: 100;
          flex-direction: column;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.34, 1.4, 0.64, 1), visibility 0.22s ease;
          overflow: hidden;
          border: none !important;
        }

        .site-header .nav-menu::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--red), var(--purple));
        }

        .site-header .nav-group:hover .nav-menu,
        .site-header .nav-group:focus-within .nav-menu {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }

        .site-header .nav-subitem {
          display: flex !important;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin: 1px 0;
          padding: 11px 14px;
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
          border-radius: 9px;
          text-decoration: none;
          background: transparent !important;
          transition: background 0.18s ease, color 0.18s ease, padding-left 0.18s ease;
        }

        .site-header .nav-subitem .nav-subitem-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.18s ease, transform 0.18s ease;
          flex-shrink: 0;
        }

        .site-header .nav-subitem:hover {
          background: linear-gradient(90deg, rgba(91, 23, 125, 0.07), rgba(8, 168, 215, 0.05)) !important;
          color: var(--purple);
          padding-left: 18px;
        }

        .site-header .nav-subitem:hover .nav-subitem-arrow {
          opacity: 1;
          transform: translateX(0);
          color: var(--purple);
        }

        .site-header .nav-chevron {
          opacity: 0.7;
          transition: transform 0.2s ease;
        }

        .site-header .nav-group:hover .nav-chevron {
          transform: rotate(180deg);
          opacity: 1;
        }
      `}</style>
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