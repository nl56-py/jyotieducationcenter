import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { BulletList } from "../components/BulletList.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";

export function TestCoursePage({ course, navigate }) {
  return (
    <main>
      <PageHero
        eyebrow={`${course.name} Course`}
        title={`${course.name} preparation with guided practice and review`}
        text={`${course.duration} course plan with ${course.score.toLowerCase()}.`}
        image={assets.testPrep}
      />
      <section className="section split-section">
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
      <section className="section">
        <SectionIntro eyebrow="Exam Format" title="The sections students practice" text="Each page follows the planned IELTS template and adapts it for the selected test." />
        <div className="detail-grid">
          {course.format.map((module) => (
            <article key={module}>
              <span>Section</span>
              <h2>{module}</h2>
              <p>Practice sessions include timed drills, feedback, and progress review with the preparation team.</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section callout-panel">
        <div>
          <span>How EduMark Prepares You</span>
          <h2>{course.name} classes with mocks, feedback, and extra support</h2>
          <p>Students get a structured routine and clear improvement signals before booking the real exam.</p>
        </div>
        <div className="module-grid">
          {course.features.map((feature) => (
            <small key={feature}>{feature}</small>
          ))}
        </div>
      </section>
      <section className="section disclaimer-box">
        <h3>Important note</h3>
        <p>
          Test formats, fees, and acceptance rules can change. Students should confirm final requirements with the
          official test body and target institution before booking.
        </p>
        <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
          Enroll For Classes
        </AppLink>
      </section>
    </main>
  );
}
