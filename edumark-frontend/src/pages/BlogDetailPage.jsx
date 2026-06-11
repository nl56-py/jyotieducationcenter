import { AppLink } from "../components/AppLink.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { NewsletterSection } from "../components/NewsletterSection.jsx";

export function BlogDetailPage({ blog, navigate }) {
  return (
    <main>
      <PageHero eyebrow={blog.category} title={blog.title} text={blog.excerpt} image={blog.image} />
      <article className="section article-body">
        <div className="article-meta">{blog.date} | {blog.readTime}</div>
        {blog.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="article-actions">
          <AppLink to="/blogs" navigate={navigate} className="secondary-button">
            Back to Blogs
          </AppLink>
          <AppLink to="/book-free-consultation" navigate={navigate} className="primary-button">
            Ask EduMark
          </AppLink>
        </div>
      </article>
      <NewsletterSection />
    </main>
  );
}
