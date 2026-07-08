"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Archive, Globe, CheckCircle, Search, Eye } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default function BlogsCMSPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Study Abroad Guides");
  const [excerpt, setExcerpt] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/admin/blogs");
        if (response.ok) {
          const data = await response.json();
          setBlogs(data || []);
          setLoading(false);
          return;
        }
      } catch (err) {}
      setBlogs([]);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleOpenEditor = (blog: any | null) => {
    setSelectedBlog(blog);
    if (blog) {
      setTitle(blog.title);
      setSlug(blog.slug);
      setCategory(blog.category);
      setExcerpt(blog.excerpt);
      setBodyText(blog.bodyText);
      setSeoTitle(blog.seoTitle || "");
      setSeoDesc(blog.seoDesc || "");
      setFeatured(blog.featured);
    } else {
      setTitle("");
      setSlug("");
      setCategory("Study Abroad Guides");
      setExcerpt("");
      setBodyText("");
      setSeoTitle("");
      setSeoDesc("");
      setFeatured(false);
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedBlog) {
        // Edit
        const response = await fetch("/api/admin/blogs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedBlog.id,
            title,
            slug,
            category,
            excerpt,
            bodyText,
            seoTitle,
            seoDesc,
            featured,
          }),
        });
        if (response.ok) {
          const res = await fetch("/api/admin/blogs");
          if (res.ok) {
            const data = await res.json();
            setBlogs(data);
          }
        }
      } else {
        // Create
        const response = await fetch("/api/admin/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            slug,
            category,
            excerpt,
            bodyText,
            seoTitle,
            seoDesc,
            featured,
            status: "draft",
          }),
        });
        if (response.ok) {
          const res = await fetch("/api/admin/blogs");
          if (res.ok) {
            const data = await res.json();
            setBlogs(data);
          }
        }
      }
    } catch (err) {
      console.error("Failed to save blog post:", err);
    }
    setLoading(false);
    setIsEditorOpen(false);
  };

  const handlePublishToggle = async (blogId: string) => {
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return;

    const newStatus = blog.status === "published" ? "archived" : "published";

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blogId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/admin/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      }
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
    }
  };

  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Blog Publications</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Publish guide articles, test preparation tips, and announcement blogs.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => handleOpenEditor(null)}>
          <Plus size={16} /> New Article
        </button>
      </div>

      <div className="panel-card">
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search blogs by title..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title & Info</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Publish Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>Loading blogs...</td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>No articles found.</td>
                </tr>
              ) : (
                filteredBlogs.map((b) => (
                  <tr key={b.id}>
                    <td style={{ maxWidth: "300px" }}>
                      <div style={{ fontWeight: 600 }}>{b.title}</div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>/{b.slug}</div>
                    </td>
                    <td>{b.category}</td>
                    <td>
                      <span className={`status-badge content-${b.status}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: "13px", fontWeight: 500, color: b.featured ? "var(--dm-primary)" : "inherit" }}>
                        {b.featured ? "★ Yes" : "No"}
                      </span>
                    </td>
                    <td>{b.published_at || "Not Published"}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button 
                          className="btn btn-light" 
                          style={{ height: "30px", padding: "0 10px" }}
                          onClick={() => handleOpenEditor(b)}
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button 
                          className="btn btn-light"
                          style={{ height: "30px", padding: "0 10px" }}
                          onClick={() => handlePublishToggle(b.id)}
                        >
                          {b.status === "published" ? <Archive size={12} /> : <Globe size={12} />}
                          {b.status === "published" ? " Archive" : " Publish"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="modal-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px" }}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedBlog ? "Edit Blog Post" : "Create Blog Post"}</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {/* Main Content Info */}
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Post Details</h4>
                  
                  <div className="form-group">
                    <label className="form-label">Article Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={title} 
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                      }} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Slug URL</label>
                    <input type="text" className="form-input" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="Study Abroad Guides">Study Abroad Guides</option>
                      <option value="Test Prep Tips">Test Prep Tips</option>
                      <option value="Visa Advice">Visa Advice</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Excerpt Summary</label>
                    <textarea className="form-textarea" style={{ minHeight: "60px" }} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
                  </div>

                  <div className="form-group" style={{ flexDirection: "row", gap: "10px", alignItems: "center" }}>
                    <input type="checkbox" id="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                    <label htmlFor="featured" className="form-label" style={{ cursor: "pointer", marginBottom: 0 }}>Feature this post on home page banner</label>
                  </div>
                </div>

                {/* Content body & SEO fields */}
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Body & SEO Control</h4>

                  <RichTextEditor
                    label="Post Body"
                    value={bodyText}
                    onChange={setBodyText}
                    minHeight={190}
                  />

                  <div className="form-group">
                    <label className="form-label">SEO Meta Title</label>
                    <input type="text" className="form-input" placeholder="e.g. Australian Student Visa Guide | EduMark" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
                  </div>

                  <RichTextEditor
                    label="SEO Meta Description"
                    value={seoDesc}
                    onChange={setSeoDesc}
                    minHeight={90}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setIsEditorOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
