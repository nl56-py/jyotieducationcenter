"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Search, Check, Globe } from "lucide-react";

export default function DestinationsCMSPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [costRange, setCostRange] = useState("");
  const [intakes, setIntakes] = useState("");
  const [summary, setSummary] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("draft");

  const mockDests = [
    {
      id: "1",
      slug: "australia",
      name: "Australia",
      cost_range: "$20,000 - $45,000 AUD / Year",
      intake_badges: ["Feb", "July", "Nov"],
      summary: "Study in world-class cities with vibrant cultural diversity.",
      status: "published",
      featured: true
    },
    {
      id: "2",
      slug: "usa",
      name: "United States",
      cost_range: "$25,000 - $60,000 USD / Year",
      intake_badges: ["Spring (Jan)", "Fall (Aug)"],
      summary: "Access the largest network of top-ranking universities.",
      status: "published",
      featured: true
    }
  ];

  useEffect(() => {
    setDestinations(mockDests);
  }, []);

  const handleOpenEditor = (dest: any | null) => {
    setSelectedDest(dest);
    if (dest) {
      setName(dest.name);
      setSlug(dest.slug);
      setCostRange(dest.cost_range);
      setIntakes(dest.intake_badges.join(", "));
      setSummary(dest.summary);
      setFeatured(dest.featured);
      setStatus(dest.status);
    } else {
      setName("");
      setSlug("");
      setCostRange("");
      setIntakes("");
      setSummary("");
      setFeatured(false);
      setStatus("draft");
    }
    setIsEditorOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const intakeArray = intakes.split(",").map(i => i.trim()).filter(Boolean);
    if (selectedDest) {
      setDestinations(destinations.map(d => d.id === selectedDest.id ? {
        ...d,
        name,
        slug,
        cost_range: costRange,
        intake_badges: intakeArray,
        summary,
        featured,
        status
      } : d));
    } else {
      const newDest = {
        id: `dest-${Date.now()}`,
        slug,
        name,
        cost_range: costRange,
        intake_badges: intakeArray,
        summary,
        featured,
        status
      };
      setDestinations([...destinations, newDest]);
    }
    setIsEditorOpen(false);
  };

  const filtered = destinations.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Destination Countries</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Manage informational pages for study abroad destination countries.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenEditor(null)}>
          <Plus size={16} /> Add Destination
        </button>
      </div>

      <div className="panel-card">
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search destination country..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Country Name</th>
                <th>Cost Range</th>
                <th>Intake Intakes</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                      <Globe size={16} className="text-primary" />
                      {d.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>/{d.slug}</div>
                  </td>
                  <td>{d.cost_range}</td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {d.intake_badges.map((badge: string, bIdx: number) => (
                        <span key={bIdx} style={{ fontSize: "11px", background: "var(--dm-surface-container)", padding: "2px 6px", borderRadius: "var(--dm-rounded-sm)" }}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{d.featured ? "★ Featured" : "No"}</td>
                  <td>
                    <span className={`status-badge content-${d.status}`}>{d.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(d)}>
                      <Edit2 size={12} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditorOpen && (
        <div className="modal-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedDest ? "Edit Country Info" : "Add Country Info"}</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Country Name</label>
                  <input type="text" className="form-input" value={name} onChange={(e) => {
                    setName(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug URL</label>
                  <input type="text" className="form-input" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Cost Range Info</label>
                  <input type="text" className="form-input" placeholder="e.g. $20,000 - $45,000 AUD / Year" value={costRange} onChange={(e) => setCostRange(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Intake Months (comma separated)</label>
                  <input type="text" className="form-input" placeholder="e.g. Feb, July, Nov" value={intakes} onChange={(e) => setIntakes(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Country Summary Description</label>
                  <textarea className="form-textarea" value={summary} onChange={(e) => setSummary(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Publication Status</label>
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="form-group" style={{ flexDirection: "row", gap: "10px", alignItems: "center" }}>
                  <input type="checkbox" id="dest-feat" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                  <label htmlFor="dest-feat" className="form-label" style={{ marginBottom: 0 }}>Feature on homepage cards grid</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setIsEditorOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Country</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
