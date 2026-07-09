"use client";

import { useState, useEffect } from "react";
import { Upload, Image as ImageIcon, Trash2, Eye, Edit2, Save, X } from "lucide-react";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { getMediaUrl } from "@/lib/utils/media";

export default function GalleryManagementPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Upload Form states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [heading, setHeading] = useState("");
  const [altText, setAltText] = useState("");

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editHeading, setEditHeading] = useState("");
  const [editAltText, setEditAltText] = useState("");

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/media");
      if (response.ok) {
        const data = await response.json();
        // Filter to show only image assets for the photo gallery
        const imagesOnly = (data || []).filter((asset: any) =>
          asset.mime_type?.startsWith("image/")
        );
        setAssets(imagesOnly);
      }
    } catch (err) {
      console.warn("Failed to fetch media assets:", err);
    }
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

  const handleUploadComplete = async (mediaAsset: any) => {
    // If the user specified a heading or custom alt text, send a PATCH request to update the asset
    if (heading || altText) {
      try {
        await fetch("/api/admin/media", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: mediaAsset.id,
            caption: heading || mediaAsset.caption,
            alt_text: altText || mediaAsset.alt_text,
          }),
        });
      } catch (err) {
        console.error("Failed to update uploaded asset caption:", err);
      }
    }
    
    // Reset states and reload list
    setHeading("");
    setAltText("");
    setIsUploadOpen(false);
    await fetchAssets();
  };

  const handleUpdate = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          caption: editHeading,
          alt_text: editAltText,
        }),
      });
      if (response.ok) {
        setEditingId(null);
        await fetchAssets();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update asset");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this photo from the gallery?")) return;
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

  const startEditing = (asset: any) => {
    setEditingId(asset.id);
    setEditHeading(asset.caption || "");
    setEditAltText(asset.alt_text || "");
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
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Gallery Photo Library</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Upload, heading/caption, and manage photos displayed in the website photo gallery.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
          <Upload size={16} /> Upload New Photo
        </button>
      </div>

      <div className="panel-card">
        <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--dm-surface-container)", background: "var(--dm-surface-container-low)" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ padding: "4px 12px", background: "var(--dm-primary-container)", color: "var(--dm-on-primary-container)", borderRadius: "var(--dm-rounded-full)", fontSize: "12px", fontWeight: 600 }}>All Gallery Images ({assets.length})</span>
          </div>
        </div>

        <div className="media-grid" style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {loading && assets.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>Loading gallery photos...</div>
          ) : assets.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>No photos uploaded in the gallery.</div>
          ) : (
            assets.map((asset) => {
              const isEditing = editingId === asset.id;
              return (
                <div key={asset.id} className="media-card" style={{ border: "1px solid var(--dm-surface-container)", borderRadius: "var(--dm-rounded-md)", overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--dm-surface-container-low)", transition: "all 0.2s ease" }}>
                  
                  {/* Image Preview */}
                  <div className="media-preview" style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--dm-surface-container-high)", position: "relative" }}>
                    <img src={getMediaUrl(asset.path)} alt={asset.alt_text || asset.file_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", bottom: "8px", right: "8px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "3px" }}>
                      {asset.mime_type?.split("/")[1]?.toUpperCase() || "IMG"}
                    </div>
                  </div>

                  {/* Meta / Details Info */}
                  <div className="media-meta" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1, justifyContent: "space-between" }}>
                    <div>
                      {isEditing ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label" style={{ fontSize: "11px", marginBottom: "2px" }}>Heading / Caption</label>
                            <input 
                              type="text" 
                              className="form-input" 
                              style={{ padding: "4px 8px", fontSize: "12px", height: "30px" }}
                              value={editHeading} 
                              onChange={(e) => setEditHeading(e.target.value)} 
                              placeholder="Photo caption/heading..."
                            />
                          </div>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label" style={{ fontSize: "11px", marginBottom: "2px" }}>Alt Text</label>
                            <input 
                              type="text" 
                              className="form-input" 
                              style={{ padding: "4px 8px", fontSize: "12px", height: "30px" }}
                              value={editAltText} 
                              onChange={(e) => setEditAltText(e.target.value)} 
                              placeholder="Alt text..."
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--dm-on-surface)", marginBottom: "4px" }}>
                            {asset.caption || "No Heading / Caption"}
                          </div>
                          {asset.alt_text && (
                            <div style={{ fontSize: "12px", color: "var(--dm-outline)", marginBottom: "4px" }}>
                              <strong>Alt text:</strong> {asset.alt_text}
                            </div>
                          )}
                          <div style={{ fontSize: "11px", color: "var(--dm-outline)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={asset.path}>
                            <strong>Path:</strong> {asset.path}
                          </div>
                        </>
                      )}
                    </div>

                    <div style={{ borderTop: "1px solid var(--dm-surface-container)", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="media-size" style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{formatSize(asset.size_bytes)}</span>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {isEditing ? (
                          <>
                            <button className="btn btn-primary" style={{ height: "28px", padding: "0 10px", fontSize: "12px" }} onClick={() => handleUpdate(asset.id)} title="Save changes">
                              <Save size={12} style={{ marginRight: "4px" }} /> Save
                            </button>
                            <button className="btn btn-light" style={{ height: "28px", padding: "0 10px", fontSize: "12px" }} onClick={() => setEditingId(null)} title="Cancel">
                              <X size={12} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-light" style={{ height: "28px", padding: "0 8px" }} onClick={() => startEditing(asset)} title="Edit Heading">
                              <Edit2 size={12} />
                            </button>
                            <button className="btn btn-light" style={{ height: "28px", padding: "0 8px" }} onClick={() => window.open(asset.path, "_blank")} title="View Image">
                              <Eye size={12} />
                            </button>
                            {canDelete && (
                              <button className="btn btn-light" style={{ height: "28px", padding: "0 8px", color: "var(--dm-error)" }} onClick={() => handleDelete(asset.id)} title="Delete Photo">
                                <Trash2 size={12} />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {isUploadOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "450px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Upload Photo to Gallery</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsUploadOpen(false)}>X</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Heading / Caption</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Visa Celebration 2026" 
                  value={heading} 
                  onChange={(e) => setHeading(e.target.value)} 
                />
              </div>
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label className="form-label">Alt Text (Accessibility)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Group photo of successfully visa approved students holding flags" 
                  value={altText} 
                  onChange={(e) => setAltText(e.target.value)} 
                />
              </div>
              <div style={{ height: 1, background: "var(--dm-surface-container)", margin: "16px 0" }} />
              
              <MediaUploadField
                label="Select Photo File"
                folder="gallery"
                accept="image/*"
                onUploaded={handleUploadComplete}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" style={{ width: "100%" }} onClick={() => setIsUploadOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
