"use client";

import { useState } from "react";
import { CheckCircle2, RefreshCw } from "lucide-react";

const cacheTags = [
  { key: "home", label: "Homepage" },
  { key: "pages", label: "Public Pages" },
  { key: "destinations", label: "Destinations" },
  { key: "blogs", label: "Blogs" },
  { key: "services", label: "Services" },
  { key: "testprep", label: "Test Preparation" },
  { key: "entrance", label: "Entrance Programs" },
  { key: "team", label: "Team & Testimonials" },
  { key: "videos", label: "Video Gallery" },
  { key: "settings", label: "Site Settings" },
];

const commonPaths = ["/", "/about", "/contact", "/destinations", "/blogs", "/services", "/test-preparation", "/entrance-preparations"];

export default function CacheControlsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["home", "pages", "destinations", "blogs"]);
  const [paths, setPaths] = useState(commonPaths.join("\n"));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) => (
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    ));
  };

  const revalidate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/admin/cache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tags: selectedTags,
          paths: paths.split("\n").map((path) => path.trim()).filter(Boolean),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Cache revalidation failed");
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error("Cache revalidation failed:", err);
      alert("Cache revalidation failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Cache Revalidation Controls</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Refresh cached public content after publishing pages, destinations, blogs, services, and settings.
          </p>
        </div>
        <button className="btn btn-primary" onClick={revalidate} disabled={loading}>
          <RefreshCw size={16} /> {loading ? "Revalidating..." : "Revalidate Selected"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title">Cache Tags</h3>
          </div>
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
            {cacheTags.map((tag) => (
              <label key={tag.key} className="btn btn-light" style={{ justifyContent: "flex-start", height: "44px" }}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.key)}
                  onChange={() => toggleTag(tag.key)}
                  style={{ width: "16px", height: "16px" }}
                />
                {tag.label}
              </label>
            ))}
          </div>
        </div>

        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title">Public Paths</h3>
          </div>
          <div style={{ padding: "24px" }}>
            <div className="form-group">
              <label className="form-label">One path per line</label>
              <textarea className="form-textarea" style={{ minHeight: "230px", fontFamily: "monospace" }} value={paths} onChange={(event) => setPaths(event.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="panel-card" style={{ marginTop: "24px" }}>
          <div style={{ padding: "24px", display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <CheckCircle2 size={24} style={{ color: "#059669", flexShrink: 0 }} />
            <div>
              <h3 style={{ margin: 0, fontSize: "16px" }}>Cache revalidated</h3>
              <p style={{ margin: "6px 0 0", color: "var(--dm-outline)", fontSize: "13px" }}>
                Tags: {result.revalidatedTags.join(", ") || "none"} | Paths: {result.revalidatedPaths.join(", ") || "none"}
              </p>
              <p style={{ margin: "6px 0 0", color: "var(--dm-outline)", fontSize: "12px" }}>
                Completed at {new Date(result.purged_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
