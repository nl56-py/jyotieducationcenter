"use client";
import { useEffect, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { BulletList } from "../components/BulletList.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { InquiryBand } from "../components/InquiryBand.jsx";
import { assets } from "../data/assets.js";

export function CountryDetailPage({ country }) {
  const sectionRef = useRef(null);

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

  return (
    <main ref={sectionRef} style={{ overflow: "hidden" }}>
      <div className="animate-on-scroll">
        <PageHero
          eyebrow={`${country.name} Study Route`}
          title={`Study in ${country.name} with a plan built around your profile`}
          text={country.highlight}
          image={country.region === "European" ? assets.europe : assets.destinations}
        />
      </div>

      <section className="section detail-grid animate-on-scroll">
        <article className="animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
          <span>Intakes</span>
          <h2>{country.intake}</h2>
          <p>EduMark checks deadlines, document readiness, and offer timing before the student commits.</p>
        </article>
        <article className="animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
          <span>Estimated Cost</span>
          <h2>{country.cost}</h2>
          <p>Cost planning includes tuition, living expense assumptions, deposits, and evidence requirements.</p>
        </article>
        <article className="animate-on-scroll" style={{ transitionDelay: "0.3s" }}>
          <span>Popular Courses</span>
          <h2>{country.programs}</h2>
          <p>Program matching considers budget, academic background, visa story, and career direction.</p>
        </article>
      </section>

      <section className="section split-section animate-on-scroll">
        <div>
          <SectionIntro eyebrow={`Why ${country.name}`} title="A route worth comparing" text={country.highlight} />
          <BulletList items={country.why} />
        </div>
        <div className="info-panel animate-on-scroll" style={{ transitionDelay: "0.15s" }}>
          <span>Popular Institutions</span>
          {country.universities.map((university) => (
            <strong key={university}>{university}</strong>
          ))}
        </div>
      </section>

      <section className="section animate-on-scroll">
        <SectionIntro
          eyebrow="Application And Visa"
          title="Route support from shortlist to departure"
          text="The same readable template is used across all country pages so students can compare routes quickly."
        />
        <div className="feature-grid">
          {country.visa.map((item, i) => (
            <article
              key={item}
              className="animate-on-scroll"
              style={{ transitionDelay: `${(i % 4) * 0.15}s` }}
            >
              <h3>{item}</h3>
              <p>EduMark keeps the requirement visible and turns it into a step-by-step action list.</p>
            </article>
          ))}
        </div>
      </section>

      {country.specialTitle ? (
        <section className="section callout-panel animate-on-scroll">
          <div>
            <span>{country.region} Route</span>
            <h2>{country.specialTitle}</h2>
            <p>{country.specialText}</p>
          </div>
          <div className="module-grid">
            {country.specialPoints.map((point, i) => (
              <small
                key={point}
                className="animate-on-scroll"
                style={{ transitionDelay: `${(i % 6) * 0.1}s` }}
              >
                {point}
              </small>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section faq-list animate-on-scroll">
        <SectionIntro eyebrow="FAQs" title={`${country.name} questions students ask`} />
        {country.faq.map(([question, answer], i) => (
          <article
            key={question}
            className="animate-on-scroll"
            style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
          >
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </section>

      <div className="animate-on-scroll">
        <InquiryBand />
      </div>
    </main>
  );
}
