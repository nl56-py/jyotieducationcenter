"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Settings } from "lucide-react";

export default function SEOControlPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [pageType, setPageType] = useState("standard");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [canonicalPath, setCanonicalPath] = useState("");
  const [status, setStatus] = useState("draft");

  const mockPages = [
    { id: "1", slug: "home", title: "Homepage", page_type: "standard", seo_title: "EduMark | Leading Educational Consultancy in Nepal", seo_description: "Best counseling services and test preparation in Putalisadak.", canonical_path: "/", status: "published" },
    { id: "2", slug: "about", title: "About Us", page_type: "standard", seo_title: "About EduMark | Expert Counselors", seo_description: "Learn about our vision, management, and student support teams.", canonical_path: "/about", status: "published" },
    { id: "3", slug: "contact", title: "Contact Us", page_type: "standard", seo_title: "Contact EduMark | Get in Touch", seo_description: "Reach our Putalisadak office via phone, email, or live map navigation.", canonical_path: "/contact", status: "published" }
  ];

  const fetchPages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/seo");
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setPages(data);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch pages SEO from API:", e);
    }
    setPages(mockPages);
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
    fetchPages();
  }, []);

  const handleOpenEditor = (page: any | null) => {
    setSelectedPage(page);
    if (page) {
      setTitle(page.title);
      setSlug(page.slug);
      setPageType(page.page_type || "standard");
      setSeoTitle(page.seo_title || "");
      setSeoDescription(page.seo_description || "");
      setCanonicalPath(page.canonical_path || "");
      setStatus(page.status || "draft");
    } else {
      setTitle("");
      setSlug("");
      setPageType("standard");
      setSeoTitle("");
      setSeoDescription("");
      setCanonicalPath("");
      setStatus("draft");
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        id: selectedPage?.id,
        title,
        slug,
        page_type: pageType,
        seo_title: seoTitle,
        seo_description: seoDescription,
        canonical_path: canonicalPath,
        status
      };

      const method = selectedPage ? "PUT" : "POST";
      const res = await fetch("/api/admin/seo", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchPages();
      }
    } catch (err) {
      console.error("Failed to save SEO metadata:", err);
    }
    setLoading(false);
    setIsEditorOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this page SEO record?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/seo?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchPages();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete page record");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setLoading(false);
  };

  const filtered = pages.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.slug.toLowerCase().includes(search.toLowerCase())
  );
  
  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>SEO Metadata & Sitemap Controls</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Configure indexable static page titles, search descriptions, and canonical paths to dominate Google rankings.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenEditor(null)}>
          <Plus size={16} /> Add Custom Page
        </button>
      </div>

      <div className="panel-card">
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search indexable pages..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page Name</th>
                <th>SEO Meta Title</th>
                <th>Meta Description</th>
                <th>Sitemap Include</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && pages.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>Loading pages list...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>No indexable pages registered.</td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                        <Settings size={16} className="text-secondary" />
                        {p.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>/{p.slug}</div>
                    </td>
                    <td><div style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={p.seo_title}>{p.seo_title || <span style={{ color: "var(--dm-error)", fontSize: "12px" }}>⚠️ Missing Title</span>}</div></td>
                    <td><div style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={p.seo_description}>{p.seo_description || <span style={{ color: "var(--dm-error)", fontSize: "12px" }}>⚠️ Missing Description</span>}</div></td>
                    <td>
                      <span className={`status-badge content-${p.status === "published" ? "published" : "draft"}`}>
                        {p.status === "published" ? "Included" : "Excluded"}
                      </span>
                    </td>
                    <td><span className={`status-badge content-${p.status}`}>{p.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(p)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        {canDelete && (
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(p.id)}>
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
              <h3 className="modal-title">{selectedPage ? "Edit SEO Metadata" : "Add Page SEO Schema"}</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Internal Page Title</label>
                  <input type="text" className="form-input" placeholder="e.g. Services Page" value={title} onChange={(e) => {
                    setTitle(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug URL</label>
                  <input type="text" className="form-input" placeholder="e.g. services" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">SEO Meta Title (recommended 50-60 chars)</label>
                  <input type="text" className="form-input" placeholder="e.g. Language Classes & Counseling Services | EduMark" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">SEO Meta Description (recommended 150-160 chars)</label>
                  <textarea className="form-textarea" style={{ minHeight: "80px" }} placeholder="Provide brief summary of the page context for search engines..." value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Canonical Path</label>
                  <input type="text" className="form-input" placeholder="e.g. /services" value={canonicalPath} onChange={(e) => setCanonicalPath(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Index Status (Sitemap visibility)</label>
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="draft">Draft (Do Not Index)</option>
                    <option value="published">Published (Index & Include in sitemap)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setIsEditorOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save SEO Metadata"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
