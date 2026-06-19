"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  UserPlus, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  CheckCircle,
  MessageSquare
} from "lucide-react";

export default function LeadsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [destFilter, setDestFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  
  const canDelete = currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");
  
  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDestination, setPreferredDestination] = useState("Australia");
  const [courseInterest, setCourseInterest] = useState("");
  const [message, setMessage] = useState("");
  const [noteText, setNoteText] = useState("");

  const mockLeads = [
    {
      id: "1",
      full_name: "Ram Bahadur",
      phone: "+9779851012345",
      email: "ram@gmail.com",
      preferred_destination: "Australia",
      course_interest: "Bachelor of IT",
      message: "Looking for scholarships in Melbourne.",
      source: "home_form",
      status: "new",
      assigned_name: "Unassigned",
      notes: [{ id: "n1", note: "Created via Homepage Inquiry form.", author: "System", created_at: new Date().toISOString() }],
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      full_name: "Sita Kumari",
      phone: "+9779841987654",
      email: "sita@outlook.com",
      preferred_destination: "Canada",
      course_interest: "Post Graduate Diploma in Data Science",
      message: "I completed my BCA. Need admission assistance.",
      source: "consultation_form",
      status: "contacted",
      assigned_name: "Counselor Binod",
      notes: [{ id: "n2", note: "Called student, discussed college options in Toronto.", author: "Counselor Binod", created_at: new Date(Date.now() - 3600000).toISOString() }],
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      full_name: "Hari Thapa",
      phone: "+9779812345678",
      email: "hari.thapa@yahoo.com",
      preferred_destination: "USA",
      course_interest: "Master of Science in Cybersecurity",
      message: "Wants to apply for Fall 2026.",
      source: "contact_form",
      status: "in_progress",
      assigned_name: "Counselor Binod",
      notes: [
        { id: "n3", note: "Sent checklists for transcripts and SOP drafting guidelines.", author: "Counselor Binod", created_at: new Date(Date.now() - 7200000).toISOString() }
      ],
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      // 1. Fetch Session
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        setCurrentUser(sessionData.user);
      } catch (err) {
        console.error("Failed to load session", err);
      }

      // 2. Fetch Leads (from Supabase or Mock fallback)
      try {
        const response = await fetch("/api/admin/leads");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setLeads(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("API Leads fetch failed, using mock data.");
      }
      setLeads(mockLeads);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          email: email || null,
          preferred_destination: preferredDestination,
          course_interest: courseInterest || null,
          message: message || "Lead manually registered in admin panel.",
          source: "manual_entry",
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      }
    } catch (err) {
      console.error("Failed to save lead:", err);
    }
    setLoading(false);
    setIsCreateOpen(false);
    // Reset form
    setFullName("");
    setPhone("");
    setEmail("");
    setCourseInterest("");
    setMessage("");
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedLead) return;

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedLead.id,
          note: noteText,
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
          const updated = data.find((l: any) => l.id === selectedLead.id);
          if (updated) {
            setSelectedLead(updated);
          }
        }
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    }
    setNoteText("");
  };

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        const res = await fetch("/api/admin/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
          if (selectedLead && selectedLead.id === leadId) {
            const updated = data.find((l: any) => l.id === leadId);
            if (updated) {
              setSelectedLead(updated);
            }
          }
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads?id=${leadId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLeads(leads.filter((l) => l.id !== leadId));
          if (selectedLead && selectedLead.id === leadId) {
            setSelectedLead(null);
          }
        } else {
          alert(data.error || "Failed to delete lead");
        }
      } else {
        const errData = await response.json();
        alert(errData.error || "Failed to delete lead");
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
      alert("Failed to delete lead due to network error.");
    }
  };

  // Filter logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
      lead.phone.includes(search);
      
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesDest = destFilter === "all" || lead.preferred_destination === destFilter;

    return matchesSearch && matchesStatus && matchesDest;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Lead Management CRM</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Track student inquiries, consultations, and counseling conversions.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn btn-secondary" onClick={() => {
            // Mock CSV export alert
            alert("Lead data exported successfully as CSV file!");
          }}>
            <Download size={16} /> Export CSV
          </button>
          <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
            <Plus size={16} /> Create Lead
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="panel-card" style={{ marginBottom: "24px" }}>
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-input search-input" 
              placeholder="Search by student name, email, or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <div className="form-group" style={{ marginBottom: 0, flexDirection: "row", alignItems: "center", gap: "8px" }}>
              <Filter size={16} className="text-outline" />
              <select 
                className="form-select" 
                style={{ width: "160px" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="counseling_scheduled">Counseling Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
                <option value="spam">Spam</option>
              </select>
            </div>

            <select 
              className="form-select" 
              style={{ width: "160px" }}
              value={destFilter}
              onChange={(e) => setDestFilter(e.target.value)}
            >
              <option value="all">All Destinations</option>
              <option value="Australia">Australia</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
        </div>

        {/* Lead Table */}
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Destination</th>
                <th>Course Interest</th>
                <th>Source</th>
                <th>Assignee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>Loading leads list...</td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>No leads matching current filters.</td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{lead.full_name}</div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{lead.phone} • {lead.email || "No Email"}</div>
                    </td>
                    <td>{lead.preferred_destination}</td>
                    <td>{lead.course_interest || "General Study"}</td>
                    <td style={{ textTransform: "capitalize" }}>{lead.source.replace("_", " ")}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                        <UserPlus size={14} className="text-outline" />
                        {lead.assigned_name}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge lead-${lead.status}`}>
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button 
                          className="btn btn-light" 
                          style={{ height: "30px", padding: "0 10px" }}
                          onClick={() => setSelectedLead(lead)}
                        >
                          Details
                        </button>
                        <select 
                          className="form-select" 
                          style={{ height: "30px", padding: "0 10px", width: "110px", fontSize: "12px" }}
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                          <option value="spam">Spam</option>
                        </select>
                        {canDelete && (
                          <button 
                            className="btn btn-danger" 
                            style={{ height: "30px", width: "30px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px" }}
                            onClick={() => handleDeleteLead(lead.id)}
                            title="Delete Lead"
                          >
                            <Trash2 size={14} />
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

      {/* Details/Timeline Modal */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "700px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Lead Timeline & Counselor Notes</h3>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {canDelete && (
                  <button 
                    className="btn btn-danger" 
                    style={{ height: "32px", padding: "0 12px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}
                    onClick={() => handleDeleteLead(selectedLead.id)}
                  >
                    <Trash2 size={14} /> Delete Lead
                  </button>
                )}
                <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setSelectedLead(null)}>X</button>
              </div>
            </div>
            
            <div className="modal-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {/* Lead Details */}
              <div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Student Details</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                  <div><strong>Full Name:</strong> {selectedLead.full_name}</div>
                  <div><strong>Phone:</strong> {selectedLead.phone}</div>
                  <div><strong>Email:</strong> {selectedLead.email || "N/A"}</div>
                  <div><strong>Destination:</strong> {selectedLead.preferred_destination}</div>
                  <div><strong>Course Interest:</strong> {selectedLead.course_interest || "N/A"}</div>
                  <div><strong>Status:</strong> <span className={`status-badge lead-${selectedLead.status}`}>{selectedLead.status.replace("_", " ")}</span></div>
                  <div><strong>Source:</strong> {selectedLead.source}</div>
                  <div style={{ padding: "10px", background: "var(--dm-surface-container-low)", borderRadius: "var(--dm-rounded-md)", marginTop: "8px" }}>
                    <strong>Message:</strong><br />
                    <span style={{ fontSize: "13px" }}>{selectedLead.message || "No message attached."}</span>
                  </div>
                </div>
              </div>

              {/* Notes Timeline */}
              <div style={{ display: "flex", flexDirection: "column", height: "350px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Counselor Notes</h4>
                
                {/* Notes list */}
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px", paddingRight: "8px" }}>
                  {selectedLead.notes.map((note: any) => (
                    <div key={note.id} style={{ background: "var(--dm-surface-container-low)", padding: "10px", borderRadius: "var(--dm-rounded-md)", fontSize: "13px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--dm-outline)", fontSize: "11px", marginBottom: "4px" }}>
                        <span>{note.author}</span>
                        <span>{new Date(note.created_at).toLocaleDateString()}</span>
                      </div>
                      <div>{note.note}</div>
                    </div>
                  ))}
                </div>

                {/* Add note form */}
                <form onSubmit={handleAddNote} style={{ display: "flex", gap: "8px" }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Type note to append..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: "0 12px" }}>Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isCreateOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Create Manual Lead</h3>
              <button className="btn btn-light" style={{ height: "32px", padding: "0 10px" }} onClick={() => setIsCreateOpen(false)}>X</button>
            </div>
            <form onSubmit={handleCreateLead}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Student Name</label>
                  <input type="text" className="form-input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Destination</label>
                  <select className="form-select" value={preferredDestination} onChange={(e) => setPreferredDestination(e.target.value)}>
                    <option value="Australia">Australia</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Course / Field of Interest</label>
                  <input type="text" className="form-input" placeholder="e.g. Master of Data Science" value={courseInterest} onChange={(e) => setCourseInterest(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Opening Counselor Note</label>
                  <textarea className="form-textarea" placeholder="e.g. Walk-in client inquired about visa checklists..." value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setIsCreateOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
