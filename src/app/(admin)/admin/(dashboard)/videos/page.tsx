"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Play, Video, Trash2, Search } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { MediaUploadField } from "@/components/admin/MediaUploadField";

export default function VideosCMSPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("youtube");
  const [providerVideoId, setProviderVideoId] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [posterId, setPosterId] = useState("");
  const [posterPreview, setPosterPreview] = useState("");
  const [category, setCategory] = useState("Office Tours");
  const [status, setStatus] = useState("draft");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/videos");
      if (response.ok) {
        const data = await response.json();
        setVideos(data || []);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn("Failed to fetch videos from API:", e);
    }
    setVideos([]);
    setLoading(false);
  };

  useEffect(() => {
    // Load user role
    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setCurrentUser(data.user);
      } catch (err) {}
    };
    loadSession();
    fetchVideos();
  }, []);

  const handleOpenEditor = (vid: any | null) => {
    setSelectedVideo(vid);
    if (vid) {
      setTitle(vid.title);
      setDescription(vid.description || "");
      setProvider(vid.provider || "youtube");
      setProviderVideoId(vid.provider_video_id || "");
      setExternalUrl(vid.external_url || "");
      setMediaId(vid.media_id || "");
      setPosterId(vid.poster_id || "");
      setPosterPreview(vid.poster_assets?.path || "");
      setCategory(vid.category || "general");
      setStatus(vid.status || "draft");
      setSortOrder(vid.sort_order || 0);
    } else {
      setTitle("");
      setDescription("");
      setProvider("youtube");
      setProviderVideoId("");
      setExternalUrl("");
      setMediaId("");
      setPosterId("");
      setPosterPreview("");
      setCategory("Office Tours");
      setStatus("draft");
      setSortOrder(0);
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        id: selectedVideo?.id,
        title,
        description,
        provider,
        provider_video_id: provider === "youtube" ? providerVideoId : "",
        external_url: provider === "facebook" ? externalUrl : "",
        media_id: provider === "local" ? mediaId : "",
        poster_id: posterId,
        category,
        status,
        sort_order: sortOrder
      };

      const method = selectedVideo ? "PUT" : "POST";
      const res = await fetch("/api/admin/videos", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchVideos();
      }
    } catch (err) {
      console.error("Failed to save video:", err);
    }
    setLoading(false);
    setIsEditorOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this video?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchVideos();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete video");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setLoading(false);
  };

  const filtered = videos.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));
  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Video Gallery</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Add YouTube, Facebook, or uploaded videos to the front page gallery.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenEditor(null)}>
          <Plus size={16} /> Add Video
        </button>
      </div>

      <div className="panel-card">
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search videos by title..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Video Title</th>
                <th>Source</th>
                <th>Category Tag</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && videos.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>Loading video gallery...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>No videos found.</td>
                </tr>
              ) : (
                filtered.map(v => (
                  <tr key={v.id}>
                    <td>
                      <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                        <Video size={16} className="text-secondary" />
                        {v.title}
                      </div>
                      {v.description && <div style={{ fontSize: "12px", color: "var(--dm-outline)", marginLeft: "24px" }}>{v.description}</div>}
                    </td>
                    <td>
                      <a href={v.external_url || (v.provider_video_id ? `https://youtube.com/watch?v=${v.provider_video_id}` : "#")} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--dm-primary)" }}>
                        <Play size={12} /> {v.provider || (v.media_id ? "local upload" : "video")}
                      </a>
                    </td>
                    <td><span style={{ padding: "2px 8px", background: "var(--dm-surface-container)", borderRadius: "var(--dm-rounded-full)", fontSize: "12px" }}>{v.category}</span></td>
                    <td>{v.sort_order || 0}</td>
                    <td><span className={`status-badge content-${v.status}`}>{v.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(v)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        {canDelete && (
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(v.id)}>
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditorOpen && (
        <div className="modal-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedVideo ? "Edit Video Info" : "Add Video"}</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Video Title</label>
                  <input type="text" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <RichTextEditor
                  label="Description"
                  value={description}
                  onChange={setDescription}
                  minHeight={120}
                />
                <div className="form-group">
                  <label className="form-label">Video Source</label>
                  <select className="form-select" value={provider} onChange={(e) => setProvider(e.target.value)}>
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="local">Uploaded Video</option>
                  </select>
                </div>
                {provider === "youtube" && (
                  <div className="form-group">
                    <label className="form-label">YouTube Video ID</label>
                    <input type="text" className="form-input" placeholder="e.g. dQw4w9WgXcQ" value={providerVideoId} onChange={(e) => setProviderVideoId(e.target.value)} />
                  </div>
                )}
                {provider === "facebook" && (
                  <div className="form-group">
                    <label className="form-label">Facebook Video URL</label>
                    <input type="url" className="form-input" placeholder="https://www.facebook.com/..." value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} />
                  </div>
                )}
                {provider === "instagram" && (
                  <div className="form-group">
                    <label className="form-label">Instagram Reel / Post URL</label>
                    <input type="url" className="form-input" placeholder="https://www.instagram.com/reel/... or /p/..." value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} />
                  </div>
                )}
                {provider === "local" && (
                  <MediaUploadField
                    label="Upload Video File"
                    folder="videos"
                    accept="video/*"
                    value={mediaId}
                    onUploaded={(asset) => setMediaId(asset.id)}
                  />
                )}
                <MediaUploadField
                  label="Poster / Thumbnail"
                  folder="video-posters"
                  accept="image/*"
                  value={posterId}
                  previewUrl={posterPreview}
                  onUploaded={(asset) => {
                    setPosterId(asset.id);
                    setPosterPreview(asset.path);
                  }}
                />
                <div className="form-group">
                  <label className="form-label">Category Tag</label>
                  <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Office Tours">Office Tours</option>
                    <option value="Destination Guides">Destination Guides</option>
                    <option value="Test Preparation">Test Preparation</option>
                    <option value="Testimonials">Testimonials</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Sort Order</label>
                  <input type="number" className="form-input" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Publication Status</label>
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setIsEditorOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
