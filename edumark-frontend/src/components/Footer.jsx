import { AppLink } from "./AppLink.jsx";
import { flattenNav } from "../utils/router.js";
import { countries } from "../data/countries.js";
import { site } from "../data/site.js";
import { assets } from "../data/assets.js";

export function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <button className="brand footer-brand" type="button" onClick={() => navigate("/")}>
            <img src={assets.logo} alt="EduMark logo" />
            <span>
              <strong>EduMark</strong>
              <small>Education Consultancy</small>
            </span>
          </button>
          <p>Study abroad, entrance preparation, test preparation, and visa guidance from Biratnagar.</p>
          <p>Approved by Ministry of Education | TITI Certified | ECAN Member</p>
        </div>
        <div>
          <h3>Explore</h3>
          {flattenNav().slice(1, 9).map((item) => (
            <AppLink key={item.path} to={item.path} navigate={navigate} className="footer-link">
              {item.label}
            </AppLink>
          ))}
        </div>
        <div>
          <h3>Destinations</h3>
          {countries.slice(0, 7).map((country) => (
            <AppLink key={country.slug} to={`/destinations/${country.slug}`} navigate={navigate} className="footer-link">
              {country.name}
            </AppLink>
          ))}
        </div>
        <div>
          <h3>Contact</h3>
          <p>{site.address}</p>
          <p>{site.phone} | {site.mobile}</p>
          <p>{site.email}</p>
          <AppLink to="/admin" navigate={navigate} className="footer-link admin-footer-link">
            Admin Panel
          </AppLink>
        </div>
      </div>
    </footer>
  );
}
