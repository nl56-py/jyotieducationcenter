import Link from "next/link";
import { AppLink } from "./AppLink.jsx";
import { countries } from "../data/countries.js";
import { site } from "../data/site.js";
import { assets } from "../data/assets.js";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Test Preparation", path: "/test-preparation" },
    { label: "Entrance Preparations", path: "/entrance-preparations" },
    { label: "Blogs", path: "/blogs" },
    { label: "Videos Gallery", path: "/videos-gallery" },
    { label: "Contact Us", path: "/contact" }
  ];

  const languageClasses = [
    { label: "IELTS Preparation", path: "/test-preparation/ielts" },
    { label: "PTE Preparation", path: "/test-preparation/pte" },
    { label: "TOEFL Classes", path: "/test-preparation/toefl" },
    { label: "SAT Training", path: "/test-preparation/sat" },
    { label: "CEE Medical Prep", path: "/entrance-preparations" },
    { label: "CMAT Classes", path: "/entrance-preparations" }
  ];

  return (
    <footer className="footer">
      {/* Top Banner Tagline */}
      <div className="footer-top-cta">
        <div className="footer-top-tagline">
          <h3>We are shaping your dream future</h3>
          <p>Your gateway to global education, certified test preparation, and structured counseling.</p>
        </div>
        <AppLink to="/book-free-consultation" className="book-now-button">
          Book Free Counseling
          <ArrowRight size={15} />
        </AppLink>
      </div>

      {/* Grid with 4 columns (Brand info + 3 links lists) */}
      <div className="footer-grid">
        <div>
          <Link href="/" className="brand footer-brand" style={{ display: "flex", textDecoration: "none" }}>
            <img 
              src={assets.logo} 
              alt="EduMark logo" 
              style={{ filter: "brightness(0.9) contrast(1.1)" }}
            />
            <span>
              <strong>EduMark</strong>
              <small>Education Consultancy</small>
            </span>
          </Link>
          <p className="footer-logo-desc">
            Leading multi-destination education consultancy guided by certified TITI counselors. Providing ethical, transparent university admission and visa guidance since 2012.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "500" }}>
            Approved by Ministry of Education • Member of ECAN
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          {quickLinks.map((item) => (
            <AppLink key={item.path} to={item.path} className="footer-link">
              {item.label}
            </AppLink>
          ))}
        </div>

        <div>
          <h3>Study Abroad</h3>
          {countries.slice(0, 6).map((country) => (
            <AppLink key={country.slug} to={`/destinations/${country.slug}`} className="footer-link">
              Study in {country.name}
            </AppLink>
          ))}
        </div>

        <div>
          <h3>Preparations</h3>
          {languageClasses.map((item) => (
            <AppLink key={item.label} to={item.path} className="footer-link">
              {item.label}
            </AppLink>
          ))}
        </div>
      </div>

      {/* Bottom copyrights bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <span>&copy; {new Date().getFullYear()} EduMark Pvt. Ltd. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms-of-use">Terms of Use</Link>
            <span>|</span>
            <AppLink to="/admin">Admin Panel</AppLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
