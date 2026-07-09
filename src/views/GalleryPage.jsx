"use client";

import { useState } from "react";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export function GalleryPage({ photos = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else {
      setLightboxIndex(photos.length - 1);
    }
  };

  const showNext = (e) => {
    e.stopPropagation();
    if (lightboxIndex < photos.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else {
      setLightboxIndex(0);
    }
  };

  const hasPhotos = photos.length > 0;

  return (
    <main style={{ background: "var(--surface-mist)" }}>
      <PageHero
        eyebrow="PHOTO GALLERY"
        title="Explore life and activities at EduMark"
        text="A visual record of our student counseling fairs, seminar events, office spaces, visa celebration moments, and community sessions."
        image={assets.success}
      />

      <section className="section" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          
          {!hasPhotos ? (
            <div style={{
              textAlign: "center",
              padding: "100px 40px",
              background: "var(--white)",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(7, 31, 61, 0.03)",
              border: "1px solid var(--line)"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "var(--surface-mist)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px"
              }}>
                <ImageIcon size={36} style={{ color: "var(--muted)" }} />
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: "800", color: "var(--navy)", marginBottom: "12px" }}>
                Gallery is being updated
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "480px", margin: "0 auto" }}>
                We are currently uploading recent photos of our seminars, successful candidates, and events. Please visit again soon!
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "30px"
            }}>
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  style={{
                    background: "var(--white)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(7, 31, 61, 0.03)",
                    border: "1px solid var(--line)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    position: "relative"
                  }}
                  className="gallery-card"
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector(".gallery-img");
                    if (img) img.style.transform = "scale(1.06)";
                    const overlay = e.currentTarget.querySelector(".gallery-overlay");
                    if (overlay) overlay.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector(".gallery-img");
                    if (img) img.style.transform = "scale(1)";
                    const overlay = e.currentTarget.querySelector(".gallery-overlay");
                    if (overlay) overlay.style.opacity = "0";
                  }}
                >
                  {/* Photo Container */}
                  <div style={{ height: "240px", overflow: "hidden", position: "relative", background: "var(--surface-mist)" }}>
                    <img
                      src={photo.path}
                      alt={photo.altText}
                      className="gallery-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease"
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div
                      className="gallery-overlay"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(23, 21, 111, 0.65)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease"
                      }}
                    >
                      <div style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--navy)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
                      }}>
                        <Eye size={22} />
                      </div>
                    </div>
                  </div>

                  {/* Caption & Heading */}
                  <div style={{ padding: "20px" }}>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "var(--navy)",
                      lineHeight: 1.4,
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical"
                    }}>
                      {photo.caption || photo.fileName || "EduMark Gallery Image"}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(7, 18, 36, 0.95)",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            <X size={24} />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={showPrev}
            style={{
              position: "absolute",
              left: "24px",
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "#fff",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={showNext}
            style={{
              position: "absolute",
              right: "24px",
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "#fff",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            <ChevronRight size={28} />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "1000px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px"
            }}
          >
            <div style={{
              maxHeight: "75vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden"
            }}>
              <img
                src={photos[lightboxIndex].path}
                alt={photos[lightboxIndex].altText}
                style={{
                  maxHeight: "75vh",
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 10px 50px rgba(0,0,0,0.5)"
                }}
              />
            </div>

            {/* Lightbox Metadata */}
            <div style={{
              color: "#fff",
              textAlign: "center",
              maxWidth: "600px",
              padding: "0 20px"
            }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 8px" }}>
                {photos[lightboxIndex].caption || photos[lightboxIndex].fileName}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: 0 }}>
                Image {lightboxIndex + 1} of {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
