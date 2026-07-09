"use client";

import { useState, useEffect } from "react";
import { Plus, ShieldAlert, UserCheck, UserX, Loader2, X, Lock } from "lucide-react";

export default function UsersManagementPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("counselor");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Reset Password States
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetPasswordUser, setResetPasswordUser] = useState<any>(null);
  const [resetPasswordVal, setResetPasswordVal] = useState("");
  const [resetPasswordSubmitting, setResetPasswordSubmitting] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState("");

  const handleOpenResetPasswordModal = (userItem: any) => {
    setResetPasswordUser(userItem);
    setResetPasswordVal("");
    setResetPasswordError("");
    setResetPasswordSuccess("");
    setResetPasswordOpen(true);
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetPasswordError("");
    setResetPasswordSuccess("");

    if (!resetPasswordUser) return;
    if (resetPasswordVal.length < 6) {
      setResetPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setResetPasswordSubmitting(true);
    try {
      const response = await fetch(`/api/admin/users/${resetPasswordUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: resetPasswordVal }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setResetPasswordSuccess("User's password has been updated successfully.");
        setResetPasswordVal("");
        setTimeout(() => {
          setResetPasswordOpen(false);
          setResetPasswordUser(null);
        }, 1500);
      } else {
        setResetPasswordError(result.error || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setResetPasswordError("Failed to connect to the server.");
    } finally {
      setResetPasswordSubmitting(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersRes = await fetch("/api/admin/users");
      const usersData = await usersRes.json();
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    const loadSessionAndUsers = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        setCurrentUser(data.user);
        
        if (data.user && data.user.role === "super_admin") {
          await fetchUsers();
        }
      } catch (err) {
        console.error("Failed to load session/users", err);
      } finally {
        setLoading(false);
      }
    };
    loadSessionAndUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "80px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}</style>
        <Loader2 size={32} className="animate-spin" style={{ color: "var(--dm-primary)" }} />
        <div style={{ color: "var(--dm-outline)", fontSize: "14px" }}>Verifying permissions and loading accounts...</div>
      </div>
    );
  }

  // Role guard
  if (!currentUser || currentUser.role !== "super_admin") {
    return (
      <div className="panel-card" style={{ padding: "40px", textAlign: "center", border: "1px solid var(--dm-error-container)" }}>
        <ShieldAlert size={48} className="text-error" style={{ margin: "0 auto 16px", color: "var(--dm-error)" }} />
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--dm-error)" }}>Access Restricted</h3>
        <p style={{ color: "var(--dm-outline)", fontSize: "14px", marginTop: "8px" }}>
          Only the Super Administrator role is authorized to view or manage user accounts and system permissions.
        </p>
      </div>
    );
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole })
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      } else {
        alert(data.error || "Failed to update role");
      }
    } catch (err) {
      console.error("Failed to update role", err);
      alert("Failed to update role due to network error.");
    }
  };

  const handleStatusToggle = async (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;
    const nextStatus = targetUser.status === "active" ? "suspended" : "active";
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, status: nextStatus } : u));
      } else {
        alert(data.error || "Failed to update user status");
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update user status due to network error.");
    }
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUserEmail,
          password: newUserPassword,
          full_name: newUserName,
          role: newUserRole
        })
      });
      const data = await response.json();
      if (data.success) {
        await fetchUsers();
        // Reset states and close
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        setNewUserRole("counselor");
        setModalOpen(false);
      } else {
        setErrorMsg(data.error || "Failed to create user account.");
      }
    } catch (err) {
      console.error("Failed to invite user", err);
      setErrorMsg("Failed to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700 }}>User Accounts & Permissions</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px" }}>
            Create accounts for counselors, editors, and administrators, and assign access privileges.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add New Admin
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
              {users.map(u => {
                const isSelf = u.user_id === currentUser.id || u.email === currentUser.email;
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontWeight: 600 }}>{u.full_name}</span>
                        {isSelf && (
                          <span style={{ 
                            backgroundColor: "var(--dm-primary-container)", 
                            color: "var(--dm-on-primary-container)", 
                            fontSize: "11px", 
                            fontWeight: 600, 
                            padding: "2px 6px", 
                            borderRadius: "var(--dm-rounded-full)" 
                          }}>
                            You
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{u.email}</div>
                    </td>
                    <td>
                      <select 
                        className="form-select" 
                        style={{ width: "150px", height: "32px", padding: "0 8px", fontSize: "13px" }}
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        disabled={isSelf} // Don't demote self
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
                    <td>{u.last_seen_at ? new Date(u.last_seen_at).toLocaleString() : "Never"}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button 
                          className="btn btn-light" 
                          style={{ height: "30px", padding: "0 10px", gap: "4px", fontSize: "12px" }}
                          onClick={() => handleStatusToggle(u.id)}
                          disabled={isSelf}
                        >
                          {u.status === "active" ? (
                            <>
                              <UserX size={12} /> Suspend
                            </>
                          ) : (
                            <>
                              <UserCheck size={12} /> Activate
                            </>
                          )}
                        </button>
                        <button 
                          className="btn btn-light" 
                          style={{ height: "30px", padding: "0 10px", gap: "4px", fontSize: "12px" }}
                          onClick={() => handleOpenResetPasswordModal(u)}
                          disabled={isSelf}
                        >
                          <Lock size={12} /> Password
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "32px", color: "var(--dm-outline)" }}>
                    No administrator profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite/Add Admin Modal Dialog */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "480px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Create Admin Account</h3>
              <button 
                onClick={() => {
                  setModalOpen(false);
                  setErrorMsg("");
                }} 
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dm-outline)" }}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleInviteSubmit}>
              <div className="modal-body">
                {errorMsg && (
                  <div style={{ 
                    padding: "12px 16px", 
                    backgroundColor: "var(--dm-error-container)", 
                    color: "var(--dm-error)", 
                    borderRadius: "var(--dm-rounded-md)", 
                    fontSize: "13px", 
                    marginBottom: "16px",
                    fontWeight: 500
                  }}>
                    {errorMsg}
                  </div>
                )}
                
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter full name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Enter email address"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="Create a login password"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Access Level Profile</label>
                  <select 
                    className="form-select"
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    required
                  >
                    <option value="viewer">Viewer (Read-only access to bookings and leads)</option>
                    <option value="counselor">Counselor (Leads and consultation manager)</option>
                    <option value="editor">Editor (CMS pages and blogs management)</option>
                    <option value="admin">Admin (Full system management, except permissions)</option>
                    <option value="super_admin">Super Admin (All actions + user management)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-light" 
                  onClick={() => {
                    setModalOpen(false);
                    setErrorMsg("");
                  }}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Reset Password Modal */}
      {resetPasswordOpen && resetPasswordUser && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "400px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Reset Password</h3>
              <button 
                onClick={() => {
                  setResetPasswordOpen(false);
                  setResetPasswordUser(null);
                }} 
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dm-outline)" }}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleResetPasswordSubmit}>
              <div className="modal-body">
                <p style={{ fontSize: "13px", color: "var(--dm-outline)", marginBottom: "16px" }}>
                  Set a new password for <strong>{resetPasswordUser.full_name}</strong> ({resetPasswordUser.email}).
                </p>

                {resetPasswordError && (
                  <div style={{ 
                    padding: "12px 16px", 
                    backgroundColor: "var(--dm-error-container)", 
                    color: "var(--dm-error)", 
                    borderRadius: "var(--dm-rounded-md)", 
                    fontSize: "13px", 
                    marginBottom: "16px",
                    fontWeight: 500
                  }}>
                    {resetPasswordError}
                  </div>
                )}

                {resetPasswordSuccess && (
                  <div style={{ 
                    padding: "12px 16px", 
                    backgroundColor: "var(--dm-primary-container)", 
                    color: "var(--dm-primary)", 
                    borderRadius: "var(--dm-rounded-md)", 
                    fontSize: "13px", 
                    marginBottom: "16px",
                    fontWeight: 500
                  }}>
                    {resetPasswordSuccess}
                  </div>
                )}
                
                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <label className="form-label">New Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="Enter new password (min. 6 chars)"
                    value={resetPasswordVal}
                    onChange={(e) => setResetPasswordVal(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-light" 
                  onClick={() => {
                    setResetPasswordOpen(false);
                    setResetPasswordUser(null);
                  }}
                  disabled={resetPasswordSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={resetPasswordSubmitting}
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  {resetPasswordSubmitting && <Loader2 size={14} className="animate-spin" />}
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
