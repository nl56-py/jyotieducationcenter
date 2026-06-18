"use client";
import { useEffect, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { NewsletterSection } from "../components/NewsletterSection.jsx";

export function BlogDetailPage({ blog }) {
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
  }, [blog.slug]);

  return (
    <main ref={sectionRef} style={{ overflow: "hidden" }}>
      <div className="animate-on-scroll">
        <PageHero eyebrow={blog.category} title={blog.title} text={blog.excerpt} image={blog.image} />
      </div>

      <article className="section article-body animate-on-scroll">
        <div className="article-meta animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
          {blog.date} | {blog.readTime}
        </div>
        {blog.content.map((paragraph, i) => (
          <p
            key={paragraph}
            className="animate-on-scroll"
            style={{ transitionDelay: `${(i % 5) * 0.05}s` }}
          >
            {paragraph}
          </p>
        ))}
        <div className="article-actions animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
          <AppLink to="/blogs" className="secondary-button">
            Back to Blogs
          </AppLink>
          <AppLink to="/book-free-consultation" className="primary-button">
            Ask EduMark
          </AppLink>
        </div>
      </article>

      <div className="animate-on-scroll">
        <NewsletterSection />
      </div>
    </main>
  );
}
