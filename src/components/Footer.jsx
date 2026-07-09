import Link from "next/link";
import { AppLink } from "./AppLink.jsx";
import { countries } from "../data/countries.js";
import { site } from "../data/site.js";
import { assets } from "../data/assets.js";
import { ArrowRight } from "lucide-react";
import { Logo } from "./Logo.jsx";

// Toggle this boolean to switch between the original image logo and the custom HTML/CSS logo
const USE_CUSTOM_LOGO = false;

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
          {USE_CUSTOM_LOGO ? (
            <div className="footer-brand" style={{ marginBottom: "20px" }}>
              <Logo />
            </div>
          ) : (
            <Link href="/" className="brand footer-brand" style={{ display: "flex", textDecoration: "none" }}>
              <img 
                src={assets.logo} 
                alt="EduMark logo" 
                style={{ filter: "brightness(0.9) contrast(1.1)", height: "65px", width: "auto" }}
              />
            </Link>
          )}
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
        <div>
          <h3>Our Location</h3>
          <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.12)", height: "160px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114315.65586380185!2d87.19299150225115!3d26.443985383028362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef7447d71fda8f%3A0xd35ca9b1d45dc14c!2sEduMark%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1782145143568!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EduMark Footer Map"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
