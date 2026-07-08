"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, MessageSquare, Trash2, Search } from "lucide-react";
import { MediaUploadField } from "@/components/admin/MediaUploadField";

export default function TestimonialsCMSPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Editor modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [quote, setQuote] = useState("");
  const [imageId, setImageId] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState("draft");

  const mockTestimonials = [
    { id: "1", student_name: "Ram Prasad", destination: "Australia", quote: "EduMark made my visa process so smooth!", status: "published" }
  ];

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setTestimonials(data);
          setLoading(false);
          return;
        }
      }
    } catch (e) {}
    setTestimonials(mockTestimonials);
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
    fetchTestimonials();
  }, []);

  const handleOpenEditor = (item: any | null) => {
    setSelectedItem(item);
    if (item) {
      setName(item.student_name);
      setDestination(item.destination || "");
      setQuote(item.quote || "");
      setImageId(item.image_id || "");
      setImagePreview(item.media_assets?.path || "");
      setSortOrder(item.sort_order || 0);
      setStatus(item.status || "draft");
    } else {
      setName("");
      setDestination("");
      setQuote("");
      setImageId("");
      setImagePreview("");
      setSortOrder(0);
      setStatus("draft");
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        id: selectedItem?.id,
        student_name: name,
        destination,
        quote,
        image_id: imageId,
        sort_order: sortOrder,
        status
      };
      const method = selectedItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchTestimonials();
      }
    } catch (err) {
      console.error("Save error:", err);
    }
    setLoading(false);
    setIsEditorOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this testimonial?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchTestimonials();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete testimonial");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setLoading(false);
  };

  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");
  const filtered = testimonials.filter(t => 
    t.student_name.toLowerCase().includes(search.toLowerCase()) ||
    (t.destination || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Student Testimonials</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Publish verified student success stories and feedback.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenEditor(null)}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="panel-card">
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search by student name or country..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student Photo</th>
                <th>Student Name</th>
                <th>Destination</th>
                <th>Quote</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && testimonials.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>Loading testimonials...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>No testimonials found.</td>
                </tr>
              ) : filtered.map(test => (
                <tr key={test.id}>
                  <td>
                    {test.media_assets?.path ? (
                      <img src={test.media_assets.path} alt={test.student_name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--dm-surface-container)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                        {test.student_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td><div style={{ fontWeight: 600 }}>{test.student_name}</div></td>
                  <td>{test.destination || "General"}</td>
                  <td style={{ fontStyle: "italic", maxWidth: "350px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={test.quote}>
                    "{test.quote}"
                  </td>
                  <td>{test.sort_order || 0}</td>
                  <td><span className={`status-badge content-${test.status}`}>{test.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(test)}>
                        <Edit2 size={12} /> Edit
                      </button>
                      {canDelete && (
                        <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(test.id)}>
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="modal-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedItem ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Student Name</label>
                  <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Destination Country / Route</label>
                  <input type="text" className="form-input" placeholder="e.g. Australia or UK student visa" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Quote Text</label>
                  <textarea 
                    className="form-textarea" 
                    style={{ minHeight: "100px", padding: "8px" }} 
                    placeholder="Enter the testimonial quote..."
                    value={quote} 
                    onChange={(e) => setQuote(e.target.value)} 
                    required 
                  />
                </div>

                <MediaUploadField
                  label="Student Photo"
                  folder="testimonials"
                  value={imageId}
                  previewUrl={imagePreview}
                  onUploaded={(asset) => {
                    setImageId(asset.id);
                    setImagePreview(asset.path);
                  }}
                />

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
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
