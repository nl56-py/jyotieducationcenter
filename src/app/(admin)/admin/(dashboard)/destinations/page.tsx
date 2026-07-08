"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Search, Check, Globe, Trash2 } from "lucide-react";

export default function DestinationsCMSPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [costRange, setCostRange] = useState("");
  const [intakes, setIntakes] = useState("");
  const [summary, setSummary] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("draft");
  const [universities, setUniversities] = useState("");
  const [detailedFees, setDetailedFees] = useState("");
  const [nextIntakeLabel, setNextIntakeLabel] = useState("");
  const [nextIntakeDate, setNextIntakeDate] = useState("");
  const [universitiesDetail, setUniversitiesDetail] = useState<any[]>([]);

  // Detailed fields
  const [introCopy, setIntroCopy] = useState<string[]>([]);
  const [why, setWhy] = useState<string[]>([]);
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [requirementsDetail, setRequirementsDetail] = useState<any>({ academic: "", english: "", financial: "", genuine: "" });
  const [intakesList, setIntakesList] = useState<any[]>([]);
  const [costsList, setCostsList] = useState<any[]>([]);
  const [scholarshipsList, setScholarshipsList] = useState<any[]>([]);
  const [faq, setFaq] = useState<any[]>([]);

  // Modal sub-tab state
  const [modalTab, setModalTab] = useState<"general" | "intro" | "courses" | "requirements" | "finances" | "faq">("general");

  const fetchDests = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/destinations");
      if (response.ok) {
        const data = await response.json();
        setDestinations(data || []);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Failed to fetch destinations:", err);
    }
    setDestinations([]);
    setLoading(false);
  };

  useEffect(() => {
    // Fetch user session for role permissions
    const loadSession = async () => {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        setCurrentUser(sessionData.user);
      } catch (err) {
        console.error("Failed to load session", err);
      }
    };
    loadSession();
    fetchDests();
  }, []);

  const handleOpenEditor = (dest: any | null) => {
    setSelectedDest(dest);
    setModalTab("general");
    if (dest) {
      setName(dest.name);
      setSlug(dest.slug);
      setCostRange(dest.cost_range || "");
      setIntakes((dest.intake_badges || []).join(", "));
      setSummary(dest.summary || "");
      setFeatured(dest.featured || false);
      setStatus(dest.status || "draft");
      setUniversities((dest.universities || []).join(", "));
      setDetailedFees(dest.detailed_fees || dest.university_cost || "");
      setNextIntakeLabel(dest.next_intake_label || "");
      setNextIntakeDate(dest.next_intake_date ? dest.next_intake_date.split("T")[0] : "");
      setUniversitiesDetail(dest.universities_detail || []);
      setIntroCopy(dest.intro_copy || []);
      setWhy(dest.why || []);
      setCoursesList(dest.courses_list || []);
      setRequirementsDetail(dest.requirements_detail || { academic: "", english: "", financial: "", genuine: "" });
      setIntakesList(dest.intakes_list || []);
      setCostsList(dest.costs_list || []);
      setScholarshipsList(dest.scholarships_list || []);
      setFaq(dest.faq || []);
    } else {
      setName("");
      setSlug("");
      setCostRange("");
      setIntakes("");
      setSummary("");
      setFeatured(false);
      setStatus("draft");
      setUniversities("");
      setDetailedFees("");
      setNextIntakeLabel("");
      setNextIntakeDate("");
      setUniversitiesDetail([]);
      setIntroCopy([]);
      setWhy([]);
      setCoursesList([]);
      setRequirementsDetail({ academic: "", english: "", financial: "", genuine: "" });
      setIntakesList([]);
      setCostsList([]);
      setScholarshipsList([]);
      setFaq([]);
    }
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const intakeArray = intakes.split(",").map(i => i.trim()).filter(Boolean);

    const payload = {
      name,
      slug,
      cost_range: costRange,
      intake_badges: intakeArray,
      summary,
      featured,
      status,
      universities: universities.split(",").map(u => u.trim()).filter(Boolean),
      detailed_fees: detailedFees,
      next_intake_label: nextIntakeLabel,
      next_intake_date: nextIntakeDate || null,
      universities_detail: universitiesDetail,
      intro_copy: introCopy,
      why,
      courses_list: coursesList,
      requirements_detail: requirementsDetail,
      intakes_list: intakesList,
      costs_list: costsList,
      scholarships_list: scholarshipsList,
      faq
    };

    try {
      if (selectedDest) {
        // Edit
        const response = await fetch("/api/admin/destinations", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedDest.id,
            ...payload
          }),
        });
        if (response.ok) {
          await fetchDests();
        }
      } else {
        // Create
        const response = await fetch("/api/admin/destinations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          await fetchDests();
        }
      }
    } catch (err) {
      console.error("Failed to save destination:", err);
    }
    setLoading(false);
    setIsEditorOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this destination country?")) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/destinations?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchDests();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete destination");
      }
    } catch (err) {
      console.error("Failed to delete destination:", err);
    }
    setLoading(false);
  };

  const filtered = destinations.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");

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
                <th>Intake Months</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && destinations.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>Loading destinations...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>No destinations found.</td>
                </tr>
              ) : (
                filtered.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                        <Globe size={16} className="text-primary" />
                        {d.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>/{d.slug}</div>
                    </td>
                    <td>
                      <div>{d.cost_range || "N/A"}</div>
                      {(d.detailed_fees || d.university_cost) && (
                        <div style={{ fontSize: "11px", color: "var(--purple)", marginTop: "4px", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={d.detailed_fees || d.university_cost}>
                          Uni: {d.detailed_fees || d.university_cost}
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "4px" }}>
                        {(d.intake_badges || []).map((badge: string, bIdx: number) => (
                          <span key={bIdx} style={{ fontSize: "11px", background: "var(--dm-surface-container)", padding: "2px 6px", borderRadius: "var(--dm-rounded-sm)" }}>
                            {badge}
                          </span>
                        ))}
                      </div>
                      {d.next_intake_label && (
                        <div style={{ fontSize: "11px", color: "var(--purple)", fontWeight: 700 }}>
                          Planner: {d.next_intake_label}
                        </div>
                      )}
                    </td>
                    <td>{d.featured ? "★ Featured" : "No"}</td>
                    <td>
                      <span className={`status-badge content-${d.status}`}>{d.status}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-light" style={{ height: "30px", padding: "0 10px" }} onClick={() => handleOpenEditor(d)}>
                          <Edit2 size={12} /> Edit
                        </button>
                        {canDelete && (
                          <button className="btn btn-danger" style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleDelete(d.id)} title="Delete Country">
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "750px", width: "90%" }}>
            <div className="modal-header" style={{ paddingBottom: "10px" }}>
              <h3 className="modal-title">{selectedDest ? "Edit Country Info" : "Add Country Info"}</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsEditorOpen(false)}>X</button>
            </div>

            {/* Sub-tab Switcher Bar */}
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", padding: "0 24px 12px 24px", borderBottom: "1px solid var(--line)" }}>
              {(["general", "intro", "courses", "requirements", "finances", "faq"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setModalTab(tab)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    background: modalTab === tab ? "var(--purple)" : "transparent",
                    color: modalTab === tab ? "#fff" : "var(--navy)",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s"
                  }}
                >
                  {tab === "intro" ? "Intro & Benefits" : tab === "finances" ? "Costs & Funding" : tab}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ maxHeight: "60vh", overflowY: "auto", padding: "24px" }}>
                
                {/* 1. GENERAL TAB */}
                {modalTab === "general" && (
                  <>
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
                      <label className="form-label">Universities (comma-separated list of names)</label>
                      <input type="text" className="form-input" placeholder="e.g. SRM University, Centurion" value={universities} onChange={(e) => setUniversities(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Next Intake Month/Label</label>
                      <input type="text" className="form-input" placeholder="e.g. September 2026 Intake" value={nextIntakeLabel} onChange={(e) => setNextIntakeLabel(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Next Intake Date (Target countdown)</label>
                      <input type="date" className="form-input" value={nextIntakeDate} onChange={(e) => setNextIntakeDate(e.target.value)} />
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
                  </>
                )}

                {/* 2. INTRO & BENEFITS TAB */}
                {modalTab === "intro" && (
                  <>
                    <div className="form-group" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "20px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <label className="form-label" style={{ fontWeight: "700", marginBottom: 0 }}>Intro Copy Paragraphs</label>
                        <button type="button" className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "11px", height: "auto" }} onClick={() => setIntroCopy([...introCopy, ""])}>
                          + Add Paragraph
                        </button>
                      </div>
                      {introCopy.map((para, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                          <textarea className="form-textarea" style={{ flex: 1, minHeight: "70px", padding: "8px" }} value={para} onChange={(e) => {
                            const updated = [...introCopy];
                            updated[idx] = e.target.value;
                            setIntroCopy(updated);
                          }} required />
                          <button type="button" className="btn btn-danger" style={{ height: "36px", padding: "0 10px", alignSelf: "center" }} onClick={() => setIntroCopy(introCopy.filter((_, iIdx) => iIdx !== idx))}>Remove</button>
                        </div>
                      ))}
                      {introCopy.length === 0 && (
                        <div style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", padding: "10px 0" }}>No intro paragraphs configured. (Will fallback to summary/highlight)</div>
                      )}
                    </div>

                    <div className="form-group">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <label className="form-label" style={{ fontWeight: "700", marginBottom: 0 }}>Why Study Here Benefits</label>
                        <button type="button" className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "11px", height: "auto" }} onClick={() => setWhy([...why, ""])}>
                          + Add Benefit
                        </button>
                      </div>
                      {why.map((benefit, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                          <input type="text" className="form-input" style={{ padding: "8px" }} value={benefit} onChange={(e) => {
                            const updated = [...why];
                            updated[idx] = e.target.value;
                            setWhy(updated);
                          }} required />
                          <button type="button" className="btn btn-danger" style={{ height: "36px", padding: "0 10px" }} onClick={() => setWhy(why.filter((_, iIdx) => iIdx !== idx))}>Remove</button>
                        </div>
                      ))}
                      {why.length === 0 && (
                        <div style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", padding: "10px 0" }}>No benefits listed.</div>
                      )}
                    </div>
                  </>
                )}

                {/* 3. COURSES & CAMPUS TAB */}
                {modalTab === "courses" && (
                  <>
                    <div className="form-group" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "20px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <label className="form-label" style={{ fontWeight: "700", marginBottom: 0 }}>Top Courses to Study</label>
                        <button type="button" className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "11px", height: "auto" }} onClick={() => setCoursesList([...coursesList, { title: "", description: "" }])}>
                          + Add Course
                        </button>
                      </div>
                      {coursesList.map((course, idx) => (
                        <div key={idx} style={{ background: "var(--surface-mist)", border: "1px solid var(--line)", padding: "16px", borderRadius: "8px", marginBottom: "12px", position: "relative" }}>
                          <button type="button" style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }} onClick={() => setCoursesList(coursesList.filter((_, cIdx) => cIdx !== idx))}>
                            Remove
                          </button>
                          <div style={{ marginBottom: "10px" }}>
                            <label className="form-label" style={{ fontSize: "11px" }}>Course Title (e.g. 1. Computer Science)</label>
                            <input type="text" className="form-input" style={{ padding: "6px" }} value={course.title} onChange={(e) => {
                              const updated = [...coursesList];
                              updated[idx].title = e.target.value;
                              setCoursesList(updated);
                            }} required />
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: "11px" }}>Description</label>
                            <textarea className="form-textarea" style={{ minHeight: "60px", padding: "6px" }} value={course.description} onChange={(e) => {
                              const updated = [...coursesList];
                              updated[idx].description = e.target.value;
                              setCoursesList(updated);
                            }} required />
                          </div>
                        </div>
                      ))}
                      {coursesList.length === 0 && (
                        <div style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", padding: "10px 0" }}>No course details configured. (Will fallback to programs list)</div>
                      )}
                    </div>

                    <div className="form-group">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <label className="form-label" style={{ fontWeight: "700", marginBottom: 0 }}>Structured Campus Directory</label>
                        <button type="button" className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "11px", height: "auto" }} onClick={() => setUniversitiesDetail([...universitiesDetail, { name: "", fees: "", courses: "", description: "", image: "" }])}>
                          + Add University Card
                        </button>
                      </div>
                      {universitiesDetail.map((uni, idx) => (
                        <div key={idx} style={{ background: "var(--white)", border: "1px solid var(--line)", padding: "12px", borderRadius: "6px", marginBottom: "10px", position: "relative" }}>
                          <button type="button" style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }} onClick={() => setUniversitiesDetail(universitiesDetail.filter((_, uIdx) => uIdx !== idx))}>
                            Remove
                          </button>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                            <div>
                              <label className="form-label" style={{ fontSize: "11px" }}>University Name</label>
                              <input type="text" className="form-input" style={{ padding: "6px" }} value={uni.name} onChange={(e) => {
                                const updated = [...universitiesDetail];
                                updated[idx].name = e.target.value;
                                setUniversitiesDetail(updated);
                              }} required />
                            </div>
                            <div>
                              <label className="form-label" style={{ fontSize: "11px" }}>Tuition Fees (e.g. £15,500 / year)</label>
                              <input type="text" className="form-input" style={{ padding: "6px" }} value={uni.fees} onChange={(e) => {
                                const updated = [...universitiesDetail];
                                updated[idx].fees = e.target.value;
                                setUniversitiesDetail(updated);
                              }} />
                            </div>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                            <div>
                              <label className="form-label" style={{ fontSize: "11px" }}>Key Courses</label>
                              <input type="text" className="form-input" style={{ padding: "6px" }} value={uni.courses} onChange={(e) => {
                                const updated = [...universitiesDetail];
                                updated[idx].courses = e.target.value;
                                setUniversitiesDetail(updated);
                              }} />
                            </div>
                            <div>
                              <label className="form-label" style={{ fontSize: "11px" }}>Image Path (e.g. /images/MCAST.jpeg)</label>
                              <input type="text" className="form-input" style={{ padding: "6px" }} value={uni.image} onChange={(e) => {
                                const updated = [...universitiesDetail];
                                updated[idx].image = e.target.value;
                                setUniversitiesDetail(updated);
                              }} />
                            </div>
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: "11px" }}>Description Details</label>
                            <textarea className="form-textarea" style={{ minHeight: "60px", padding: "6px" }} value={uni.description} onChange={(e) => {
                              const updated = [...universitiesDetail];
                              updated[idx].description = e.target.value;
                              setUniversitiesDetail(updated);
                            }} />
                          </div>
                        </div>
                      ))}
                      {universitiesDetail.length === 0 && (
                        <div style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", padding: "10px 0" }}>No campus directory items configured yet.</div>
                      )}
                    </div>
                  </>
                )}

                {/* 4. REQUIREMENTS TAB */}
                {modalTab === "requirements" && (
                  <>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: "700" }}>1. Academic Admission Requirements</label>
                      <textarea className="form-textarea" style={{ minHeight: "80px", padding: "8px" }} value={requirementsDetail.academic || ""} onChange={(e) => setRequirementsDetail({ ...requirementsDetail, academic: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: "700" }}>2. Language Score Requirements</label>
                      <textarea className="form-textarea" style={{ minHeight: "80px", padding: "8px" }} value={requirementsDetail.english || ""} onChange={(e) => setRequirementsDetail({ ...requirementsDetail, english: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: "700" }}>3. Financial Capacity Requirements</label>
                      <textarea className="form-textarea" style={{ minHeight: "80px", padding: "8px" }} value={requirementsDetail.financial || ""} onChange={(e) => setRequirementsDetail({ ...requirementsDetail, financial: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: "700" }}>4. Genuine Student (GST/GS) Requirements</label>
                      <textarea className="form-textarea" style={{ minHeight: "80px", padding: "8px" }} value={requirementsDetail.genuine || ""} onChange={(e) => setRequirementsDetail({ ...requirementsDetail, genuine: e.target.value })} />
                    </div>
                  </>
                )}

                {/* 5. COSTS & FUNDING TAB */}
                {modalTab === "finances" && (
                  <>
                    <div className="form-group" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "20px", marginBottom: "20px" }}>
                      <label className="form-label" style={{ fontWeight: "700" }}>Official Tuition & Fee Breakdown Text</label>
                      <textarea className="form-textarea" style={{ minHeight: "80px" }} placeholder="e.g. B.Tech: ₹1,20,000–₹2,50,000/year; Hostel: ₹60,000–₹1,00,000/year" value={detailedFees} onChange={(e) => setDetailedFees(e.target.value)} />
                    </div>

                    <div className="form-group" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "20px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <label className="form-label" style={{ fontWeight: "700", marginBottom: 0 }}>Estimated Cost Breakdown List</label>
                        <button type="button" className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "11px", height: "auto" }} onClick={() => setCostsList([...costsList, { category: "", range: "", desc: "" }])}>
                          + Add Cost Item
                        </button>
                      </div>
                      {costsList.map((item, idx) => (
                        <div key={idx} style={{ background: "var(--surface-mist)", border: "1px solid var(--line)", padding: "12px", borderRadius: "6px", marginBottom: "10px", position: "relative" }}>
                          <button type="button" style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }} onClick={() => setCostsList(costsList.filter((_, cIdx) => cIdx !== idx))}>
                            Remove
                          </button>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                            <div>
                              <label className="form-label" style={{ fontSize: "11px" }}>Expense Category</label>
                              <input type="text" className="form-input" style={{ padding: "6px" }} value={item.category} onChange={(e) => {
                                const updated = [...costsList];
                                updated[idx].category = e.target.value;
                                setCostsList(updated);
                              }} required />
                            </div>
                            <div>
                              <label className="form-label" style={{ fontSize: "11px" }}>Estimated Cost Range</label>
                              <input type="text" className="form-input" style={{ padding: "6px" }} value={item.range} onChange={(e) => {
                                const updated = [...costsList];
                                updated[idx].range = e.target.value;
                                setCostsList(updated);
                              }} required />
                            </div>
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: "11px" }}>Description</label>
                            <input type="text" className="form-input" style={{ padding: "6px" }} value={item.desc} onChange={(e) => {
                              const updated = [...costsList];
                              updated[idx].desc = e.target.value;
                              setCostsList(updated);
                            }} required />
                          </div>
                        </div>
                      ))}
                      {costsList.length === 0 && (
                        <div style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", padding: "10px 0" }}>No cost items configured.</div>
                      )}
                    </div>

                    <div className="form-group" style={{ borderBottom: "1px solid var(--line)", paddingBottom: "20px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <label className="form-label" style={{ fontWeight: "700", marginBottom: 0 }}>Scholarships & Funding</label>
                        <button type="button" className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "11px", height: "auto" }} onClick={() => setScholarshipsList([...scholarshipsList, { name: "", details: "" }])}>
                          + Add Scholarship
                        </button>
                      </div>
                      {scholarshipsList.map((item, idx) => (
                        <div key={idx} style={{ background: "var(--surface-mist)", border: "1px solid var(--line)", padding: "12px", borderRadius: "6px", marginBottom: "10px", position: "relative" }}>
                          <button type="button" style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }} onClick={() => setScholarshipsList(scholarshipsList.filter((_, sIdx) => sIdx !== idx))}>
                            Remove
                          </button>
                          <div style={{ marginBottom: "8px" }}>
                            <label className="form-label" style={{ fontSize: "11px" }}>Scholarship Name</label>
                            <input type="text" className="form-input" style={{ padding: "6px" }} value={item.name} onChange={(e) => {
                              const updated = [...scholarshipsList];
                              updated[idx].name = e.target.value;
                              setScholarshipsList(updated);
                            }} required />
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: "11px" }}>Details</label>
                            <textarea className="form-textarea" style={{ minHeight: "60px", padding: "6px" }} value={item.details} onChange={(e) => {
                              const updated = [...scholarshipsList];
                              updated[idx].details = e.target.value;
                              setScholarshipsList(updated);
                            }} required />
                          </div>
                        </div>
                      ))}
                      {scholarshipsList.length === 0 && (
                        <div style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", padding: "10px 0" }}>No scholarships configured.</div>
                      )}
                    </div>

                    <div className="form-group">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <label className="form-label" style={{ fontWeight: "700", marginBottom: 0 }}>Intakes & Deadlines List</label>
                        <button type="button" className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "11px", height: "auto" }} onClick={() => setIntakesList([...intakesList, { title: "", period: "", deadline: "", desc: "" }])}>
                          + Add Intake Info
                        </button>
                      </div>
                      {intakesList.map((item, idx) => (
                        <div key={idx} style={{ background: "var(--surface-mist)", border: "1px solid var(--line)", padding: "12px", borderRadius: "6px", marginBottom: "10px", position: "relative" }}>
                          <button type="button" style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }} onClick={() => setIntakesList(intakesList.filter((_, iIdx) => iIdx !== idx))}>
                            Remove
                          </button>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                            <div>
                              <label className="form-label" style={{ fontSize: "11px" }}>Intake Title (e.g. Autumn Intake)</label>
                              <input type="text" className="form-input" style={{ padding: "6px" }} value={item.title} onChange={(e) => {
                                const updated = [...intakesList];
                                updated[idx].title = e.target.value;
                                setIntakesList(updated);
                              }} required />
                            </div>
                            <div>
                              <label className="form-label" style={{ fontSize: "11px" }}>Study Period (e.g. September / October)</label>
                              <input type="text" className="form-input" style={{ padding: "6px" }} value={item.period} onChange={(e) => {
                                const updated = [...intakesList];
                                updated[idx].period = e.target.value;
                                setIntakesList(updated);
                              }} required />
                            </div>
                          </div>
                          <div style={{ marginBottom: "10px" }}>
                            <label className="form-label" style={{ fontSize: "11px" }}>Application Deadline (e.g. April to July)</label>
                            <input type="text" className="form-input" style={{ padding: "6px" }} value={item.deadline} onChange={(e) => {
                              const updated = [...intakesList];
                              updated[idx].deadline = e.target.value;
                              setIntakesList(updated);
                            }} required />
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: "11px" }}>Key Information / Description</label>
                            <input type="text" className="form-input" style={{ padding: "6px" }} value={item.desc} onChange={(e) => {
                              const updated = [...intakesList];
                              updated[idx].desc = e.target.value;
                              setIntakesList(updated);
                            }} required />
                          </div>
                        </div>
                      ))}
                      {intakesList.length === 0 && (
                        <div style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", padding: "10px 0" }}>No intake items configured.</div>
                      )}
                    </div>
                  </>
                )}

                {/* 6. FAQ TAB */}
                {modalTab === "faq" && (
                  <>
                    <div className="form-group">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <label className="form-label" style={{ fontWeight: "700", marginBottom: 0 }}>Frequently Asked Questions</label>
                        <button type="button" className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "11px", height: "auto" }} onClick={() => setFaq([...faq, ["", ""]])}>
                          + Add FAQ
                        </button>
                      </div>
                      {faq.map((item, idx) => (
                        <div key={idx} style={{ background: "var(--surface-mist)", border: "1px solid var(--line)", padding: "12px", borderRadius: "6px", marginBottom: "10px", position: "relative" }}>
                          <button type="button" style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }} onClick={() => setFaq(faq.filter((_, fIdx) => fIdx !== idx))}>
                            Remove
                          </button>
                          <div style={{ marginBottom: "8px" }}>
                            <label className="form-label" style={{ fontSize: "11px" }}>Question</label>
                            <input type="text" className="form-input" style={{ padding: "6px" }} value={item[0] || ""} onChange={(e) => {
                              const updated = [...faq];
                              updated[idx][0] = e.target.value;
                              setFaq(updated);
                            }} required />
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: "11px" }}>Answer</label>
                            <textarea className="form-textarea" style={{ minHeight: "75px", padding: "6px" }} value={item[1] || ""} onChange={(e) => {
                              const updated = [...faq];
                              updated[idx][1] = e.target.value;
                              setFaq(updated);
                            }} required />
                          </div>
                        </div>
                      ))}
                      {faq.length === 0 && (
                        <div style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", padding: "10px 0" }}>No FAQs configured.</div>
                      )}
                    </div>
                  </>
                )}

              </div>
              <div className="modal-footer" style={{ borderTop: "1px solid var(--line)", padding: "16px 24px" }}>
                <button type="button" className="btn btn-light" onClick={() => setIsEditorOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Country"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
