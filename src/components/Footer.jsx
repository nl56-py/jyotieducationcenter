import Link from "next/link";
import { AppLink } from "./AppLink.jsx";
import { countries } from "../data/countries.js";
import { site } from "../data/site.js";
import { assets } from "../data/assets.js";

export function Footer() {
  const exploreLinks = [
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Test Preparation", path: "/test-preparation" },
    { label: "Entrance Preparations", path: "/entrance-preparations" },
    { label: "Blogs", path: "/blogs" },
    { label: "Videos Gallery", path: "/videos-gallery" },
    { label: "Contact Us", path: "/contact" }
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="brand footer-brand" style={{ display: "flex", textDecoration: "none" }}>
            <img src={assets.logo} alt="EduMark logo" />
            <span>
              <strong>EduMark</strong>
              <small>Education Consultancy</small>
            </span>
          </Link>
          <p>Study abroad, entrance preparation, test preparation, and visa guidance from Biratnagar.</p>
          <p>Approved by Ministry of Education | TITI Certified | ECAN Member</p>
        </div>
        <div>
          <h3>Explore</h3>
          {exploreLinks.map((item) => (
            <AppLink key={item.path} to={item.path} className="footer-link">
              {item.label}
            </AppLink>
          ))}
        </div>
        <div>
          <h3>Destinations</h3>
          {countries.slice(0, 7).map((country) => (
            <AppLink key={country.slug} to={`/destinations/${country.slug}`} className="footer-link">
              {country.name}
            </AppLink>
          ))}
        </div>
        <div>
          <h3>Contact</h3>
          <p>{site.address}</p>
          <p>{site.phone} | {site.mobile}</p>
          <p>{site.email}</p>
          <AppLink to="/admin" className="footer-link admin-footer-link">
            Admin Panel
          </AppLink>
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
