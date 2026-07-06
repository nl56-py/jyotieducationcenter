"use client";

import { useState } from "react";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { videoItems } from "../data/testimonials.js";
import { Play, X } from "lucide-react";

export function VideosPage({ videos = [] }) {
  const [category, setCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);

  const displayVideos = videos.length > 0 ? videos : videoItems;

  const categories = ["All", ...Array.from(new Set(displayVideos.map((video) => video.category)))];
  const filtered = category === "All" ? displayVideos : displayVideos.filter((video) => video.category === category);

  return (
    <main>
      <PageHero
        eyebrow="Video Gallery"
        title="Watch student success stories and expert tips"
        text="A gallery-style page ready for office videos, reels, testimonials, destination guides, and preparation highlights."
        image={assets.success}
      />
      
      <section className="section" style={{ background: "var(--surface-mist)", padding: "60px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          <div className="filter-row" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px", justifyContent: "center" }}>
            {categories.map((item) => (
              <button 
                type="button" 
                key={item} 
                className={item === category ? "filter-active" : ""} 
                onClick={() => setCategory(item)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "20px",
                  border: "1px solid var(--line)",
                  background: item === category ? "var(--purple)" : "var(--white)",
                  color: item === category ? "var(--white)" : "var(--navy)",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="video-grid" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
            gap: "30px" 
          }}>
            {filtered.map((video) => (
              <article 
                className="video-card" 
                key={video.title}
                onClick={() => setActiveVideo(video)}
                style={{
                  background: "var(--white)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(7, 31, 61, 0.04)",
                  border: "1px solid var(--line)",
                  cursor: "pointer",
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
                {/* Video Thumbnail with Play Button */}
                <div style={{ position: "relative", width: "100%", height: "200px", background: "#0a2440", overflow: "hidden" }}>
                  <img 
                    src={video.poster || video.image || assets.brochureHero} 
                    alt={video.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} 
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(7, 31, 61, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <div style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.95)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                      color: "var(--purple)"
                    }}>
                      <Play size={24} fill="currentColor" style={{ marginLeft: "4px" }} />
                    </div>
                  </div>
                  {video.duration && (
                    <span style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      background: "rgba(0,0,0,0.72)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "4px"
                    }}>{video.duration}</span>
                  )}
                </div>

                {/* Video Info */}
                <div style={{ padding: "24px" }}>
                  <span style={{ 
                    fontSize: "11px", 
                    fontWeight: 700, 
                    color: "var(--purple)", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em",
                    display: "block",
                    marginBottom: "8px"
                  }}>{video.category}</span>
                  <h3 style={{ 
                    fontSize: "16px", 
                    fontWeight: 800, 
                    color: "var(--navy)", 
                    lineHeight: 1.4,
                    marginBottom: "8px"
                  }}>{video.title}</h3>
                  <p style={{ 
                    fontSize: "13px", 
                    color: "var(--muted)", 
                    lineHeight: 1.5,
                    margin: 0
                  }}>Click to play and watch our certified guides and updates.</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Video Modal Player Lightbox */}
      {activeVideo && (
        <div 
          onClick={() => setActiveVideo(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(7, 31, 61, 0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)"
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#000",
              borderRadius: "16px",
              overflow: "hidden",
              maxWidth: "800px",
              width: "100%",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              position: "relative"
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveVideo(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#fff",
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            {/* Video Player Box */}
            <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
              {activeVideo.media === "video" ? (
                <video 
                  controls 
                  autoPlay 
                  poster={activeVideo.poster}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                >
                  <source src={activeVideo.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <iframe
                  src={activeVideo.embedUrl || `https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none"
                  }}
                />
              )}
            </div>
            
            {/* Info Strip */}
            <div style={{ padding: "20px", background: "var(--white)", color: "var(--navy)" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--purple)" }}>
                {activeVideo.category}
              </span>
              <h4 style={{ fontSize: "16px", fontWeight: 800, marginTop: "4px", marginBottom: 0 }}>
                {activeVideo.title}
              </h4>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
