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
      </div>
    </footer>
  );
}
