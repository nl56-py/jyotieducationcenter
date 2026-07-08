"use client";

import { useState } from "react";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { Search, Calendar, MapPin, ArrowRight, Eye } from "lucide-react";

export function NoticesPage({ notices = [] }) {
  const [filterType, setFilterType] = useState("all"); // 'all' | 'notice' | 'event'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const filtered = notices.filter((n) => {
    const matchesType = filterType === "all" || n.type === filterType;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <main style={{ background: "var(--surface-mist)", minHeight: "100vh" }}>
      <PageHero
        eyebrow="ANNOUNCEMENTS & UPDATES"
        title="Notices & Events Board"
        text="Stay updated with our latest admission calls, language preparation classes, events, and important academic notifications."
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
                placeholder="Search notices or events by title, keyword..." 
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

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--navy)", marginRight: "10px" }}>Filter:</span>
              {[
                { value: "all", label: "All Updates" },
                { value: "notice", label: "Notices Only" },
                { value: "event", label: "Events Only" }
              ].map((item) => (
                <button 
                  type="button" 
                  key={item.value} 
                  onClick={() => setFilterType(item.value)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "600",
                    border: "1.5px solid",
                    borderColor: filterType === item.value ? "var(--purple)" : "var(--line)",
                    background: filterType === item.value ? "var(--purple)" : "transparent",
                    color: filterType === item.value ? "var(--white)" : "var(--navy)",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {item.label}
                </button>
              ))}
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
                <h3 style={{ fontSize: "18px", color: "var(--navy)", fontWeight: 700 }}>No Updates Found</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px" }}>Check back later for new notices and upcoming events.</p>
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
                      background: item.type === "event" ? "linear-gradient(135deg, #f97316, #ea580c)" : "linear-gradient(135deg, #3b82f6, #2563eb)",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      letterSpacing: "0.05em",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                    }}>
                      {item.type}
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

                    {/* Event Specific Info */}
                    {item.type === "event" && (item.eventDate || item.location) && (
                      <div style={{ 
                        background: "var(--surface-mist)", 
                        borderRadius: "10px", 
                        padding: "12px 16px", 
                        marginBottom: "20px",
                        fontSize: "13px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px"
                      }}>
                        {item.eventDate && (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--navy)" }}>
                            <Calendar size={14} style={{ color: "var(--purple)" }} />
                            <span><strong>Date:</strong> {item.eventDate}</span>
                          </div>
                        )}
                        {item.location && (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--navy)" }}>
                            <MapPin size={14} style={{ color: "var(--purple)" }} />
                            <span><strong>Venue:</strong> {item.location}</span>
                          </div>
                        )}
                      </div>
                    )}

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
                  background: selectedNotice.type === "event" ? "#ea580c" : "#2563eb",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  display: "inline-block",
                  marginBottom: "12px"
                }}>
                  {selectedNotice.type}
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
              {selectedNotice.type === "event" && (selectedNotice.eventDate || selectedNotice.location) && (
                <div style={{ 
                  background: "var(--surface-mist)", 
                  borderRadius: "12px", 
                  padding: "16px 20px", 
                  marginBottom: "24px",
                  fontSize: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}>
                  {selectedNotice.eventDate && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--navy)" }}>
                      <Calendar size={16} style={{ color: "var(--purple)" }} />
                      <span><strong>Date & Time:</strong> {selectedNotice.eventDate}</span>
                    </div>
                  )}
                  {selectedNotice.location && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--navy)" }}>
                      <MapPin size={16} style={{ color: "var(--purple)" }} />
                      <span><strong>Location:</strong> {selectedNotice.location}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Rich Text Body */}
              <div 
                className="rich-text-content"
                style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--navy)" }}
                dangerouslySetInnerHTML={{ __html: selectedNotice.bodyHtml }}
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
