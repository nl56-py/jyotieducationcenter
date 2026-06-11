"use client";

import { useState } from "react";
import { Upload, Folder, Image, Trash2, Eye } from "lucide-react";

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState([
    { id: "1", name: "australia_hero.jpg", size: "1.2 MB", dimensions: "1920x1080", mime: "image/jpeg", url: "/placeholder.jpg" },
    { id: "2", name: "ielts_banner.png", size: "640 KB", dimensions: "1200x630", mime: "image/png", url: "/placeholder.jpg" },
    { id: "3", name: "student_success_1.webp", size: "140 KB", dimensions: "800x800", mime: "image/webp", url: "/placeholder.jpg" }
  ]);

  const handleUpload = () => {
    alert("Triggering file upload dialog... (Supabase Storage integration point)");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Media Asset Library</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Upload, optimize, and manage media references used across destinations, blogs, and marketing pages.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleUpload}>
          <Upload size={16} /> Upload Image
        </button>
      </div>

      <div className="panel-card">
        <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--dm-surface-container)", background: "var(--dm-surface-container-low)" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ padding: "4px 12px", background: "var(--dm-primary-container)", color: "var(--dm-on-primary-container)", borderRadius: "var(--dm-rounded-full)", fontSize: "12px", fontWeight: 600 }}>All Images</span>
            <span style={{ padding: "4px 12px", background: "var(--dm-surface)", border: "1px solid var(--dm-surface-container)", borderRadius: "var(--dm-rounded-full)", fontSize: "12px", color: "var(--dm-outline)", cursor: "pointer" }}>Banners</span>
            <span style={{ padding: "4px 12px", background: "var(--dm-surface)", border: "1px solid var(--dm-surface-container)", borderRadius: "var(--dm-rounded-full)", fontSize: "12px", color: "var(--dm-outline)", cursor: "pointer" }}>Student Testimonials</span>
          </div>
        </div>

        <div className="media-grid">
          {assets.map((asset) => (
            <div key={asset.id} className="media-card">
              <div className="media-preview">
                <Image size={32} className="text-outline" />
                <div style={{ position: "absolute", bottom: "8px", right: "8px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "3px" }}>
                  {asset.dimensions}
                </div>
              </div>
              <div className="media-meta">
                <div className="media-name" title={asset.name}>{asset.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                  <span className="media-size">{asset.size}</span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button className="btn btn-light" style={{ height: "24px", padding: "0 6px" }} onClick={() => alert(`Preview: ${asset.name}`)} title="View Asset">
                      <Eye size={12} />
                    </button>
                    <button className="btn btn-light" style={{ height: "24px", padding: "0 6px", color: "var(--dm-error)" }} onClick={() => setAssets(assets.filter(a => a.id !== asset.id))} title="Delete Asset">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
