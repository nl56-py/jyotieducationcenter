import Link from "next/link";
import { AppLink } from "./AppLink.jsx";
import { countries } from "../data/countries.js";
import { siteConfig } from "../data/siteConfig";
import { ArrowRight } from "lucide-react";
import { Logo } from "./Logo.jsx";

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
    { label: "Japanese (JLPT)", path: "/test-preparation/japanese-jlpt" },
    { label: "CEE Medical Prep", path: "/entrance-preparations" }
  ];

  return (
    <footer className="footer">
      {/* Top Banner Tagline */}
      <div className="footer-top-cta">
        <div className="footer-top-tagline">
          <h3>Empowering Academic Excellence & Global Education</h3>
          <p>Your gateway to world-class universities, expert test preparation, and transparent visa guidance.</p>
        </div>
        <AppLink to="/book-free-consultation" className="book-now-button">
          Book Free Counseling
          <ArrowRight size={15} />
        </AppLink>
      </div>

      {/* Grid with 4 columns (Brand info + 3 links lists) */}
      <div className="footer-grid">
        <div>
          <div className="footer-brand" style={{ marginBottom: "20px" }}>
            <Logo isFooter={true} />
          </div>
          <p className="footer-logo-desc">
            {siteConfig.legalName} is a government-registered educational consultancy providing reliable, professional, and student-focused international guidance. Well managed for your success.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "500" }}>
            Putalisadak, Kathmandu, Nepal • {siteConfig.contact.primaryPhone}
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
          {countries.slice(0, 7).map((country) => (
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
          <span>&copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</span>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.595507591625!2d87.69764339999999!3d26.6614305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e58f624c234a5b%3A0xe3e907961a8c8d45!2sJyoti%20Education%20Corner%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1787635462251!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Jyoti Education Corner Pvt. Ltd. Location Map"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
