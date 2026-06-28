"use client";

import { useEffect, useState, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { assets } from "../data/assets.js";
import { countries } from "../data/countries.js";
import { testCourses } from "../data/testCourses.js";
import { services } from "../data/services.js";
import { blogs } from "../data/blogs.js";
import { site } from "../data/site.js";
import { ProcessIcon } from "../components/ProcessIcons.jsx";
import {
  GraduationCap,
  ShieldCheck,
  Headphones,
  Send,
  Users,
  Landmark,
  Star,
  Heart,
  ArrowRight,
  ArrowUpRight,
  Globe,
  BookOpen,
  Check,
  ChevronDown,
  Play
} from "lucide-react";

/* ─────────────────── DYNAMIC COUNT-UP SUB-COMPONENT ─────────────────── */
function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeProgress = percentage * (2 - percentage);
      setCount(Math.floor(easeProgress * end));
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
}

/* ─────────────────── SECTION WRAPPERS & DETAILS ─────────────────── */

export function HomePage({ navigate }) {
  const getCountryFlag = (slug) => {
    const flagMap = {
      australia: { type: 'img', src: '/austraylia-420x420.jpg' },
      uk: { type: 'img', src: '/uk-420x420.jpg' },
      usa: { type: 'img', src: '/usa-1-420x420.jpg' },
      finland: { type: 'img', src: '/finland.png' },
      lithuania: { type: 'img', src: '/luthinia.png' },
      malta: { type: 'img', src: '/malta.jfif' },
      india: { type: 'img', src: '/india.png' },
      dubai: { type: 'img', src: '/dubai.png' },
      "south-korea": { type: 'img', src: '/south-korea.png' },
      japan: { type: 'emoji', char: '🇯🇵' }
    };
    return flagMap[slug] || { type: 'emoji', char: '🌍' };
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [visaActivePage, setVisaActivePage] = useState(0);
  const [activeCountry, setActiveCountry] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Hero slideshow slides data
  const slidesData = [
    {
      image: assets.heroGlobal,
      title: "Explore Your Dreams Overseas",
      subtitle: "Turn your aspirations into reality with our expert guidance, transparent counseling process, and extensive partner university network in Australia, Canada, the UK, the USA, and Dubai.",
      eyebrow: "🏆 14+ Years of Trust",
      align: "left"
    },
    {
      image: assets.heroEurope,
      title: "Quality European Education",
      subtitle: "Explore world-class academic institutions in Finland, Lithuania, Malta, and across Europe with affordable tuition and standard-of-living benefits.",
      eyebrow: "🇪🇺 Top European Universities",
      align: "right"
    },
    {
      image: assets.heroAsia,
      title: "Your Gateway to Asia-Pacific",
      subtitle: "Secure direct admission and scholarships at prestigious universities in Japan, South Korea, India, and New Zealand with comprehensive preparation.",
      eyebrow: "🌏 Prestigious Asia-Pacific Pathways",
      align: "left"
    }
  ];

  // Visa services data
  const visaServices = [
    {
      badge: "SERVICE 01",
      title: "Visa Counseling & Eligibility Assessment",
      image: assets.counselling
    },
    {
      badge: "SERVICE 02",
      title: "Document Preparation & SOP Guidance",
      image: assets.testPrep
    },
    {
      badge: "SERVICE 03",
      title: "Visa Application Filing & Support",
      image: assets.success
    },
    {
      badge: "SERVICE 04",
      title: "Embassy Visa Interview Preparation",
      image: assets.destinations
    }
  ];



  // FAQ list data
  const faqData = [
    {
      q: "What services does EduMark provide?",
      a: "EduMark provides complete end-to-end support for international education: including certified career counseling, university and course selection, application assistance, documentation checks, visa filing support, pre-departure orientation, and accommodation guidance."
    },
    {
      q: "Is IELTS mandatory for studying in the UK or Australia?",
      a: "Not always. Many universities accept alternative tests like PTE Academic or TOEFL. In some cases, universities offer English proficiency waivers if you achieved high grades in your high school English board exams. We will review your profile to find suitable pathways."
    },
    {
      q: "What documents are required for university applications?",
      a: "Standard requirements include your high school and college transcripts/certificates, character certificates, a valid passport copy, a Statement of Purpose (SOP), recommendation letters, and English proficiency test scores (IELTS/PTE)."
    },
    {
      q: "How does EduMark help with the student visa interview?",
      a: "We conduct intensive, personalized mock interview sessions replicating the exact environment of embassies (such as the US or Australian high commission). We guide you on articulating your goals, explaining finances, and demonstrating genuine student intent."
    }
  ];

  // Accreditations/Badges
  const awardsList = [
    { name: "Ministry Approved", desc: "Approved by Ministry of Education, Nepal" },
    { name: "ECAN Member", desc: "Educational Consultancy Association of Nepal" },
    { name: "TITI Certified", desc: "Training Institute for Technical Instruction" },
    { name: "ICEF Screened", desc: "Global Educator Accreditation Network" },
    { name: "14+ Years Legacy", desc: "Guiding students successfully since 2012" },
    { name: "500+ Partner Universities", desc: "Direct institutional collaborations globally" }
  ];

  useEffect(() => {
    // Autoplay slideshow timer
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);

    // Scroll listener for scroll-to-top button
    const handleScrollTopBtn = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScrollTopBtn);
    return () => {
      clearInterval(slideTimer);
      window.removeEventListener("scroll", handleScrollTopBtn);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main style={{ background: "var(--white)", position: "relative" }}>
      
      {/* 1. HERO SLIDESHOW BANNER */}
      <section className="hero-fullscreen">
        <div className="hero-slides-container">
          {slidesData.map((slide, idx) => (
            <div
              key={idx}
              className={`hero-slide ${idx === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
        </div>
        <div className="hero-dark-overlay" />

        <div className="hero-fullscreen-container">
          {slidesData.map((slide, idx) => (
            idx === currentSlide && (
              <div 
                key={idx} 
                className={`hero-fullscreen-content animate-slide-up ${slide.align === "right" ? "right-align" : ""}`}
              >
                <span className="em-eyebrow" style={{ color: "var(--accent-orange-red)", background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: "4px" }}>
                  {slide.eyebrow}
                </span>
                <h1 className="hero-fullscreen-title" style={{ marginTop: "10px" }}>
                  {slide.title}
                </h1>
                <p className="hero-fullscreen-subtitle">
                  {slide.subtitle}
                </p>
                <div className="hero-fullscreen-actions">
                  <AppLink to="/book-free-consultation" navigate={navigate} className="hero-btn-primary">
                    Book Free Counseling
                    <ArrowRight size={16} />
                  </AppLink>
                  <AppLink to="/destinations" navigate={navigate} className="hero-btn-secondary">
                    Explore Destinations
                  </AppLink>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="hero-dots-pagination">
          {slidesData.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot ${idx === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. ABOUT US / STATS BAND */}
      <section className="about-stats-section">
        <div className="about-stats-grid">
          
          {/* Left: Stacked images and stats widget */}
          <div className="about-stats-left">
            <div className="about-image-stack">
              <img src={assets.counselling} alt="EduMark Office Counseling" className="about-img-1" />
              <img src={assets.success} alt="EduMark Student Success Story" className="about-img-2" />
            </div>

            {/* Circular Donut Widget */}
            <div className="about-donut-widget">
              <div className="about-donut-icon">
                <svg width="40" height="40" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="var(--secondary-fill)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="var(--accent-orange-red)" strokeWidth="3" strokeDasharray="98 2" strokeDashoffset="25" />
                  <text x="18" y="20.5" fontSize="7.5" fontWeight="800" textAnchor="middle" fill="var(--primary-navy)">98%</text>
                </svg>
              </div>
              <div className="about-donut-info">
                <h4>10,000+ Placements</h4>
                <p>98% Successful Visas</p>
              </div>
            </div>
          </div>

          {/* Right: Description & Underline Decoration */}
          <div className="about-stats-right">
            <div className="em-section-title-wrapper left">
              <span className="em-eyebrow">✈ ABOUT US</span>
              <h2 className="em-h2">
                EduMark Educational <span className="em-h2-light">Consultancy</span>
              </h2>
              <span className="em-title-line-decor" />
            </div>

            <p className="about-stats-text">
              Since 2012, EduMark has been a guiding lighthouse for students across Koshi Province seeking international academic excellence. Based in Traffic Chowk, Biratnagar, we are fully approved by the Ministry of Education and staffed with certified counselors. 
              <br /><br />
              We believe in building careers rather than just processing documents. Through our institutional relationships with over 500 universities in the UK, USA, Australia, Japan, and Europe, we provide genuine, transparent, and step-by-step guidance.
            </p>

            <AppLink to="/about" navigate={navigate} className="learn-more-btn">
              Learn More About Us
            </AppLink>
          </div>

        </div>
      </section>

      {/* 3. VISA SERVICES SECTION */}
      <section className="visa-services-section">
        <div className="visa-services-container">
          
          <div className="em-section-title-wrapper">
            <span className="em-eyebrow">✈ VISA SERVICES</span>
            <h2 className="em-h2">We Provide The Best Consultancy Services</h2>
            <span className="em-title-line-decor" />
          </div>

          <div className="visa-slider-wrapper">
            <div 
              className="visa-slider-track"
              style={{ transform: `translateX(-${visaActivePage * 50}%)` }}
            >
              {visaServices.map((svc, idx) => (
                <div 
                  key={idx} 
                  className="visa-card-v2"
                  onClick={() => navigate("/services")}
                >
                  <div className="visa-card-bg" style={{ backgroundImage: `url(${svc.image})` }} />
                  <div className="visa-card-overlay">
                    <span className="visa-card-badge">{svc.badge}</span>
                    <div className="visa-card-bottom">
                      <h3 className="visa-card-title">{svc.title}</h3>
                      <button className="visa-card-arrow-btn" aria-label="View Details">
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Pagination */}
          <div className="visa-slider-pagination">
            <button 
              className={`visa-pagination-dot ${visaActivePage === 0 ? "active" : ""}`}
              onClick={() => setVisaActivePage(0)}
              aria-label="Visa services page 1"
            />
            <button 
              className={`visa-pagination-dot ${visaActivePage === 1 ? "active" : ""}`}
              onClick={() => setVisaActivePage(1)}
              aria-label="Visa services page 2"
            />
          </div>

        </div>
      </section>

      {/* 4. STUDY DESTINATIONS SECTION */}
      <section className="destinations-two-column-section">
        <div className="destinations-two-column-container">
          
          <div className="em-section-title-wrapper">
            <span className="em-eyebrow">✈ STUDY DESTINATIONS</span>
            <h2 className="em-h2">Select the Country of Your Choice</h2>
            <span className="em-title-line-decor" />
          </div>

          {/* Desktop Horizontal Accordion Layout */}
          <div className="destinations-accordion-wrapper">
            {countries.map((country, idx) => {
              const isActive = idx === activeCountry;
              const flagInfo = getCountryFlag(country.slug);
              const flagEl = flagInfo.type === 'img' ? (
                <img src={flagInfo.src} alt={`${country.name} Flag`} className="dest-tab-flag-img" />
              ) : (
                <span style={{ fontSize: '16px', lineHeight: '1' }}>{flagInfo.char}</span>
              );

              // Calculate panel width dynamically to trigger smooth transitions:
              // Active panel gets the remaining width after subtraction of all inactive tab widths (50px each)
              const panelWidth = isActive ? `calc(100% - ${(countries.length - 1) * 50}px)` : '50px';

              if (!isActive) {
                return (
                  <div
                    key={country.slug}
                    className="dest-horizontal-panel inactive"
                    onClick={() => setActiveCountry(idx)}
                    style={{ width: panelWidth }}
                  >
                    <span className="dest-tab-text">
                      {country.slug === "usa" ? "USA" : country.slug === "uk" ? "UK" : country.name}
                    </span>
                    <div className="dest-tab-flag-circle">
                      {flagEl}
                    </div>
                  </div>
                );
              } else {
                const scholarships = country.scholarshipsList || [];
                const whyPoints = country.why || [];
                const displayList = scholarships.length > 0 ? scholarships.map(s => s.name) : whyPoints;

                return (
                  <div
                    key={country.slug}
                    className="dest-horizontal-panel active"
                    style={{ width: panelWidth, "--country-color": country.accent }}
                  >
                    {/* Expanded content details */}
                    <div className="dest-active-content-panel">
                      <div className="dest-details-left-content">
                        <span className="dest-details-eyebrow" style={{ color: country.accent }}>
                          {country.name}
                        </span>
                        <h3 className="dest-details-title">
                          Study in {country.name}
                        </h3>
                        <h4 className="dest-details-subtitle">
                          {scholarships.length > 0 ? `Scholarship Opportunities in ${country.name}` : `Why Study in ${country.name}`}
                        </h4>

                        <div className="dest-details-list">
                          {displayList.slice(0, 6).map((item, pIdx) => (
                            <div key={pIdx} className="dest-details-item">
                              <div className="dest-details-check">
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <AppLink
                          to={`/destinations/${country.slug}`}
                          navigate={navigate}
                          className="hero-btn-primary"
                          style={{ alignSelf: 'flex-start' }}
                        >
                          Explore More
                          <ArrowRight size={15} />
                        </AppLink>
                      </div>

                      {/* Large Circular Flag */}
                      <div className="dest-large-flag-container">
                        <div className="dest-large-flag-circle">
                          {flagInfo.type === 'img' ? (
                            <img src={flagInfo.src} alt={`${country.name} Flag`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span style={{ fontSize: '100px', lineHeight: '1' }}>{flagInfo.char}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Mobile responsive tabs scroll container */}
          <div className="dest-mobile-tabs-container">
            {(() => {
              const selectedCountry = countries[activeCountry] || countries[0];
              const scholarships = selectedCountry.scholarshipsList || [];
              const whyPoints = selectedCountry.why || [];
              const displayList = scholarships.length > 0 ? scholarships.map(s => s.name) : whyPoints;

              return (
                <>
                  <div className="dest-mobile-tabs-scroll">
                    {countries.map((country, idx) => {
                      const fInfo = getCountryFlag(country.slug);
                      const fEl = fInfo.type === 'img' ? (
                        <img src={fInfo.src} alt="" style={{ width: '18px', height: '18px', objectFit: 'cover', borderRadius: '50%' }} />
                      ) : (
                        <span>{fInfo.char}</span>
                      );
                      const displayName = country.slug === "usa" ? "USA" : country.slug === "uk" ? "UK" : country.name;

                      return (
                        <button
                          key={country.slug}
                          className={`dest-mobile-tab-btn ${idx === activeCountry ? "active" : ""}`}
                          onClick={() => setActiveCountry(idx)}
                        >
                          <span className="dest-mobile-flag">{fEl}</span>
                          <span>{displayName}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="dest-details-panel">
                    <span className="dest-details-eyebrow" style={{ color: selectedCountry.accent }}>
                      {selectedCountry.name}
                    </span>
                    <h3 className="dest-details-title">Study in {selectedCountry.name}</h3>
                    <h4 className="dest-details-subtitle">
                      {scholarships.length > 0 ? `Scholarship Opportunities in ${selectedCountry.name}` : `Why Study in ${selectedCountry.name}`}
                    </h4>
                    
                    <div className="dest-details-list">
                      {displayList.slice(0, 4).map((item, pIdx) => (
                        <div key={pIdx} className="dest-details-item">
                          <div className="dest-details-check">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <AppLink 
                      to={`/destinations/${selectedCountry.slug}`} 
                      navigate={navigate}
                      className="hero-btn-primary" 
                      style={{ marginTop: "16px", alignSelf: "flex-start" }}
                    >
                      Explore More
                      <ArrowRight size={15} />
                    </AppLink>
                  </div>
                </>
              );
            })()}
          </div>

        </div>
      </section>

      {/* 5. PREPARATION CLASSES SECTION */}
      <section className="prep-classes-section">
        <div className="prep-classes-container">
          
          <div className="em-section-title-wrapper">
            <span className="em-eyebrow">✈ TEST PREPARATION</span>
            <h2 className="em-h2">Get the Best Score with Certified Teachers & Weekly Mock Tests</h2>
            <span className="em-title-line-decor" />
          </div>

          <div className="prep-classes-grid">
            {testCourses.map((course) => {
              const features = course.features || ["Certified Teachers", "Weekly Mock Tests"];
              
              return (
                <div key={course.slug} className="prep-class-card">
                  <div className="prep-class-card-top">
                    <span className="prep-class-card-badge">{course.score || "Exam Prep"}</span>
                    <h3 className="prep-class-card-title">{course.name}</h3>
                    <h4 className="prep-class-card-subtitle">{course.fullName}</h4>
                    <p className="prep-class-card-desc">{course.overview}</p>
                    
                    <div className="prep-class-card-highlights">
                      <div className="prep-class-card-highlight-item">
                        <span>✔</span> Certified Teachers
                      </div>
                      <div className="prep-class-card-highlight-item">
                        <span>✔</span> Weekly Mock Tests
                      </div>
                      {features.slice(2, 4).map((f, idx) => (
                        <div key={idx} className="prep-class-card-highlight-item">
                          <span>✔</span> {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <AppLink 
                    to={`/test-preparation/${course.slug}`} 
                    navigate={navigate}
                    className="prep-class-card-btn"
                  >
                    Explore Course Details &rarr;
                  </AppLink>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. PREMIUM MAP & STATISTICS SECTION */}
      <section className="map-stats-section">
        <div className="map-stats-container">
          
          {/* Left Column: Title and Description */}
          <div className="map-stats-left">
            <span className="map-stats-eyebrow">🌍 Overseas Presence</span>
            <h2 className="map-stats-title">Accelerating your academic growth overseas</h2>
            <p className="map-stats-desc">
              Our certified education consultants at EduMark support you with excellence in career guidance and student visa processing from Biratnagar, Nepal. Established in 2012, we are MOEST-approved and ECAN-affiliated, serving as Koshi Province's leading bridge to premier global destinations including the UK, USA, Australia, Japan, Finland, Lithuania, South Korea, Malta, Dubai, and India.
            </p>
          </div>

          {/* Right Column: World Map with Pulsing Pins */}
          <div className="map-stats-right">
            <div className="map-stats-map-wrapper">
              <img 
                src={assets.worldMap} 
                alt="EduMark Destination Countries Map" 
                className="map-stats-map-img" 
              />
              
              {/* Map Pins */}
              {[
                { name: "United States", top: "41.5%", left: "21.5%", status: "Scholarships Available" },
                { name: "United Kingdom", top: "38.5%", left: "46.9%", status: "Direct Admission" },
                { name: "Finland", top: "34.5%", left: "53.2%", status: "Top Education System" },
                { name: "Lithuania", top: "38.0%", left: "53.8%", status: "Affordable Tuition" },
                { name: "Malta", top: "44.5%", left: "49.5%", status: "European Gateway" },
                { name: "Dubai (UAE)", top: "47.8%", left: "59.5%", status: "Global Work Hub" },
                { name: "India", top: "51.4%", left: "67.2%", status: "Ranked Universities" },
                { name: "Japan", top: "44.0%", left: "84.5%", status: "Language Prep & Work" },
                { name: "South Korea", top: "46.2%", left: "81.0%", status: "High Visa Rate" },
                { name: "Australia", top: "67.0%", left: "83.5%", status: "Post-Study Work Visa" },
              ].map((pin, index) => (
                <div 
                  key={index} 
                  className="map-pin-marker" 
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className="map-pin-dot" />
                  <div className="map-pin-pulse" />
                  <div className="map-pin-tooltip">
                    {pin.name}
                    <span className="map-pin-tooltip-status">{pin.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <hr className="map-stats-divider" />

        {/* Bottom Column: Stats Cards */}
        <div className="map-stats-bottom">
          <div className="map-stats-card">
            <span className="map-stats-card-label">International Students Assisted</span>
            <div className="map-stats-card-number">
              <AnimatedCounter end={10000} />+
            </div>
          </div>

          <div className="map-stats-card">
            <span className="map-stats-card-label">Scholarships Approved</span>
            <div className="map-stats-card-number">
              <AnimatedCounter end={1800} />+
            </div>
          </div>

          <div className="map-stats-card">
            <span className="map-stats-card-label">Enrolled in IELTS/PTE Preparation Classes</span>
            <div className="map-stats-card-number">
              <AnimatedCounter end={8000} />+
            </div>
          </div>
        </div>
      </section>


      {/* 7. WHY CHOOSE US SECTION */}
      <section className="why-choose-section">
        <div className="why-choose-grid">
          
          <div className="why-choose-left">
            <div className="em-section-title-wrapper left">
              <span className="em-eyebrow">✈ WHY CHOOSE US</span>
              <h2 className="em-h2">Reasons To Choose Us</h2>
              <span className="em-title-line-decor" />
            </div>

            <div className="why-choose-list">
              <div className="why-choose-item">
                <div className="why-choose-check"><Check size={14} strokeWidth={3} /></div>
                <span className="why-choose-text">Approved by the Ministry of Education (MOEST) & ECAN Member</span>
              </div>
              <div className="why-choose-item">
                <div className="why-choose-check"><Check size={14} strokeWidth={3} /></div>
                <span className="why-choose-text">Certified & experienced counselors with TITI credentials</span>
              </div>
              <div className="why-choose-item">
                <div className="why-choose-check"><Check size={14} strokeWidth={3} /></div>
                <span className="why-choose-text">Proven track record of high student visa approvals since 2012</span>
              </div>
              <div className="why-choose-item">
                <div className="why-choose-check"><Check size={14} strokeWidth={3} /></div>
                <span className="why-choose-text">Comprehensive SOP review, CV mapping, and documentation checking</span>
              </div>
              <div className="why-choose-item">
                <div className="why-choose-check"><Check size={14} strokeWidth={3} /></div>
                <span className="why-choose-text">100% transparent counseling with zero hidden agency costs</span>
              </div>
              <div className="why-choose-item">
                <div className="why-choose-check"><Check size={14} strokeWidth={3} /></div>
                <span className="why-choose-text">Pre-departure briefings and post-arrival emergency contact network</span>
              </div>
            </div>
          </div>

          <div className="why-choose-right">
            <img src="/images/brochure/why-choose-us.jpg" alt="Successful EduMark Student" className="why-choose-photo" />
          </div>

        </div>
      </section>

      {/* 8. STEP-BY-STEP PROCESS TIMELINE */}
      <section className="visa-process-section">
        <div className="visa-process-container">
          
          <div className="em-section-title-wrapper">
            <span className="em-eyebrow">✈ STEP-BY-STEP PROCESS</span>
            <h2 className="em-h2">Our Guided Admission & Visa Workflow</h2>
            <span className="em-title-line-decor" />
          </div>

          <div className="process-timeline-wrapper">
            <div className="process-timeline-line" />
            
            <div className="process-timeline-steps">
              <div className="process-timeline-step">
                <div className="process-step-photo">
                  <span className="process-step-num">1</span>
                  <img src={assets.counselling} alt="Free Counseling" />
                </div>
                <h4 className="process-step-title">Free Counseling</h4>
              </div>

              <div className="process-timeline-step">
                <div className="process-step-photo">
                  <span className="process-step-num">2</span>
                  <img src={assets.destinations} alt="Country Selection" />
                </div>
                <h4 className="process-step-title">Country & Course Selection</h4>
              </div>

              <div className="process-timeline-step">
                <div className="process-step-photo">
                  <span className="process-step-num">3</span>
                  <img src={assets.heroGenerated} alt="Application" />
                </div>
                <h4 className="process-step-title">Application Submission</h4>
              </div>

              <div className="process-timeline-step">
                <div className="process-step-photo">
                  <span className="process-step-num">4</span>
                  <img src={assets.testPrep} alt="Documentation" />
                </div>
                <h4 className="process-step-title">Offer Letter & Docs</h4>
              </div>

              <div className="process-timeline-step">
                <div className="process-step-photo">
                  <span className="process-step-num">5</span>
                  <img src={assets.success} alt="Visa Processing" />
                </div>
                <h4 className="process-step-title">Visa Processing</h4>
              </div>

              <div className="process-timeline-step">
                <div className="process-step-photo">
                  <span className="process-step-num">6</span>
                  <img src={assets.brochureHero} alt="Departure" />
                </div>
                <h4 className="process-step-title">Fly Abroad ✈</h4>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. VIDEO GALLERY */}
      <section className="video-gallery-section">
        <div className="video-gallery-container">
          
          <div className="em-section-title-wrapper">
            <span className="em-eyebrow">✈ VIDEO GALLERY</span>
            <h2 className="em-h2">Hear From Our Successful Students</h2>
            <span className="em-title-line-decor" />
          </div>

          <div className="video-grid">
            <div className="video-card">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="EduMark Student Review 1"
                allowFullScreen
              />
            </div>
            <div className="video-card">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="EduMark Student Review 2"
                allowFullScreen
              />
            </div>
            <div className="video-card">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="EduMark Testimonial 3"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="faq-accordion-section">
        <div className="faq-accordion-container">
          
          <div className="em-section-title-wrapper">
            <span className="em-eyebrow">✈ FAQ</span>
            <h2 className="em-h2">Clear Your Doubts Before Beginning</h2>
            <span className="em-title-line-decor" />
          </div>

          <div className="faq-accordion-list">
            {faqData.map((item, idx) => (
              <div 
                key={idx}
                className={`faq-accordion-item ${activeFaq === idx ? "active" : ""}`}
              >
                <button 
                  className="faq-accordion-header"
                  onClick={() => setActiveFaq(idx === activeFaq ? -1 : idx)}
                  aria-expanded={activeFaq === idx}
                >
                  <h3>{item.q}</h3>
                  <ChevronDown size={16} className="faq-accordion-chevron" />
                </button>

                <div className="faq-accordion-collapse">
                  <div className="faq-accordion-content">
                    {item.a}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. LATEST BLOGS PREVIEW */}
      <section className="latest-blog-section">
        <div className="latest-blog-container">
          
          <div className="em-section-title-wrapper">
            <span className="em-eyebrow">✈ LATEST BLOGS</span>
            <h2 className="em-h2">Latest Insights & Updates</h2>
            <span className="em-title-line-decor" />
          </div>

          <div className="blog-grid-v2">
            {blogs.slice(0, 3).map((blog, idx) => (
              <article 
                key={blog.slug} 
                className="blog-card-v2"
                onClick={() => navigate(`/blogs/${blog.slug}`)}
              >
                <div className="blog-card-img">
                  <img src={`/images/generated/destination${(idx % 3) + 1}.jpg`} alt={blog.title} />
                  <span className="blog-card-date-badge">{blog.date.split(" ")[0]} {blog.date.split(" ")[1]}</span>
                </div>
                <div className="blog-card-body">
                  <span className="blog-card-tag">{blog.category}</span>
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <AppLink to={`/blogs/${blog.slug}`} navigate={navigate} className="blog-card-link">
                    Read More <ArrowRight size={13} />
                  </AppLink>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 12. AWARDS / ACCREDITATIONS GRID */}
      <section className="awards-section">
        <div className="awards-container">
          
          <div className="em-section-title-wrapper">
            <span className="em-eyebrow">✈ ACCREDITATIONS</span>
            <h2 className="em-h2">Recognitions & Trust Badges</h2>
            <span className="em-title-line-decor" />
          </div>

          <div className="awards-grid">
            {awardsList.map((item, idx) => (
              <div key={idx} className="award-box">
                <div style={{ textAlign: "center" }}>
                  <h4 style={{ color: "var(--primary-navy)", margin: "0 0 4px 0", fontSize: "16px", fontWeight: "700" }}>{item.name}</h4>
                  <small style={{ color: "var(--muted)", fontSize: "11px", fontWeight: "500" }}>{item.desc}</small>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="contact-strip-section">
        <div className="contact-strip-container">
          <div className="contact-strip-left">
            <span className="contact-strip-text-logo">
              <strong>EduMark</strong>
              <small>Education Consultancy</small>
            </span>
            <div className="contact-strip-info">
              📞 021-590823 | 9802724823
            </div>
          </div>

          <div className="contact-strip-socials">
            <a href="https://www.facebook.com/EduMarkStudyAbroad" target="_blank" rel="noreferrer" className="contact-strip-icon-btn" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-strip-icon-btn" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="contact-strip-icon-btn" aria-label="Youtube">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* SCROLL TO TOP FLOATING BUTTON */}
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? "visible" : ""}`}
        aria-label="Scroll to top"
      >
        &uarr;
      </button>

    </main>
  );
}
