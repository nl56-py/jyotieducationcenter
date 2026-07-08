"use client";

import { useEffect, useState, useRef } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { Calendar, Clock, Share2, Link2, ArrowLeft } from "lucide-react";

export function BlogDetailPage({ blog, relatedBlogs = [] }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paragraphs = Array.isArray(blog.content) ? blog.content : [blog.content || ""];

  return (
    <main ref={sectionRef} style={{ background: "var(--surface-mist)", position: "relative" }}>
      {/* Reading Progress Indicator */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: "4px",
        background: "linear-gradient(90deg, var(--purple), var(--cyan))",
        zIndex: 10000,
        transition: "width 0.1s ease"
      }} />

      <PageHero 
        eyebrow={blog.category} 
        title={blog.title} 
        text={blog.excerpt} 
        image={blog.image} 
      />

      <section className="section" style={{ padding: "60px 0" }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "40px",
          alignItems: "start"
        }}>
          {/* Main Reading Column */}
          <article style={{ 
            background: "var(--white)", 
            borderRadius: "24px", 
            padding: "48px", 
            boxShadow: "0 10px 30px rgba(7, 31, 61, 0.03)",
            border: "1px solid var(--line)"
          }}>
            {/* Metadata */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              borderBottom: "1px solid var(--line)",
              paddingBottom: "24px",
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "15px"
            }}>
              <div style={{ display: "flex", gap: "20px", color: "var(--muted)", fontSize: "14px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Calendar size={15} style={{ color: "var(--purple)" }} />
                  {blog.date}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={15} style={{ color: "var(--purple)" }} />
                  {blog.readTime}
                </span>
              </div>

              {/* Social Share Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank")}
                  style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--line)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy)" }}
                  title="Share on Facebook"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ display: "block" }}>
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1h-4c-2.8 0-5 2.2-5 5v2z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`, "_blank")}
                  style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--line)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy)" }}
                  title="Share on Twitter"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ display: "block" }}>
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button 
                  onClick={handleCopyLink}
                  style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid var(--line)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy)", position: "relative" }}
                >
                  <Link2 size={16} />
                  {copied && (
                    <span style={{ position: "absolute", bottom: "42px", background: "var(--navy)", color: "#fff", fontSize: "11px", padding: "4px 8px", borderRadius: "4px", whiteSpace: "nowrap" }}>Copied!</span>
                  )}
                </button>
              </div>
            </div>

            {/* Reading Content */}
            <div style={{ 
              fontSize: "1.15rem", 
              lineHeight: "1.85", 
              color: "#334155", 
              marginBottom: "40px" 
            }}>
              {paragraphs.map((p, idx) => (
                <p key={idx} style={{ marginBottom: "24px" }}>{p}</p>
              ))}
            </div>

            {/* Actions Bar */}
            <div style={{ 
              borderTop: "1px solid var(--line)", 
              paddingTop: "32px", 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px"
            }}>
              <AppLink to="/blogs" className="secondary-button" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <ArrowLeft size={15} /> Back to Blogs
              </AppLink>
              <AppLink to="/book-free-consultation" className="primary-button">
                Ask EduMark Counselors
              </AppLink>
            </div>
          </article>

          {/* Sidebar Area */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Author profile card */}
            <div style={{ 
              background: "var(--white)", 
              borderRadius: "20px", 
              padding: "28px", 
              boxShadow: "0 10px 30px rgba(7, 31, 61, 0.03)",
              border: "1px solid var(--line)",
              textAlign: "center"
            }}>
              <div style={{ 
                width: "72px", 
                height: "72px", 
                borderRadius: "50%", 
                background: "rgba(91, 23, 125, 0.08)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                margin: "0 auto 16px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "var(--purple)"
              }}>
                EM
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "var(--navy)", marginBottom: "4px" }}>
                EduMark Counselors
              </h4>
              <div style={{ fontSize: "12px", color: "var(--purple)", fontWeight: 700, textTransform: "uppercase", marginBottom: "12px" }}>
                Verified Advising Team
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                Our professional counselors possess TITI certifications and extensive experience in university mapping and visa procedures.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Articles Footer */}
      {relatedBlogs.length > 0 && (
        <section className="section" style={{ borderTop: "1px solid var(--line)", padding: "60px 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <h3 style={{ fontSize: "1.5rem", color: "var(--navy)", fontWeight: 800, marginBottom: "30px" }}>
              Related Articles You Might Like
            </h3>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "30px" 
            }}>
              {relatedBlogs.map((rel) => (
                <article 
                  key={rel.slug}
                  style={{
                    background: "var(--white)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "20px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.02)"
                  }}
                >
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--purple)", textTransform: "uppercase" }}>
                      {rel.category}
                    </span>
                    <h4 style={{ fontSize: "16px", fontWeight: 800, color: "var(--navy)", margin: "8px 0 12px" }}>
                      {rel.title}
                    </h4>
                  </div>
                  <AppLink to={`/blogs/${rel.slug}`} style={{ color: "var(--purple)", fontSize: "13px", fontWeight: 800, textDecoration: "none" }}>
                    Read Post →
                  </AppLink>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
