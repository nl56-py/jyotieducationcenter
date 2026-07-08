"use client";

import { useState, useEffect } from "react";
import { Upload, Folder, Image, Trash2, Eye, Plus } from "lucide-react";
import { MediaUploadField } from "@/components/admin/MediaUploadField";

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form states for manual registration / mock upload
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [path, setPath] = useState("");
  const [mimeType, setMimeType] = useState("image/jpeg");
  const [sizeBytes, setSizeBytes] = useState("500000");
  const [altText, setAltText] = useState("");

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/media");
      if (response.ok) {
        const data = await response.json();
        setAssets(data || []);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Failed to fetch media assets:", err);
    }
    setAssets([]);
    setLoading(false);
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setCurrentUser(data.user);
      } catch (err) {}
    };
    loadSession();
    fetchAssets();
  }, []);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_name: fileName,
          path: path || `/uploads/${fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "_")}`,
          mime_type: mimeType,
          size_bytes: sizeBytes,
          alt_text: altText
        })
      });
      if (response.ok) {
        await fetchAssets();
      }
    } catch (err) {
      console.error("Upload save error:", err);
    }
    setLoading(false);
    setIsUploadOpen(false);
    // Reset form
    setFileName("");
    setPath("");
    setAltText("");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this media asset?")) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/media?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchAssets();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete asset");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setLoading(false);
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    if (kb > 1024) {
      return `${(kb / 1024).toFixed(1)} MB`;
    }
    return `${kb.toFixed(0)} KB`;
  };

  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Media Asset Library</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Upload, optimize, and manage media references used across destinations, blogs, and marketing pages.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
          <Upload size={16} /> Upload / Register Media
        </button>
      </div>

      <div className="panel-card">
        <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--dm-surface-container)", background: "var(--dm-surface-container-low)" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ padding: "4px 12px", background: "var(--dm-primary-container)", color: "var(--dm-on-primary-container)", borderRadius: "var(--dm-rounded-full)", fontSize: "12px", fontWeight: 600 }}>All Images</span>
          </div>
        </div>

        <div className="media-grid" style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {loading && assets.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>Loading media assets...</div>
          ) : assets.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>No media assets registered.</div>
          ) : (
            assets.map((asset) => (
              <div key={asset.id} className="media-card" style={{ border: "1px solid var(--dm-surface-container)", borderRadius: "var(--dm-rounded-md)", overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--dm-surface-container-low)" }}>
                <div className="media-preview" style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--dm-surface-container-high)", position: "relative" }}>
                  {asset.mime_type?.startsWith("image/") ? (
                    <img src={asset.path} alt={asset.alt_text || asset.file_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <Image size={36} style={{ color: "var(--dm-outline)" }} />
                  )}
                  <div style={{ position: "absolute", bottom: "8px", right: "8px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "3px" }}>
                    {asset.mime_type?.split("/")[1]?.toUpperCase() || "IMG"}
                  </div>
                </div>
                <div className="media-meta" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div className="media-name" style={{ fontWeight: 600, fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={asset.file_name}>{asset.file_name}</div>
                  <div style={{ fontSize: "11px", color: "var(--dm-outline)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{asset.path}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                    <span className="media-size" style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{formatSize(asset.size_bytes)}</span>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button className="btn btn-light" style={{ height: "26px", padding: "0 8px" }} onClick={() => alert(`Alt Text: ${asset.alt_text || "None"}\nPath: ${asset.path}`)} title="View Metadata">
                        <Eye size={12} />
                      </button>
                      {canDelete && (
                        <button className="btn btn-light" style={{ height: "26px", padding: "0 8px", color: "var(--dm-error)" }} onClick={() => handleDelete(asset.id)} title="Delete Asset">
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isUploadOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "450px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Upload or Register Media</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsUploadOpen(false)}>X</button>
            </div>
            <form onSubmit={handleUploadSubmit}>
              <div className="modal-body">
                <MediaUploadField
                  label="Upload file to Supabase media bucket"
                  folder="library"
                  accept="image/*,video/*,application/pdf"
                  onUploaded={(asset) => {
                    fetchAssets();
                    setIsUploadOpen(false);
                    setFileName("");
                    setPath("");
                    setMimeType("image/jpeg");
                    setSizeBytes("500000");
                    setAltText("");
                  }}
                />
                <div style={{ height: 1, background: "var(--dm-surface-container)", margin: "18px 0" }} />
                <div className="form-group">
                  <label className="form-label">File Name</label>
                  <input type="text" className="form-input" placeholder="e.g. australian_visa_guide.jpg" value={fileName} onChange={(e) => setFileName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Static Path URL / Public URL</label>
                  <input type="text" className="form-input" placeholder="e.g. /images/australian_visa_guide.jpg (or dynamic uploads path)" value={path} onChange={(e) => setPath(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Mime Type</label>
                  <select className="form-select" value={mimeType} onChange={(e) => setMimeType(e.target.value)}>
                    <option value="image/jpeg">image/jpeg</option>
                    <option value="image/png">image/png</option>
                    <option value="image/webp">image/webp</option>
                    <option value="image/gif">image/gif</option>
                    <option value="application/pdf">application/pdf</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">File Size (bytes)</label>
                  <input type="number" className="form-input" value={sizeBytes} onChange={(e) => setSizeBytes(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Alt Text (Accessibility)</label>
                  <input type="text" className="form-input" placeholder="Describe image content..." value={altText} onChange={(e) => setAltText(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setIsUploadOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Registering..." : "Register Metadata"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
