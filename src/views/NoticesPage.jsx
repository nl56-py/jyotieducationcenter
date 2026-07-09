"use client";

import { useState } from "react";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { sanitizeHtml } from "../lib/security/sanitize-html";
import { Search, ArrowRight, Eye } from "lucide-react";

export function NoticesPage({ notices = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const filtered = notices.filter((n) => {
    return (
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <main style={{ background: "var(--surface-mist)", minHeight: "100vh" }}>
      <PageHero
        eyebrow="ANNOUNCEMENTS & UPDATES"
        title="Notices Board"
        text="Stay updated with the latest admission calls, preparation class announcements, and important academic notifications."
        image={assets.counselling}
      />

      <section className="section" style={{ padding: "60px 0 100px" }}>
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
                placeholder="Search notices by title, keyword..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          </div>

          {/* Grid Layout */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", 
            gap: "30px" 
          }}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 20px" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>📭</div>
                <h3 style={{ fontSize: "18px", color: "var(--navy)", fontWeight: 700 }}>No Notices Found</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px" }}>Check back later for new notices and announcements.</p>
              </div>
            ) : (
              filtered.map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    background: "var(--white)",
                    borderRadius: "20px",
                    border: "1px solid var(--line)",
                    boxShadow: "0 8px 24px rgba(7, 31, 61, 0.04)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                  }}
                >
                  {/* Badge */}
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    zIndex: 2
                  }}>
                    <span style={{
                      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      letterSpacing: "0.05em",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                    }}>
                      Notice
                    </span>
                  </div>

                  <div style={{ padding: "30px", paddingTop: "55px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>📅 Published: {item.date}</span>
                    </div>

                    <h3 style={{ fontSize: "18px", color: "var(--navy)", fontWeight: 800, marginBottom: "12px", lineHeight: 1.4 }}>
                      {item.title}
                    </h3>

                    <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>
                      {item.excerpt}
                    </p>


                    <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                      {item.bodyHtml && (
                        <button 
                          onClick={() => setSelectedNotice(item)}
                          style={{
                            background: "transparent",
                            border: "1.5px solid var(--purple)",
                            color: "var(--purple)",
                            borderRadius: "10px",
                            padding: "8px 16px",
                            fontSize: "13px",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            flex: 1,
                            justifyContent: "center",
                            transition: "all 0.2s"
                          }}
                        >
                          <Eye size={14} /> View Details
                        </button>
                      )}
                      
                      {item.ctaHref && (
                        <a 
                          href={item.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "linear-gradient(135deg, var(--purple), var(--cyan))",
                            color: "#ffffff",
                            borderRadius: "10px",
                            padding: "8px 16px",
                            fontSize: "13px",
                            fontWeight: 700,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            flex: 1,
                            justifyContent: "center",
                            boxShadow: "0 6px 15px rgba(91, 23, 125, 0.15)"
                          }}
                        >
                          {item.ctaLabel || "Register"} <ArrowRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Details Modal */}
      {selectedNotice && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(7, 31, 61, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px"
          }}
          onClick={() => setSelectedNotice(null)}
        >
          <div 
            style={{
              background: "var(--white)",
              borderRadius: "24px",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              border: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: "30px",
              borderBottom: "1px solid var(--line)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative"
            }}>
              <div>
                <span style={{
                  background: "#2563eb",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  display: "inline-block",
                  marginBottom: "12px"
                }}>
                  Notice
                </span>
                <h3 style={{ fontSize: "22px", color: "var(--navy)", fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                  {selectedNotice.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedNotice(null)}
                style={{
                  background: "var(--surface-mist)",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "var(--navy)",
                  flexShrink: 0
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "30px", overflowY: "auto" }}>

              {/* Rich Text Body */}
              <div 
                className="rich-text-content"
                style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--navy)" }}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedNotice.bodyHtml) }}
              />
            </div>

            {/* Modal Footer */}
            {selectedNotice.ctaHref && (
              <div style={{
                padding: "24px 30px",
                borderTop: "1px solid var(--line)",
                display: "flex",
                justifyContent: "flex-end"
              }}>
                <a 
                  href={selectedNotice.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "linear-gradient(135deg, var(--purple), var(--cyan))",
                    color: "#ffffff",
                    borderRadius: "10px",
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(91, 23, 125, 0.2)"
                  }}
                >
                  {selectedNotice.ctaLabel || "Register Now"}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
