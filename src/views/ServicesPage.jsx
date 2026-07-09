import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { services } from "../data/services.js";
import { processSteps } from "../data/testimonials.js";
import { useEffect, useRef } from "react";
import { ProcessIcon } from "../components/ProcessIcons.jsx";


function ProcessSection({ navigate }) {
  return (
    <section className="section process-section">
      <SectionIntro
        eyebrow="Our Process"
        title="A clear student journey with every step visible"
        text="The process follows the official brochure: free counselling, selection, application, offer, visa, and pre-departure."
        align="center"
      />
      <div className="process-grid">
        {processSteps.map((step, index) => (
          <article
            key={`${step.title}-${index}`}
            className="process-card"
            style={{ transitionDelay: `${(index % 6) * 0.1}s` }}
          >
            <span className="process-step-badge">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="process-step-icon">
              <ProcessIcon index={index} />
            </div>

            <h3>{step.title}</h3>

            <div className="process-step-underline"></div>

            <p>{step.text}</p>
          </article>
        ))}
      </div>
      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
          Book a Profile Review
        </AppLink>
      </div>
    </section>
  );
}

export function ServicesPage({ navigate }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const rows = sectionRef.current?.querySelectorAll(".service-row, .process-card");
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
    rows?.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={sectionRef}>
      <section className="services-hero">
        <div className="services-hero-content">
          <span className="section-eyebrow">SERVICES</span>

          <h1>
            Everything a student needs before
            <span> application</span>,
            <span> visa</span>, and
            <span> departure</span>
          </h1>

          <p>
            From career counselling and university selection to visa
            processing and pre-departure support, everything is managed
            through one guided journey.
          </p>

          <div className="hero-highlights">
            <div>🎓 Career Counselling</div>
            <div>🌍 University Selection</div>
            <div>📝 Documentation Support</div>
            <div>✈️ Visa Assistance</div>
          </div>

          <div className="hero-actions">
            <AppLink
              to="/book-free-consultation"
              navigate={navigate}
              className="primary-button"
            >
              Book Free Consultation
            </AppLink>
          </div>

          <div className="hero-stats">
            <div>
              <h3>500+</h3>
              <span>Students Guided</span>
            </div>

            <div>
              <h3>95%</h3>
              <span>Visa Success</span>
            </div>

            <div>
              <h3>50+</h3>
              <span>Partner Universities</span>
            </div>
          </div>
        </div>

        <div className="services-hero-image">
          <img
            src={assets.counselling}
            alt="Student Counselling"
          />

          <div className="floating-card card-1">
            🎓 Study Abroad
          </div>

          <div className="floating-card card-2">
            ✈ Visa Support
          </div>
        </div>
      </section>

      <section className="section service-sections">
        <style>{`
          .service-cards-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 80px !important;
            max-width: 1200px;
            margin: 0 auto;
          }
          .service-row {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 60px !important;
            background: var(--white);
            border: 1px solid var(--line) !important;
            border-radius: 24px !important;
            padding: 40px !important;
            box-shadow: 0 10px 30px rgba(7, 31, 61, 0.03) !important;
            opacity: 1 !important;
            transform: none !important;
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .service-row:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 20px 45px rgba(91, 23, 125, 0.08) !important;
            border-color: rgba(91, 23, 125, 0.2) !important;
          }
          .service-row.reverse {
            flex-direction: row-reverse !important;
          }
          .service-row-image {
            flex: 1 !important;
            height: 340px !important;
            border-radius: 16px !important;
            overflow: hidden !important;
            width: 50% !important;
          }
          .service-row-image img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            transform: none !important;
          }
          .service-row:hover .service-row-image img {
            transform: scale(1.03) !important;
          }
          .service-row-body {
            flex: 1.15 !important;
            padding: 0 !important;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .service-row-body h2 {
            font-size: 28px !important;
            font-weight: 800 !important;
            color: var(--navy) !important;
            margin-bottom: 8px !important;
          }
          .service-row-body p {
            font-size: 15px !important;
            line-height: 1.75 !important;
            color: var(--muted) !important;
            margin-bottom: 20px !important;
            text-align: left !important;
          }
          .mini-grid {
            margin-bottom: 24px !important;
          }
          .service-row .secondary-button {
            border-radius: 10px !important;
            font-size: 14px !important;
            padding: 0 26px !important;
            height: 48px !important;
          }
          .service-charges-container {
            max-width: 1200px;
            margin: 0 auto 60px;
            background: linear-gradient(135deg, var(--white), var(--surface-mist));
            border: 1px solid var(--line);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(7, 31, 61, 0.02);
          }
          .service-charges-header {
            margin-bottom: 24px;
            text-align: left;
          }
          .service-charges-header h2 {
            font-size: 26px;
            font-weight: 800;
            color: var(--navy);
            margin: 0 0 8px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .service-charges-header p {
            font-size: 14px;
            color: var(--muted);
            margin: 0;
          }
          .charges-table-wrapper {
            overflow-x: auto;
            border-radius: 16px;
            border: 1px solid var(--line);
            background: var(--white);
          }
          .charges-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 14px;
          }
          .charges-table th {
            background: rgba(23, 21, 111, 0.04);
            color: var(--navy);
            font-weight: 800;
            padding: 16px 24px;
            border-bottom: 2px solid var(--line);
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
          }
          .charges-table td {
            padding: 18px 24px;
            border-bottom: 1px solid var(--line);
            color: var(--navy);
            font-weight: 500;
            vertical-align: middle;
          }
          .charges-table tr:last-child td {
            border-bottom: none;
          }
          .charges-table tr:hover {
            background: rgba(91, 23, 125, 0.02);
          }
          .badge-free {
            background: #dcfce7;
            color: #15803d;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            display: inline-block;
          }
          .badge-range {
            background: #fef3c7;
            color: #b45309;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            display: inline-block;
          }
          .badge-standard {
            background: #dbeafe;
            color: #1d4ed8;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            display: inline-block;
          }
          @media (max-width: 991px) {
            .service-cards-grid {
              gap: 48px !important;
            }
            .service-row {
              flex-direction: column !important;
              gap: 28px !important;
              padding: 24px !important;
            }
            .service-row.reverse {
              flex-direction: column !important;
            }
            .service-row-image {
              width: 100% !important;
              height: 240px !important;
            }
            .service-row-body h2 {
              font-size: 22px !important;
            }
            .service-charges-container {
              padding: 24px;
              margin-bottom: 40px;
            }
            .service-charges-header h2 {
              font-size: 20px;
            }
            .charges-table th, .charges-table td {
              padding: 12px 16px;
              font-size: 13px;
            }
          }
        `}</style>

        {/* Service Cost / Charges Section */}
        <div className="service-charges-container">
          <div className="service-charges-header">
            <h2>💰 Our Service Charges</h2>
            <p>We believe in absolute transparency. Below is a structured summary of our documentation and service fees.</p>
          </div>
          <div className="charges-table-wrapper">
            <table className="charges-table">
              <thead>
                <tr>
                  <th>Service Category</th>
                  <th>Covered Destinations</th>
                  <th>Pricing & Charges</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span style={{ fontWeight: 700, display: "block" }}>Application & Documentation Support</span>
                    <small style={{ color: "var(--muted)", fontSize: "11px" }}>Includes profile evaluation, drafting, and full filing support</small>
                  </td>
                  <td>All global colleges / general support admissions</td>
                  <td>
                    <span className="badge-standard">NRs. 15,000.00 – NRs. 25,000.00</span>
                    <small style={{ display: "block", fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>*Includes standard VAT</small>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ fontWeight: 700, display: "block" }}>Premium Study Abroad Processing</span>
                    <small style={{ color: "var(--muted)", fontSize: "11px" }}>Complete documentation, mock interviews, and visa filing</small>
                  </td>
                  <td style={{ fontWeight: 700 }}>United Kingdom (UK), USA, Australia, New Zealand, India</td>
                  <td>
                    <span className="badge-free">No Service Charge (Free)</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ fontWeight: 700, display: "block" }}>Specialized Country Processing</span>
                    <small style={{ color: "var(--muted)", fontSize: "11px" }}>Advanced visa counseling, translators, and legal support</small>
                  </td>
                  <td>European Countries, South Korea, Japan</td>
                  <td>
                    <span className="badge-range">NRs. 1,00,000.00 – USD 1,000.00</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="service-cards-grid">

          {services.map((service, index) => {
            const badgeNumber = String(index + 1).padStart(2, "0");
            const imageSrc = service.image || "/images/services/Career.png";
            const isReverse = index % 2 === 1;

            return (
              <article className={`service-row ${isReverse ? "reverse" : ""}`} key={service.slug} style={{ transitionDelay: `${0.1 * ((index % 3) + 1)}s` }}>
                <div className="service-row-image">
                  <img src={imageSrc} alt={service.title} />
                  <span className="service-row-badge">{badgeNumber}</span>
                </div>
                <div className="service-row-body">
                  <h2>{service.title}</h2>
                  <div className="service-row-underline"></div>
                  <p>{service.detail}</p>
                  <div className="mini-grid">
                    {service.bullets.map((bullet) => (
                      <small key={bullet}>{bullet}</small>
                    ))}
                  </div>
                  <AppLink to={`/services/${service.slug}`} navigate={navigate} className="secondary-button small">
                    View Detail
                  </AppLink>
                </div>
              </article>
            );
          })}

        </div>
      </section>
      <ProcessSection navigate={navigate} />
    </main>
  );
}
