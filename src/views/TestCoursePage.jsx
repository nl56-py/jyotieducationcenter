"use client";
import { useEffect, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { BulletList } from "../components/BulletList.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";

export function TestCoursePage({ course }) {
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
  }, [course.slug]);

  return (
    <main ref={sectionRef} style={{ overflow: "hidden" }}>
      {/* PageHero is animated internally or we can wrap it */}
      <div className="animate-on-scroll">
        <PageHero
          eyebrow={`${course.name} Course`}
          title={`${course.name} preparation with guided practice and review`}
          text={`${course.duration} course plan with ${course.score.toLowerCase()}.`}
          image={assets.testPrep}
        />
      </div>

      <section className="section split-section animate-on-scroll">
        <div>
          <SectionIntro eyebrow={`What is ${course.name}?`} title={course.fullName} text={course.overview} />
          <BulletList items={course.characteristics} />
        </div>
        <div className="info-panel">
          <span>Test Types</span>
          {course.types.map((type) => (
            <strong key={type}>{type}</strong>
          ))}
        </div>
      </section>

      <section className="section animate-on-scroll">
        <SectionIntro eyebrow="Exam Format" title="The sections students practice" text="Each page follows the planned IELTS template and adapts it for the selected test." />
        <div className="detail-grid">
          {course.format.map((module, i) => (
            <article
              key={module}
              className="animate-on-scroll"
              style={{ transitionDelay: `${(i % 4) * 0.15}s` }}
            >
              <span>Section</span>
              <h2>{module}</h2>
              <p>Practice sessions include timed drills, feedback, and progress review with the preparation team.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section callout-panel animate-on-scroll">
        <div>
          <span>How EduMark Prepares You</span>
          <h2>{course.name} classes with mocks, feedback, and extra support</h2>
          <p>Students get a structured routine and clear improvement signals before booking the real exam.</p>
        </div>
        <div className="module-grid">
          {course.features.map((feature, i) => (
            <small
              key={feature}
              className="animate-on-scroll"
              style={{ transitionDelay: `${(i % 6) * 0.1}s` }}
            >
              {feature}
            </small>
          ))}
        </div>
      </section>

      <section className="section disclaimer-box animate-on-scroll">
        <h3>Important note</h3>
        <p>
          Test formats, fees, and acceptance rules can change. Students should confirm final requirements with the
          official test body and target institution before booking.
        </p>
        <AppLink to="/book-free-consultation" className="primary-button">
          Enroll For Classes
        </AppLink>
      </section>
    </main>
  );
}
