import { useState } from "react";
import { AppLink } from "./AppLink.jsx";
import { SectionIntro } from "./SectionIntro.jsx";
import { assets } from "../data/assets.js";
import { countries } from "../data/countries.js";

export function DestinationsSection({ navigate, compact = false }) {
  const [region, setRegion] = useState("All");
  const regions = ["All", ...Array.from(new Set(countries.map((country) => country.region)))];
  const visibleCountries = countries.filter((country) => region === "All" || country.region === region);
  const displayed = compact ? countries.slice(0, 8) : visibleCountries;

  return (
    <section className="section destinations-band">
      <SectionIntro
        eyebrow="Study Destinations"
        title="Countries Jyoti Educations supports from counselling to visa readiness"
        text="Explore popular study routes with intake planning, program shortlisting, cost awareness, and practical document guidance."
        align="center"
      />
      {!compact ? (
        <div className="filter-row center-filter">
          {regions.map((item) => (
            <button type="button" key={item} className={item === region ? "filter-active" : ""} onClick={() => setRegion(item)}>
              {item}
            </button>
          ))}
        </div>
      ) : null}
      <div className="destination-layout">
        <div className="destination-image">
          <img src={compact ? assets.destinations : assets.europe} alt="Study abroad destination collage" />
        </div>
        <div className="country-grid">
          {displayed.map((country) => (
            <button
              className="country-card"
              type="button"
              key={country.slug}
              onClick={() => navigate(`/destinations/${country.slug}`)}
              style={{ "--country": country.accent }}
            >
              <span>{country.code}</span>
              <strong>{country.name}</strong>
              <small>{country.intake}</small>
            </button>
          ))}
        </div>
      </div>
      {compact ? (
        <div className="center-actions">
          <AppLink to="/destinations" navigate={navigate} className="secondary-button">
            View All Destinations
          </AppLink>
        </div>
      ) : null}
    </section>
  );
}
