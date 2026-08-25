
"use client";

import { useEffect, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { testCourses } from "../data/testCourses.js";

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

  const testBannerImages = {
    ielts: "/images/trust images/ielts.avif",
    pte: "/images/pte.png",
    toefl: "/images/trust images/toefl.gif",
    "japanese-jlpt": "/images/jlpt.png",
    sat: "/images/generated/SAT.png",
  };
  const bannerImg = testBannerImages[course.slug] || "";

  return (
    <main ref={sectionRef} style={{ overflow: "hidden" }}>
      {/* Hero Banner */}
      <section className="course-hero animate-on-scroll">
        <div className="course-hero-overlay">
          <h1>{course.name} Preparation Classes</h1>

          <div className="breadcrumb">
            Jyoti Education Corner / {course.name}
          </div>
        </div>
        {bannerImg && (
          <div style={{
            width: "100px",
            height: "100px",
            background: `url("${bannerImg}") center/contain no-repeat`,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "12px",
            padding: "10px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            flexShrink: 0
          }} />
        )}
      </section>

      {/* Main Layout */}
      <section className="course-layout animate-on-scroll">
        {/* Sidebar */}
        <aside className="course-sidebar">
          {testCourses.map((item) => (
            <AppLink
              key={item.slug}
              to={`/test-preparation/${item.slug}`}
              className={
                item.slug === course.slug
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
            >
              {item.name}
            </AppLink>
          ))}
        </aside>

        {/* Content */}
        <div className="course-content">
          <h2>What Does {course.name} Stand For?</h2>

          <p>{course.overview}</p>

          <h3>Course Information</h3>

          <table className="course-table">
            <tbody>
              <tr>
                <td>Full Name</td>
                <td>{course.fullName}</td>
              </tr>

              <tr>
                <td>Duration</td>
                <td>{course.duration}</td>
              </tr>

              <tr>
                <td>Score Focus</td>
                <td>{course.score}</td>
              </tr>
            </tbody>
          </table>

          <h3>Course Features</h3>

          <ul className="course-list">
            {course.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <h3>Exam Format</h3>

          <ul className="course-list">
            {course.format.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>Modules</h3>

          <ul className="course-list">
            {course.modules.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <AppLink
            to="/book-free-consultation"
            className="primary-button"
          >
            Enroll For Classes
          </AppLink>
        </div>
      </section>
    </main>
  );
}
