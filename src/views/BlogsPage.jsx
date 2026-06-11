import { useState } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { NewsletterSection } from "../components/NewsletterSection.jsx";
import { assets } from "../data/assets.js";
import { blogs } from "../data/blogs.js";

export function BlogsPage({ navigate }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(blogs.map((blog) => blog.category)))];
  const filtered = category === "All" ? blogs : blogs.filter((blog) => blog.category === category);
  const featured = blogs[0];

  return (
    <main>
      <PageHero
        eyebrow="Blogs"
        title="Guidance for study abroad, visas, tests, and entrance decisions"
        text="A resource center for students and parents who want direct advice before visiting the office."
        image={assets.success}
      />
      <section className="section featured-article">
        <div className="brochure-frame">
          <img src={featured.image} alt="" />
        </div>
        <div>
          <span>{featured.category}</span>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <small>{featured.date} | {featured.readTime}</small>
          <AppLink to={`/blogs/${featured.slug}`} navigate={navigate} className="primary-button">
            Read Featured Article
          </AppLink>
        </div>
      </section>
      <section className="section">
        <div className="filter-row">
          {categories.map((item) => (
            <button type="button" key={item} className={item === category ? "filter-active" : ""} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="blog-grid">
          {filtered.map((blog) => (
            <article className="blog-card image-card" key={blog.slug}>
              <img src={blog.image} alt="" />
              <span>{blog.category}</span>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <small>{blog.date} | {blog.readTime}</small>
              <AppLink to={`/blogs/${blog.slug}`} navigate={navigate} className="text-link">
                Read More
              </AppLink>
            </article>
          ))}
        </div>
      </section>
      <NewsletterSection />
    </main>
  );
}
