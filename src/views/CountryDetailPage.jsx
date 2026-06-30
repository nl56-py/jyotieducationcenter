"use client";

import Image from "next/image";
import { useState, useEffect, useContext, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { InquiryBand } from "../components/InquiryBand.jsx";
import { countries } from "../data/countries.js";
import { TransitionContext } from "../app/(public)/destinations/layout";

const flagImageMap = {
  UK: "/uk-420x420.jpg",
  US: "/usa-1-420x420.jpg",
  AU: "/austraylia-420x420.jpg",
  FI: "/finland.png",
  LT: "/luthinia.png",
  KR: "/south-korea.png",
  JP: "/japan.png",
  IN: "/india.png",
  AE: "/dubai.png",
  MT: "/malta.jfif",
};

const countryLandmarkMap = {
  uk: "Big Ben and Tower Bridge",
  usa: "Statue of Liberty",
  australia: "Sydney Opera House",
  finland: "Helsinki Cathedral",
  lithuania: "Gediminas Tower",
  "south-korea": "N Seoul Tower",
  japan: "Mount Fuji and torii gate",
  india: "Taj Mahal",
  malta: "Maltese limestone arch",
  dubai: "Burj Khalifa skyline",
};

const countryHeroImageMap = {
  uk: "/images/generated/uk_banner.png",
  usa: "/images/generated/usa_banner.png",
  australia: "/images/generated/australia_banner.png",
  finland: "/images/generated/finland_banner.png",
  lithuania: "/images/generated/lithuania_banner.png",
  "south-korea": "/images/generated/south_korea_banner.png",
  japan: "/images/generated/japan_banner.png",
  india: "/images/generated/india_banner.png",
  dubai: "/images/generated/dubai_banner.png",
  malta: "/images/generated/malta_banner.png",
};

function getCountryDisplayName(country) {
  if (country.code === "US") return "United States";
  if (country.code === "UK") return "United Kingdom";
  return country.name;
}

function getSidebarName(country) {
  if (country.code === "US") return "USA";
  if (country.code === "UK") return "UK";
  return country.name;
}

function CountryLandmark({ slug }) {
  switch (slug) {
    case "uk":
      return (
        <g className="country-landmark">
          <path d="M122 318H374" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.32" />
          <path d="M134 294C172 244 216 244 252 294C290 244 334 244 370 294" stroke="currentColor" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.42" />
          <rect x="408" y="142" width="54" height="178" rx="4" fill="currentColor" opacity="0.58" />
          <path d="M402 142H468L458 106H412Z" fill="currentColor" opacity="0.74" />
          <path d="M423 106H447L438 58H432Z" fill="currentColor" opacity="0.82" />
          <circle cx="435" cy="178" r="15" fill="rgba(255,255,255,0.72)" />
          <path d="M435 164V178L445 184" stroke="#0a2440" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "usa":
      return (
        <g className="country-landmark">
          <path d="M265 318H455" stroke="currentColor" strokeWidth="12" strokeLinecap="round" opacity="0.35" />
          <path d="M336 302H398L386 178L368 142L348 178Z" fill="currentColor" opacity="0.58" />
          <path d="M360 130L370 92L383 130Z" fill="currentColor" opacity="0.72" />
          <path d="M370 92V56" stroke="currentColor" strokeWidth="9" strokeLinecap="round" opacity="0.82" />
          <path d="M370 55L400 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d="M345 140L315 178" stroke="currentColor" strokeWidth="12" strokeLinecap="round" opacity="0.7" />
          <rect x="316" y="302" width="104" height="24" rx="4" fill="currentColor" opacity="0.72" />
        </g>
      );
    case "australia":
      return (
        <g className="country-landmark">
          <path d="M168 312H472" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.32" />
          <path d="M190 292C220 206 282 178 326 292Z" fill="currentColor" opacity="0.52" />
          <path d="M282 292C308 190 378 148 438 292Z" fill="currentColor" opacity="0.62" />
          <path d="M346 292C372 224 418 208 464 292Z" fill="currentColor" opacity="0.44" />
          <path d="M184 292C250 270 392 270 472 292" stroke="rgba(255,255,255,0.55)" strokeWidth="8" strokeLinecap="round" fill="none" />
        </g>
      );
    case "finland":
      return (
        <g className="country-landmark">
          <path d="M142 318H478" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.28" />
          <path d="M226 226H394V318H226Z" fill="currentColor" opacity="0.58" />
          <path d="M244 226L310 174L376 226Z" fill="currentColor" opacity="0.72" />
          <path d="M284 174C284 140 336 140 336 174" fill="currentColor" opacity="0.62" />
          <path d="M310 138V96M292 114H328" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.78" />
          <path d="M166 248L198 190L232 248H212L242 302H158L188 248Z" fill="currentColor" opacity="0.42" />
        </g>
      );
    case "lithuania":
      return (
        <g className="country-landmark">
          <path d="M180 318H452" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.3" />
          <rect x="278" y="154" width="82" height="164" rx="4" fill="currentColor" opacity="0.62" />
          <path d="M266 154H372L350 112H288Z" fill="currentColor" opacity="0.78" />
          <path d="M292 196H346M292 234H346M292 272H346" stroke="rgba(255,255,255,0.55)" strokeWidth="8" strokeLinecap="round" />
          <path d="M332 112V70" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <path d="M332 72H390L370 92H332Z" fill="currentColor" opacity="0.74" />
        </g>
      );
    case "south-korea":
      return (
        <g className="country-landmark">
          <path d="M154 318H480" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.28" />
          <path d="M306 304H346L334 126H318Z" fill="currentColor" opacity="0.66" />
          <circle cx="326" cy="104" r="34" fill="none" stroke="currentColor" strokeWidth="10" opacity="0.72" />
          <path d="M326 70V38" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d="M188 286H260L224 244Z" fill="currentColor" opacity="0.45" />
          <path d="M394 286H466L430 244Z" fill="currentColor" opacity="0.45" />
        </g>
      );
    case "japan":
      return (
        <g className="country-landmark">
          <path d="M122 318H500" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.28" />
          <path d="M170 304L306 112L454 304Z" fill="currentColor" opacity="0.54" />
          <path d="M306 112L254 186H358Z" fill="rgba(255,255,255,0.72)" opacity="0.9" />
          <path d="M166 228H244M180 228V318M230 228V318" stroke="currentColor" strokeWidth="12" strokeLinecap="round" opacity="0.72" />
          <path d="M150 210H260L242 186H168Z" fill="currentColor" opacity="0.8" />
        </g>
      );
    case "india":
      return (
        <g className="country-landmark">
          <path d="M134 318H492" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.3" />
          <path d="M248 318V212C248 170 306 170 306 212V318Z" fill="currentColor" opacity="0.66" />
          <path d="M224 218C224 152 330 152 330 218" fill="currentColor" opacity="0.58" />
          <path d="M247 158C247 114 307 114 307 158" fill="currentColor" opacity="0.72" />
          <rect x="168" y="232" width="48" height="86" fill="currentColor" opacity="0.5" />
          <rect x="388" y="232" width="48" height="86" fill="currentColor" opacity="0.5" />
          <path d="M190 232V172M412 232V172" stroke="currentColor" strokeWidth="12" strokeLinecap="round" opacity="0.64" />
        </g>
      );
    case "malta":
      return (
        <g className="country-landmark">
          <path d="M142 318H488" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.32" />
          <path d="M202 318V214C202 150 288 118 342 166C370 190 390 240 390 318H342C342 248 322 214 292 214C262 214 246 248 246 318Z" fill="currentColor" opacity="0.6" />
          <path d="M394 318V198H448V318Z" fill="currentColor" opacity="0.45" />
          <path d="M410 198V154M394 176H426" stroke="currentColor" strokeWidth="9" strokeLinecap="round" opacity="0.68" />
        </g>
      );
    case "dubai":
      return (
        <g className="country-landmark">
          <path d="M134 318H500" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.3" />
          <path d="M320 318L334 74L348 318Z" fill="currentColor" opacity="0.74" />
          <path d="M326 74L342 30L340 96Z" fill="currentColor" opacity="0.82" />
          <rect x="196" y="214" width="46" height="104" rx="4" fill="currentColor" opacity="0.42" />
          <rect x="254" y="174" width="46" height="144" rx="4" fill="currentColor" opacity="0.48" />
          <rect x="378" y="194" width="48" height="124" rx="4" fill="currentColor" opacity="0.42" />
          <rect x="438" y="232" width="42" height="86" rx="4" fill="currentColor" opacity="0.36" />
        </g>
      );
    default:
      return null;
  }
}

export function CountryDetailPage({ country }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const transitionContext = useContext(TransitionContext);
  const sectionRef = useRef(null);

  useEffect(() => {
    setActiveFaq(null);
    const sidebar = document.querySelector('.country-sidebar');
    if (sidebar) {
      sidebar.scrollTop = 0;
    }
  }, [country.slug]);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [country.slug]);

  // Sort countries to show the primary 8 first for a cleaner sidebar
  const primarySlugs = ["uk", "usa", "australia", "finland", "lithuania", "south-korea", "japan", "india"];
  const sortedCountries = [...countries].sort((a, b) => {
    const idxA = primarySlugs.indexOf(a.slug);
    const idxB = primarySlugs.indexOf(b.slug);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  const heroImage = countryHeroImageMap[country.slug] || country.universitiesDetail?.[0]?.image || flagImageMap[country.code];
  const heroFlag = flagImageMap[country.code];
  const heroLandmark = countryLandmarkMap[country.slug] || "Global study route";

  return (
    <main
      ref={sectionRef}
      style={{
        fontFamily: "var(--display-font)",
        "--country-color": "var(--accent-orange-red)",
        "--country-identity-color": country.accent,
        overflowX: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spinGlobe {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinRevolve {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sidebarPlaneLoop {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinning-globe {
          animation: spinGlobe 40s linear infinite;
        }
        .revolving-airplane-group {
          animation: spinRevolve 15s linear infinite;
        }
        .country-sidebar-flag-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .country-sidebar-item.active .country-sidebar-flag-wrapper {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.35);
        }
        .sidebar-airplane-loop {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .sidebar-looping-plane-group {
          transform-origin: 20px 20px;
          animation: sidebarPlaneLoop 6s linear infinite;
        }
        .country-hero-title-lockup {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .country-hero-flag {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 12px 28px rgba(7, 31, 61, 0.22);
        }
        .country-sidebar-flag-img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          position: relative;
          z-index: 2;
          box-shadow: 0 2px 8px rgba(8, 31, 61, 0.12);
          transition: transform 0.2s ease;
        }
        .country-sidebar-item.active .country-sidebar-flag-img {
          transform: scale(1.1);
        }
        .country-sidebar-name {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          width: 100%;
          min-width: 0;
        }
        .country-sidebar-name-text {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .country-sidebar-name-flag {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(8, 31, 61, 0.12);
        }
      `}} />
      <section className="country-hero-banner" style={{ backgroundImage: `url("${heroImage}")` }}>
        <div className="country-hero-banner-inner">
          <div className="country-hero-title-lockup">
            {heroFlag && (
              <Image
                src={heroFlag}
                alt={`${country.name} flag`}
                className="country-hero-flag"
                width={58}
                height={58}
              />
            )}
            <div>
              <span className="country-hero-kicker">Study Destination</span>
              <h1>{getCountryDisplayName(country)}</h1>
              
              <div className="country-hero-landmark-graphic">
                <svg viewBox="100 30 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <CountryLandmark slug={country.slug} />
                </svg>
              </div>

              <p>{heroLandmark}</p>
            </div>
          </div>
        </div>
        <div className="country-hero-banner-graphic">
          <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="spinning-globe" style={{ transformOrigin: "580px 200px" }}>
              <circle cx="580" cy="200" r="160" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15"/>
              <circle cx="580" cy="200" r="100" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.1"/>
              <ellipse cx="580" cy="200" rx="160" ry="60" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15"/>
              <ellipse cx="580" cy="200" rx="60" ry="160" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15"/>
              <path d="M420 200 H740" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15" />
              <path d="M580 40 V360" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15" />
            </g>
            
            <circle cx="580" cy="200" r="130" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.08" />
            
            <g className="revolving-airplane-group" style={{ transformOrigin: "580px 200px" }}>
              <g transform="translate(580, 70)">
                <path d="M-15,-2 L-6,-2 L-11,-10 L-7,-10 L1,-2 L10,-2 C12,-2 14,-1 14,0 C14,1 12,2 10,2 L1,2 L-7,10 L-11,10 L-6,2 L-15,2 L-17,5 L-19,5 L-18,0 L-19,-5 L-17,-5 Z" fill="white" opacity="0.8"/>
              </g>
            </g>

          </svg>
        </div>
      </section>

      <div className="country-detail-container">
        {/* Left Column: Sticky Sidebar / Switcher bar */}
        <aside className="country-sidebar">
          <div className="country-sidebar-route">
            <span>Study Route</span>
            <h3 style={{ color: "var(--country-color)" }}>{country.name}</h3>
          </div>

          <div className="country-sidebar-title">Explore Countries</div>
          
          <div className="country-sidebar-nav">
            {sortedCountries.map((c) => {
              const cFlag = flagImageMap[c.code];
              return (
              <AppLink
                key={c.slug}
                to={`/destinations/${c.slug}`}
                className={`country-sidebar-item ${c.slug === country.slug ? "active" : ""}`}
                style={{ "--country-color": "var(--accent-orange-red)", "--country-identity-color": c.accent }}
                onClick={(e) => {
                  if (transitionContext) {
                    e.preventDefault();
                    transitionContext.startTransition(c, `/destinations/${c.slug}`);
                  }
                }}
              >
                <div className="country-sidebar-flag-wrapper">
                  {cFlag ? (
                    <Image
                      src={cFlag}
                      alt={`${c.name} flag`}
                      className="country-sidebar-flag-img"
                      width={28}
                      height={28}
                    />
                  ) : (
                    <span className="flag-code" style={{ zIndex: 2, fontSize: "11px", fontWeight: 800 }}>{c.code}</span>
                  )}
                  <svg className="sidebar-airplane-loop" viewBox="0 0 40 40" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.25"/>
                    <g className="sidebar-looping-plane-group" style={{ transformOrigin: "20px 20px" }}>
                      <g transform="translate(20, 6) scale(0.7)">
                        <path d="M-4,-1 L2,-1 L0,-4 L1,-4 L3,-1 L5,-1 C6,-1 7,-0.5 7,0 C7,0.5 6,1 5,1 L3,1 L1,4 L0,4 L2,1 L-4,1 Z" fill="currentColor"/>
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="country-sidebar-name" style={{ fontWeight: 700 }}>
                  <span className="country-sidebar-name-text">{getSidebarName(c)}</span>
                  {cFlag && (
                    <Image
                      src={cFlag}
                      alt=""
                      className="country-sidebar-name-flag"
                      width={22}
                      height={22}
                      aria-hidden="true"
                    />
                  )}
                </span>
              </AppLink>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Main Country Content */}
        <div className="country-content-wrapper">
          
          {/* Section 1: Intro Copy */}
          <section className="country-intro-section animate-on-scroll">
            <h2 className="country-main-title">Study in {country.name} from Nepal</h2>
            <div className="country-title-divider"></div>
            
            {country.introCopy ? (
              country.introCopy.map((para, idx) => (
                <p key={idx} className="country-editorial-p">{para}</p>
              ))
            ) : (
              <p className="country-editorial-p">{country.highlight}</p>
            )}
          </section>

          {/* Section 2: Fast Facts Grid */}
          <section className="fast-facts-section animate-on-scroll">
            <div className="fast-facts-grid">
              <div className="fast-fact-card">
                <span className="icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
                <h4>Main Intakes</h4>
                <p>{country.intake}</p>
              </div>
              <div className="fast-fact-card">
                <span className="icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M6 12h.01M18 12h.01"></path>
                  </svg>
                </span>
                <h4>Estimated Cost</h4>
                <p>{country.cost}</p>
              </div>
              <div className="fast-fact-card">
                <span className="icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                  </svg>
                </span>
                <h4>Visa Path</h4>
                <p>
                  {country.code === 'US' ? 'F-1 Student Visa' : 
                   country.code === 'UK' ? 'Student Route' : 
                   country.code === 'AU' ? 'Subclass 500' : 
                   country.region === 'European' ? 'National D Visa / TRP' : 'Student Visa Route'}
                </p>
              </div>
              <div className="fast-fact-card">
                <span className="icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </span>
                <h4>Required Tests</h4>
                <p>{country.code === 'IN' ? 'Medium of Instruction (MOI)' : 'IELTS / PTE Academic'}</p>
              </div>
            </div>
          </section>

          {/* Section 3: Top Courses */}
          <section className="courses-section-v2 animate-on-scroll">
            <h3 className="section-heading-v2">Top Courses to Study in {country.name}</h3>
            <div className="section-divider-v2"></div>
            <p className="section-intro-text">
              Nepali students frequently select these disciplines due to high educational quality, modern syllabus options, and strong employment opportunities:
            </p>
            
            {country.coursesList ? (
              <div className="courses-grid-v2">
                {country.coursesList.map((course) => (
                  <div className="course-card-v2" key={course.title}>
                    <h4>{course.title}</h4>
                    <p>{course.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="courses-fallback-grid">
                {country.programs.split(", ").map((prog, idx) => (
                  <div className="course-fallback-badge" key={idx}>
                    <span>✔</span> {prog}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 4: Universities Directory Table */}
          {country.universitiesDetail && country.universitiesDetail.length > 0 && (
            <section className="directory-table-section animate-on-scroll">
              <h3 className="section-heading-v2">Top Universities & Colleges Popular Among Nepali Students</h3>
              <div className="section-divider-v2"></div>
              <p className="section-intro-text">
                Here is a comparative overview of some of the key academic institutions in {country.name} with details on popular programs and highlights:
              </p>
              <div className="table-wrapper-v2">
                <table className="comparison-table-v2">
                  <thead>
                    <tr>
                      <th>University Name</th>
                      <th>Popular Courses</th>
                      <th>Tuition Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country.universitiesDetail.map((uni) => (
                      <tr key={uni.name}>
                        <td style={{ fontWeight: "700", color: "var(--navy)" }}>{uni.name}</td>
                        <td>{uni.courses}</td>
                        <td style={{ fontWeight: "800", color: "var(--country-color)" }}>{uni.fees}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 5: Creative University Showcases with Images */}
          {country.universitiesDetail && country.universitiesDetail.length > 0 && (
            <section className="university-showcase-section animate-on-scroll">
              <h3 className="section-heading-v2">Featured Campus Showcases</h3>
              <div className="section-divider-v2"></div>
              <div className="university-grid">
                {country.universitiesDetail.map((uni) => (
                  <div className="university-card" key={uni.name}>
                    <div className="university-card-img-wrapper">
                      <img src={uni.image} alt={uni.name} className="university-card-img" />
                    </div>
                    <div className="university-card-body">
                      <h3>{uni.name}</h3>
                      <p>{uni.description}</p>
                      <div className="university-card-meta">
                        <div className="university-card-meta-item">
                          <span className="icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                              <circle cx="12" cy="12" r="2"></circle>
                              <path d="M6 12h.01M18 12h.01"></path>
                            </svg>
                          </span>
                          <span className="label">Tuition:</span>
                          <span className="value" style={{ fontWeight: "800", color: "var(--country-color)" }}>{uni.fees}</span>
                        </div>
                        <div className="university-card-meta-item">
                          <span className="icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                          </span>
                          <span className="label">Key Fields:</span>
                          <span className="value">{uni.courses}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 6: Why Study Here & Ideal Benefits */}
          <section className="why-study-section-v2 animate-on-scroll">
            <h3 className="section-heading-v2">Why study in {country.name}?</h3>
            <div className="section-divider-v2"></div>
            <p className="section-intro-text">
              The {country.name} study route provides unique career pathways and academic values that make it a highly competitive choice:
            </p>
            <div className="benefits-list-v2">
              {country.why.map((benefit, idx) => (
                <div className="benefit-item-v2" key={idx}>
                  <span className="benefit-icon-v2">✓</span>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Requirements Grid */}
          {country.requirementsDetail ? (
            <section className="requirements-section-v2 animate-on-scroll">
              <h3 className="section-heading-v2">Requirements to Study in {country.name}</h3>
              <div className="section-divider-v2"></div>
              <p className="section-intro-text">
                To secure a successful placement and student visa, students must satisfy the following admission and immigration criteria:
              </p>
              <div className="requirements-grid-v2">
                <div className="req-card-v2">
                  <div className="req-card-header-v2">
                    <span className="icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                      </svg>
                    </span>
                    <h4>1. Academic Admission</h4>
                  </div>
                  <p>{country.requirementsDetail.academic}</p>
                </div>
                <div className="req-card-v2">
                  <div className="req-card-header-v2">
                    <span className="icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </span>
                    <h4>2. Language Score</h4>
                  </div>
                  <p>{country.requirementsDetail.english}</p>
                </div>
                <div className="req-card-v2">
                  <div className="req-card-header-v2">
                    <span className="icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                      </svg>
                    </span>
                    <h4>3. Financial Capacity</h4>
                  </div>
                  <p>{country.requirementsDetail.financial}</p>
                </div>
                <div className="req-card-v2">
                  <div className="req-card-header-v2">
                    <span className="icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </span>
                    <h4>4. Genuine Student (GST/GS)</h4>
                  </div>
                  <p>{country.requirementsDetail.genuine}</p>
                </div>
              </div>
            </section>
          ) : (
            <section className="requirements-fallback-section animate-on-scroll">
              <h3 className="section-heading-v2">Visa & Requirements</h3>
              <div className="section-divider-v2"></div>
              <div className="requirements-fallback-list">
                {country.visa.map((v, idx) => (
                  <div className="fallback-req-card" key={idx}>
                    <h4>{v}</h4>
                    <p>EduMark provides detailed counsel on preparing files, certifications, and mock practice sessions for this step.</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 8: Intakes & Deadlines */}
          {country.intakesList && (
            <section className="intakes-section-v2 animate-on-scroll">
              <h3 className="section-heading-v2">Intakes & Deadlines</h3>
              <div className="section-divider-v2"></div>
              <p className="section-intro-text">
                Institutions in {country.name} offer multiple semesters. Early planning guarantees access to high-demand courses and bursary deadlines:
              </p>
              <div className="table-wrapper-v2">
                <table className="comparison-table-v2">
                  <thead>
                    <tr>
                      <th>Academic Intake</th>
                      <th>Study Period</th>
                      <th>Application Window</th>
                      <th>Key Information</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country.intakesList.map((int, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: "700", color: "var(--navy)" }}>{int.title}</td>
                        <td>{int.period}</td>
                        <td style={{ fontWeight: "700", color: "var(--country-color)" }}>{int.deadline}</td>
                        <td>{int.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 9: Estimated Costs Breakdown */}
          {country.costsList && (
            <section className="costs-section-v2 animate-on-scroll">
              <h3 className="section-heading-v2">Cost of Studying in {country.name}</h3>
              <div className="section-divider-v2"></div>
              <p className="section-intro-text">
                Budgeting effectively allows you to focus on your studies. Below are the estimated annual budgets for tuition and living:
              </p>
              <div className="table-wrapper-v2">
                <table className="comparison-table-v2">
                  <thead>
                    <tr>
                      <th>Expense Category</th>
                      <th>Estimated Cost Range</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country.costsList.map((c, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: "700", color: "var(--navy)" }}>{c.category}</td>
                        <td style={{ fontWeight: "800", color: "var(--country-color)" }}>{c.range}</td>
                        <td>{c.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 10: Scholarships & Advisor Support */}
          {country.scholarshipsList && (
            <section className="scholarships-section-v2 animate-on-scroll">
              <h3 className="section-heading-v2">Scholarships & Funding in {country.name}</h3>
              <div className="section-divider-v2"></div>
              <div className="scholarships-container-v2">
                {country.scholarshipsList.map((s, idx) => (
                  <div className="scholarship-item-v2" key={idx}>
                    <h5>{s.name}</h5>
                    <p>{s.details}</p>
                  </div>
                ))}
              </div>
              <div className="scholarship-cta-v2">
                <h4>Maximize Your Funding Potential</h4>
                <p>
                  Our admissions counselors help you identify appropriate grants, prepare required essays, and polish your Statement of Purpose (SOP) to boost your candidacy.
                </p>
              </div>
            </section>
          )}

          {/* Section 11: Interactive FAQ Accordion */}
          <section className="faq-section-v2 animate-on-scroll">
            <h3 className="section-heading-v2">Frequently Asked Questions</h3>
            <div className="section-divider-v2"></div>
            <div className="faq-accordion-v2">
              {country.faq.map(([q, a], idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div className={`faq-item-v2 ${isOpen ? "open" : ""}`} key={idx}>
                    <button 
                      className="faq-toggle-v2" 
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                    >
                      <span>{q}</span>
                      <span className="faq-icon-v2">{isOpen ? "−" : "+"}</span>
                    </button>
                    <div className="faq-answer-v2">
                      <div className="faq-answer-inner-v2">
                        <p>{a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>

      <InquiryBand />
    </main>
  );
}
