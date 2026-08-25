"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppLink } from "./AppLink.jsx";
import { assets } from "../data/assets.js";
import "../styles/frontend.css";

import { navItems, site } from "../data/site.js";
import { ChevronDown, ArrowRight, ArrowUpRight, Menu, X, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo.jsx";

// Use customized brand logo component
const USE_CUSTOM_LOGO = true;

export function Header({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [banner, setBanner] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    fetch("/api/public/homepage-popup", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (active && data?.popup) {
          setBanner(data.popup);
        }
      })
      .catch((err) => console.warn("Failed to fetch announcement banner:", err));
    return () => {
      active = false;
    };
  }, []);

  const active = (target) => {
    if (target === "/") return pathname === "/";
    return pathname.startsWith(target);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress indicator bar */}
      <div 
        className="scroll-progress-indicator" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Dynamic Announcement Banner */}
      <div style={{
        background: "linear-gradient(90deg, #17156f, #b91c1c)",
        color: "#ffffff",
        padding: "8px 16px",
        fontSize: "13px",
        fontWeight: "600",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
        position: "relative",
        zIndex: 1000
      }}>
        {banner ? (
          <>
            <span>📢 {banner.title}</span>
            {banner.cta_label && banner.cta_href && (
              <Link href={banner.cta_href} style={{
                color: "#06b6d4",
                textDecoration: "underline",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center"
              }}>
                {banner.cta_label} <ArrowRight size={13} style={{ marginLeft: "4px", display: "inline-block" }} />
              </Link>
            )}
          </>
        ) : (
          <>
            <span>📢 Applications are now open for upcoming academic intakes!</span>
            <Link href="/book-free-consultation" style={{
              color: "#06b6d4",
              textDecoration: "underline",
              fontWeight: "700",
              display: "inline-flex",
              alignItems: "center"
            }}>
              Book Free Counseling Now <ArrowRight size={13} style={{ marginLeft: "4px", display: "inline-block" }} />
            </Link>
          </>
        )}
      </div>

      <header className="site-header">
        {/* Top bar with contact info and accreditation */}
        <div className="top-strip">
          <div className="top-strip-inner">
            <div className="top-strip-left">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={13} style={{ color: "var(--accent-orange-red)" }} />
                {site.address}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Phone size={13} style={{ color: "var(--accent-orange-red)" }} />
                {site.phone} / {site.mobile}
              </span>
            </div>
            <div className="top-strip-right">
              <span>Well Managed for Your Success • Damak, Jhapa</span>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="nav-shell">
          {USE_CUSTOM_LOGO ? (
            <Logo />
          ) : (
            <Link href="/" className="brand">
              <img 
                src={assets.logo} 
                alt="Jyoti Educations logo"
                className="brand-logo-img"
                style={{
                  height: "80px",
                  width: "auto",
                  objectFit: "contain",
                  imageRendering: "-webkit-optimize-contrast",
                  WebkitBackfaceVisibility: "hidden",
                  transition: "transform 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </Link>
          )}

          {/* Desktop Navigation links */}
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <div className="nav-group" key={item.label}>
                <AppLink
                  to={item.path}
                  className={active(item.path) ? "nav-item nav-item-active" : "nav-item"}
                >
                  {item.label}
                  {item.children ? <ChevronDown size={14} className="nav-chevron" /> : null}
                </AppLink>
                {item.children ? (
                  <div className="nav-menu">
                    {item.children.map((child) => (
                      <AppLink key={child.label} to={child.path} className="nav-subitem">
                        <span>{child.label}</span>
                        <ArrowUpRight size={13} />
                      </AppLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          {/* Call-to-action button */}
          <div className="nav-actions">
            <AppLink to="/book-free-consultation" className="book-now-button">
              Book Free Counseling
              <ArrowRight size={15} />
            </AppLink>
            <button
              className="menu-button"
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Panel */}
        <div 
          className={`mobile-overlay-bg ${menuOpen ? "open" : ""}`} 
          onClick={() => setMenuOpen(false)}
        />
        <div className={`mobile-overlay-drawer ${menuOpen ? "open" : ""}`}>
          <div className="mobile-drawer-header">
            {USE_CUSTOM_LOGO ? (
              <Logo />
            ) : (
              <div className="brand">
                <img 
                  src={assets.logo} 
                  alt="Jyoti Educations logo" 
                  className="brand-logo-img" 
                  style={{ 
                    height: "68px", 
                    width: "auto",
                    objectFit: "contain",
                    imageRendering: "-webkit-optimize-contrast" 
                  }} 
                />
              </div>
            )}
            <button
              className="mobile-drawer-close"
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={26} />
            </button>
          </div>

          <div className="mobile-drawer-links">
            {navItems.map((item) => (
              <div key={item.label} style={{ display: "flex", flexDirection: "column" }}>
                <AppLink
                  to={item.path}
                  className="mobile-drawer-item"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </AppLink>
                {item.children
                  ? item.children.map((child) => (
                      <AppLink
                        key={child.label}
                        to={child.path}
                        className="mobile-drawer-subitem"
                        onClick={() => setMenuOpen(false)}
                      >
                        {child.label}
                      </AppLink>
                    ))
                  : null}
              </div>
            ))}
          </div>

          <AppLink
            to="/book-free-consultation"
            className="book-now-button"
            style={{ width: "100%", justifyContent: "center", marginTop: "20px" }}
            onClick={() => setMenuOpen(false)}
          >
            Book Free Counseling
            <ArrowRight size={15} />
          </AppLink>
        </div>
      </header>
    </>
  );
}
