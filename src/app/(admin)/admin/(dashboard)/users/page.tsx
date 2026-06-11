"use client";

import { useState, useEffect } from "react";
import { Plus, UserCheck, ShieldAlert, Edit } from "lucide-react";

export default function UsersManagementPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        setCurrentUser(data.user);
      } catch (err) {
        console.error("Failed to load session", err);
      }

      // Default mock users
      setUsers([
        { id: "1", full_name: "EduMark Owner", email: "super@edumark.edu.np", role: "super_admin", status: "active", last_seen: "Just now" },
        { id: "2", full_name: "Counselor Binod", email: "counselor@edumark.edu.np", role: "counselor", status: "active", last_seen: "2 hours ago" },
        { id: "3", full_name: "CMS Editor Sita", email: "editor@edumark.edu.np", role: "editor", status: "active", last_seen: "Yesterday" }
      ]);
      setLoading(false);
    };
    loadSession();
  }, []);

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Checking user permission...</div>;
  }

  // Role guard
  if (!currentUser || currentUser.role !== "super_admin") {
    return (
      <div className="panel-card" style={{ padding: "40px", textAlign: "center", border: "1px solid var(--dm-error-container)" }}>
        <ShieldAlert size={48} className="text-error" style={{ margin: "0 auto 16px" }} />
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--dm-error)" }}>Access Restricted</h3>
        <p style={{ color: "var(--dm-outline)", fontSize: "14px", marginTop: "8px" }}>
          Only the Super Administrator role is authorized to view or manage user accounts and system permissions.
        </p>
      </div>
    );
  }

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleStatusToggle = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === "active" ? "suspended" : "active";
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>User Accounts & Permissions</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Create accounts for counselors/editors and assign access privileges.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => alert("Invite counselor placeholder")}>
          <Plus size={16} /> Invite User
        </button>
      </div>

      <div className="panel-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Role Profile</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{u.full_name}</div>
                    <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{u.email}</div>
                  </td>
                  <td>
                    <select 
                      className="form-select" 
                      style={{ width: "150px", height: "32px", padding: "0 8px", fontSize: "13px" }}
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      disabled={u.email === currentUser.email} // Don't demote self
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="counselor">Counselor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </td>
                  <td>
                    <span className={`status-badge ${u.status === "active" ? "booking-confirmed" : "booking-cancelled"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>{u.last_seen}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        className="btn btn-light" 
                        style={{ height: "30px", padding: "0 10px" }}
                        onClick={() => handleStatusToggle(u.id)}
                        disabled={u.email === currentUser.email}
                      >
                        {u.status === "active" ? "Suspend" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
