"use client";

import { useState } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";

export function BlogsPage({ blogs = [], navigate = undefined }) {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ["All", ...Array.from(new Set(blogs.map((blog) => blog.category)))];
  
  const filtered = blogs.filter((blog) => {
    const matchesCat = category === "All" || blog.category === category;
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filtered.slice(startIndex, startIndex + itemsPerPage);

  const featured = blogs.find((b) => b.featured) || blogs[0];

  return (
    <main style={{ background: "var(--surface-mist)" }}>
      <PageHero
        eyebrow="RESOURCES & INSIGHTS"
        title="Jyoti Educations Student Knowledge Hub"
        text="Essential guidance for study abroad, visas, language tests, and technical entrance prep from our certified team."
        image={assets.success}
      />

      {/* Featured Article Section */}
      {featured && (
        <section className="section" style={{ padding: "80px 0 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ 
              background: "var(--white)", 
              borderRadius: "24px", 
              overflow: "hidden", 
              boxShadow: "0 20px 40px rgba(7, 31, 61, 0.06)", 
              border: "1px solid var(--line)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "0"
            }}>
              <div style={{ position: "relative", height: "100%", minHeight: "300px" }}>
                <img 
                  src={featured.image} 
                  alt={featured.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} 
                />
              </div>
              <div style={{ padding: "48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ 
                  background: "rgba(91, 23, 125, 0.08)", 
                  color: "var(--purple)", 
                  padding: "6px 14px", 
                  borderRadius: "20px", 
                  fontSize: "12px", 
                  fontWeight: 800,
                  alignSelf: "flex-start",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>{featured.category}</span>
                
                <h2 style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: "var(--navy)", fontWeight: 800, marginBottom: "16px", lineHeight: 1.25 }}>
                  {featured.title}
                </h2>
                
                <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" }}>
                  {featured.excerpt}
                </p>
                
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "20px", 
                  color: "var(--muted)", 
                  fontSize: "13px", 
                  marginBottom: "32px" 
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={14} style={{ color: "var(--accent-orange-red)" }} />
                    {featured.date}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={14} style={{ color: "var(--accent-orange-red)" }} />
                    {featured.readTime}
                  </span>
                </div>

                <AppLink to={`/blogs/${featured.slug}`} navigate={navigate} className="primary-button" style={{ alignSelf: "flex-start" }}>
                  Read Featured Article <ArrowRight size={15} style={{ marginLeft: "6px" }} />
                </AppLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Articles List Section */}
      <section className="section" style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Search and Filters Bar */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "20px", 
            marginBottom: "50px",
            background: "var(--white)",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(7, 31, 61, 0.03)",
            border: "1px solid var(--line)"
          }}>
            <div style={{ position: "relative", width: "100%" }}>
              <input 
                type="text" 
                placeholder="Search articles by title, keywords or topic..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 44px",
                  borderRadius: "12px",
                  border: "1.5px solid var(--line)",
                  fontSize: "14px",
                  background: "var(--surface-mist)",
                  color: "var(--navy)",
                  outline: "none"
                }}
              />
              <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--navy)", marginRight: "10px" }}>Filter:</span>
              {categories.map((item) => (
                <button 
                  type="button" 
                  key={item} 
                  className={item === category ? "filter-active" : ""} 
                  onClick={() => { setCategory(item); setCurrentPage(1); }}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    border: "1px solid var(--line)",
                    background: item === category ? "var(--purple)" : "transparent",
                    color: item === category ? "var(--white)" : "var(--navy)",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {filtered.length > 0 ? (
            <>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
                gap: "30px" 
              }}>
                {paginatedBlogs.map((blog) => (
                  <article 
                    key={blog.slug}
                    style={{
                      background: "var(--white)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(7, 31, 61, 0.04)",
                      border: "1px solid var(--line)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(7, 31, 61, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(7, 31, 61, 0.04)";
                    }}
                  >
                    <div>
                      <div style={{ height: "200px", background: "#f8fafc", position: "relative", overflow: "hidden" }}>
                        <img src={blog.image} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <span style={{
                          position: "absolute",
                          top: "16px",
                          left: "16px",
                          background: "var(--white)",
                          color: "var(--purple)",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "4px 10px",
                          borderRadius: "20px",
                          textTransform: "uppercase",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                        }}>{blog.category}</span>
                      </div>

                      <div style={{ padding: "24px" }}>
                        <h3 style={{ 
                          fontSize: "18px", 
                          fontWeight: 800, 
                          color: "var(--navy)", 
                          lineHeight: 1.4, 
                          marginBottom: "12px",
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}>
                          {blog.title}
                        </h3>
                        <p style={{ 
                          fontSize: "14px", 
                          color: "var(--muted)", 
                          lineHeight: 1.6, 
                          marginBottom: "20px",
                          display: "-webkit-box",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}>
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>

                    <div style={{ 
                      padding: "0 24px 24px", 
                      borderTop: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div style={{ display: "flex", gap: "12px", color: "var(--muted)", fontSize: "11px", fontWeight: 600 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Calendar size={12} />
                          {blog.date}
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={12} />
                          {blog.readTime}
                        </span>
                      </div>
                      <AppLink to={`/blogs/${blog.slug}`} navigate={navigate} style={{
                        color: "var(--purple)",
                        fontSize: "13px",
                        fontWeight: 800,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none"
                      }}>
                        Read <ArrowRight size={13} />
                      </AppLink>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Bar */}
              {totalPages > 1 && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "50px"
                }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                      background: currentPage === 1 ? "#f1f5f9" : "#fff",
                      color: currentPage === 1 ? "#94a3b8" : "var(--navy)",
                      fontWeight: "600",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer"
                    }}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        border: p === currentPage ? "none" : "1px solid var(--line)",
                        background: p === currentPage ? "var(--purple)" : "#fff",
                        color: p === currentPage ? "#fff" : "var(--navy)",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                      background: currentPage === totalPages ? "#f1f5f9" : "#fff",
                      color: currentPage === totalPages ? "#94a3b8" : "var(--navy)",
                      fontWeight: "600",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer"
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ 
              textAlign: "center", 
              padding: "80px 20px", 
              background: "var(--white)", 
              borderRadius: "20px", 
              border: "1px solid var(--line)" 
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--navy)", marginBottom: "8px" }}>
                No articles found
              </h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>
                Try adjusting your search keywords or choosing a different category filter.
              </p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
