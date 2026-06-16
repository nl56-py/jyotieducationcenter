"use client";

import { useState, useEffect, useContext } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { BulletList } from "../components/BulletList.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { InquiryBand } from "../components/InquiryBand.jsx";
import { assets } from "../data/assets.js";
import { countries } from "../data/countries.js";
import { TransitionContext } from "../app/(public)/destinations/layout";

const flagMap = {
  UK: "🇬🇧", US: "🇺🇸", AU: "🇦🇺", JP: "🇯🇵",
  FI: "🇫🇮", LT: "🇱🇹", KR: "🇰🇷", MT: "🇲🇹",
  AE: "🇦🇪", IN: "🇮🇳",
};

const brochurePageMap = {
  uk: "/images/brochure/page_3.png",
  usa: "/images/brochure/page_3.png",
  australia: "/images/brochure/page_3.png",
  finland: "/images/brochure/page_4.png",
  lithuania: "/images/brochure/page_4.png",
  "south-korea": "/images/brochure/page_4.png",
  japan: "/images/brochure/page_5.png",
  india: "/images/brochure/page_5.png",
  malta: "/images/brochure/page_2.png",
  dubai: "/images/brochure/page_2.png",
};

export function CountryDetailPage({ country }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const transitionContext = useContext(TransitionContext);

  useEffect(() => {
    setActiveFaq(null);
    const sidebar = document.querySelector('.country-sidebar');
    if (sidebar) {
      sidebar.scrollTop = 0;
    }
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

  const brochurePage = brochurePageMap[country.slug] || null;

  return (
    <main style={{ fontFamily: "var(--display-font)", "--country-color": country.accent }}>
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
        .country-sidebar-item .flag-code {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.05em;
          font-family: var(--display-font);
          transition: transform 0.2s ease;
        }
        .country-sidebar-item.active .flag-code {
          transform: scale(1.1);
        }
      `}} />
      <section className="country-hero-banner">
        <div className="country-hero-banner-inner">
          <h1>{country.code === "US" ? "United States" : country.code === "UK" ? "United Kingdom" : country.name}</h1>
        </div>
        <div className="country-hero-banner-graphic">
          <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Spinning Globe Graphic */}
            <g className="spinning-globe" style={{ transformOrigin: "580px 200px" }}>
              <circle cx="580" cy="200" r="160" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15"/>
              <circle cx="580" cy="200" r="100" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.1"/>
              <ellipse cx="580" cy="200" rx="160" ry="60" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15"/>
              <ellipse cx="580" cy="200" rx="60" ry="160" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15"/>
              <path d="M420 200 H740" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15" />
              <path d="M580 40 V360" stroke="white" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.15" />
            </g>
            
            {/* Orbit track for revolving airplane */}
            <circle cx="580" cy="200" r="130" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.08" />
            
            {/* Revolving Airplane */}
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
            {sortedCountries.map((c) => (
              <AppLink
                key={c.slug}
                to={`/destinations/${c.slug}`}
                className={`country-sidebar-item ${c.slug === country.slug ? "active" : ""}`}
                style={{ "--country-color": c.accent }}
                onClick={(e) => {
                  if (transitionContext) {
                    e.preventDefault();
                    transitionContext.startTransition(c, `/destinations/${c.slug}`);
                  }
                }}
              >
                <div className="country-sidebar-flag-wrapper">
                  <span className="flag-code" style={{ zIndex: 2 }}>{c.code === "UK" ? "GB" : c.code}</span>
                  <svg className="sidebar-airplane-loop" viewBox="0 0 40 40" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.25"/>
                    <g className="sidebar-looping-plane-group" style={{ transformOrigin: "20px 20px" }}>
                      <g transform="translate(20, 6) scale(0.7)">
                        <path d="M-4,-1 L2,-1 L0,-4 L1,-4 L3,-1 L5,-1 C6,-1 7,-0.5 7,0 C7,0.5 6,1 5,1 L3,1 L1,4 L0,4 L2,1 L-4,1 Z" fill="currentColor"/>
                      </g>
                    </g>
                  </svg>
                </div>
                <span style={{ fontWeight: 700 }}>{c.code === "US" ? "USA" : c.code === "UK" ? "UK" : c.name}</span>
              </AppLink>
            ))}
          </div>
        </aside>

        {/* Right Column: Main Country Content */}
        <div className="country-content-wrapper">
          
          {/* Section 1: Intro Copy */}
          <section className="country-intro-section">
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
          <section className="fast-facts-section">
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
          <section className="courses-section-v2">
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
            <section className="directory-table-section">
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
            <section className="university-showcase-section">
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
          <section className="why-study-section-v2">
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
            <section className="requirements-section-v2">
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
            <section className="requirements-fallback-section">
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
            <section className="intakes-section-v2">
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
            <section className="costs-section-v2">
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
            <section className="scholarships-section-v2">
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
          <section className="faq-section-v2">
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
