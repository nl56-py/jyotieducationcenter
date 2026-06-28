import { AppLink } from "../components/AppLink.jsx";
import { SectionIntro } from "../components/SectionIntro.jsx";
import { BulletList } from "../components/BulletList.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { testCourses } from "../data/testCourses.js";

export function TestPreparationPage({ navigate }) {
  return (
    <main>
      <PageHero
        eyebrow="Test Preparation"
        title="Score-focused preparation for IELTS, PTE, TOEFL, and SAT"
        text="Each course is built around practice, correction, mock-test feedback, and student-specific improvement."
        image={assets.testPrep}
      />
      <section className="section">
        <div className="course-grid">
          {testCourses.map((course) => (
            <article className="course-card" key={course.slug}>
              <span>{course.duration}</span>
              <h3>{course.name}</h3>
              <p>{course.fullName}</p>
              <div className="module-grid">
                {course.modules.map((module) => (
                  <small key={module}>{module}</small>
                ))}
              </div>
              <AppLink to={`/test-preparation/${course.slug}`} navigate={navigate} className="secondary-button small">
                View Details
              </AppLink>
            </article>
          ))}
        </div>
      </section>
      <section className="section split-section">
        <div className="brochure-frame">
          <img src={assets.testPrep} alt="EduMark test preparation classes" />
        </div>
        <div>
          <SectionIntro
            eyebrow="Preparation Features"
            title="Classes built for correction, practice, and measurable progress"
            text="The brochure promises certified teachers, weekly mock tests, extra support for weak students, and visa interview preparation."
          />
          <BulletList items={["Certified teachers", "Weekly mock tests", "Extra classes for weak students", "Visa interview preparation"]} />
        </div>
      </section>
    </main>
  );
}
