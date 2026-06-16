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
        <div className="service-cards-grid">

          {/* Card 1 */}
          <article className="service-row" key={services[0].slug} style={{ transitionDelay: '0.1s' }}>
            <div className="service-row-image">
              <img src="/images/services/Career.png" alt={services[0].title} />
              <span className="service-row-badge">01</span>
            </div>
            <div className="service-row-body">
              <h2>{services[0].title}</h2>
              <div className="service-row-underline"></div>
              <p>{services[0].detail}</p>
              <div className="mini-grid">
                {services[0].bullets.map((bullet) => (
                  <small key={bullet}>{bullet}</small>
                ))}
              </div>
              <AppLink to={`/services/${services[0].slug}`} navigate={navigate} className="secondary-button small">
                View Detail
              </AppLink>
            </div>
          </article>

          {/* Card 2 */}
          <article className="service-row" key={services[1].slug} style={{ transitionDelay: '0.2s' }}>
            <div className="service-row-image">
              <img src="/images/services/admission.png" alt={services[1].title} />
              <span className="service-row-badge">02</span>
            </div>
            <div className="service-row-body">
              <h2>{services[1].title}</h2>
              <div className="service-row-underline"></div>
              <p>{services[1].detail}</p>
              <div className="mini-grid">
                {services[1].bullets.map((bullet) => (
                  <small key={bullet}>{bullet}</small>
                ))}
              </div>
              <AppLink to={`/services/${services[1].slug}`} navigate={navigate} className="secondary-button small">
                View Detail
              </AppLink>
            </div>
          </article>

          {/* Card 3 */}
          <article className="service-row" key={services[2].slug} style={{ transitionDelay: '0.3s' }}>
            <div className="service-row-image">
              <img src="/images/services/visa.png" alt={services[2].title} />
              <span className="service-row-badge">03</span>
            </div>
            <div className="service-row-body">
              <h2>{services[2].title}</h2>
              <div className="service-row-underline"></div>
              <p>{services[2].detail}</p>
              <div className="mini-grid">
                {services[2].bullets.map((bullet) => (
                  <small key={bullet}>{bullet}</small>
                ))}
              </div>
              <AppLink to={`/services/${services[2].slug}`} navigate={navigate} className="secondary-button small">
                View Detail
              </AppLink>
            </div>
          </article>

          {/* Card 4 */}
          <article className="service-row" key={services[3].slug} style={{ transitionDelay: '0.1s' }}>
            <div className="service-row-image">
              <img src="/images/services/test.png" alt={services[3].title} />
              <span className="service-row-badge">04</span>
            </div>
            <div className="service-row-body">
              <h2>{services[3].title}</h2>
              <div className="service-row-underline"></div>
              <p>{services[3].detail}</p>
              <div className="mini-grid">
                {services[3].bullets.map((bullet) => (
                  <small key={bullet}>{bullet}</small>
                ))}
              </div>
              <AppLink to={`/services/${services[3].slug}`} navigate={navigate} className="secondary-button small">
                View Detail
              </AppLink>
            </div>
          </article>

          {/* Card 5 */}
          <article className="service-row" key={services[4].slug} style={{ transitionDelay: '0.2s' }}>
            <div className="service-row-image">
              <img src="/images/services/travel.png" alt={services[4].title} />
              <span className="service-row-badge">05</span>
            </div>
            <div className="service-row-body">
              <h2>{services[4].title}</h2>
              <div className="service-row-underline"></div>
              <p>{services[4].detail}</p>
              <div className="mini-grid">
                {services[4].bullets.map((bullet) => (
                  <small key={bullet}>{bullet}</small>
                ))}
              </div>
              <AppLink to={`/services/${services[4].slug}`} navigate={navigate} className="secondary-button small">
                View Detail
              </AppLink>
            </div>
          </article>

          {/* Card 6 */}
          <article className="service-row" key={services[5].slug} style={{ transitionDelay: '0.3s' }}>
            <div className="service-row-image">
              <img src="/images/services/pre-departure.png" alt={services[5].title} />
              <span className="service-row-badge">06</span>
            </div>
            <div className="service-row-body">
              <h2>{services[5].title}</h2>
              <div className="service-row-underline"></div>
              <p>{services[5].detail}</p>
              <div className="mini-grid">
                {services[5].bullets.map((bullet) => (
                  <small key={bullet}>{bullet}</small>
                ))}
              </div>
              <AppLink to={`/services/${services[5].slug}`} navigate={navigate} className="secondary-button small">
                View Detail
              </AppLink>
            </div>
          </article>

        </div>
      </section>
      <ProcessSection navigate={navigate} />
    </main>
  );
}
