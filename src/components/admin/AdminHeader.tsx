"use client";

import { Bell, Menu, Shield, X } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  user: {
    fullName: string;
    role: string;
  };
  sidebarOpen: boolean;
  onMenuToggle?: () => void;
}

export function AdminHeader({
  title,
  user,
  sidebarOpen,
  onMenuToggle,
}: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={onMenuToggle}
          className="btn btn-light mobile-menu-btn"
          style={{
            padding: "8px",
            height: "auto",
            justifyContent: "center",
          }}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-actions">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            background: "var(--dm-surface-container-low)",
            borderRadius: "var(--dm-rounded-full)",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--dm-outline)"
          }}
        >
          <Shield size={14} className="text-primary" />
          <span style={{ textTransform: "capitalize" }}>
            {user.role.replace("_", " ")}
          </span>
        </div>

        <button
          className="btn btn-light"
          style={{
            padding: "8px",
            height: "auto",
            borderRadius: "var(--dm-rounded-full)",
            border: "none",
            background: "var(--dm-surface-container-low)"
          }}
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
