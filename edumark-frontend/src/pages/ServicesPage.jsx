import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { services } from "../data/services.js";
import { processSteps } from "../data/testimonials.js";

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
          <article key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step}</h3>
          </article>
        ))}
      </div>
      <div className="center-actions">
        <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
          Book a Profile Review
        </AppLink>
      </div>
    </section>
  );
}

export function ServicesPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Everything a student needs before application, visa, and departure"
        text="A complete service experience designed to reduce confusion and keep every requirement visible."
        image={assets.counselling}
      />
      <section className="section service-sections">
        {services.map((service, index) => (
          <article className="service-row" key={service.slug}>
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{service.title}</h2>
              <p>{service.detail}</p>
              <AppLink to={`/services/${service.slug}`} navigate={navigate} className="secondary-button small">
                View Detail
              </AppLink>
            </div>
            <div className="mini-grid">
              {service.bullets.map((bullet) => (
                <small key={bullet}>{bullet}</small>
              ))}
            </div>
          </article>
        ))}
      </section>
      <ProcessSection navigate={navigate} />
    </main>
  );
}
