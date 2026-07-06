"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  ShieldAlert,
  LogOut,
  Folder,
  Shield,
  Video,
  Layers,
  BookOpen,
  X,
  Megaphone,
  Globe
} from "lucide-react";

interface AdminSidebarProps {
  user: {
    fullName: string;
    email: string;
    role: string;
    isMock?: boolean;
  };
  sidebarOpen: boolean;
  onClose: () => void;
}
export function AdminSidebar({
  user,
  sidebarOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();


  const handleLogout = async () => {
    // 1. Clear mock cookie if isMock
    document.cookie = "edumark_mock_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 2. Clear real Supabase session if configured
    try {
      // We can also call a server action or API route to clear session
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // Ignore
    }

    router.push("/admin/login");
    router.refresh();
  };

  interface NavItem {
    label: string;
    href: string;
    icon: any;
    roles?: string[];
  }

  interface NavGroup {
    title: string;
    items: NavItem[];
  }

  const navGroups: NavGroup[] = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      ],
    },
    {
      title: "CRM",
      items: [
        { label: "Leads", href: "/admin/leads", icon: Users, roles: ["super_admin", "admin", "counselor", "viewer"] },
        { label: "Bookings", href: "/admin/bookings", icon: Calendar, roles: ["super_admin", "admin", "counselor", "viewer"] },
      ],
    },
    {
      title: "Content (CMS)",
      items: [
        { label: "Blogs", href: "/admin/blogs", icon: FileText, roles: ["super_admin", "admin", "editor"] },
        { label: "Videos", href: "/admin/videos", icon: Video, roles: ["super_admin", "admin", "editor"] },
        { label: "Photos", href: "/admin/media", icon: Folder, roles: ["super_admin", "admin", "editor"] },
        { label: "Destinations", href: "/admin/destinations", icon: Globe, roles: ["super_admin", "admin", "editor"] },
        { label: "Key Personnel", href: "/admin/team", icon: Users, roles: ["super_admin", "admin", "editor"] },
        { label: "Service Details", href: "/admin/services", icon: Layers, roles: ["super_admin", "admin", "editor"] },
        { label: "Notices & Events", href: "/admin/notices", icon: Megaphone, roles: ["super_admin", "admin", "editor"] },
      ],
    },
    {
      title: "System",
      items: [
        { label: "Users & Roles", href: "/admin/users", icon: Shield, roles: ["super_admin"] },
        { label: "Audit Logs", href: "/admin/audit-logs", icon: BookOpen, roles: ["super_admin", "admin"] },
        { label: "Security Center", href: "/admin/security", icon: ShieldAlert, roles: ["super_admin", "admin"] },
      ],
    },
  ];

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          EduMark
          <span className="sidebar-brand-badge">
            {user.isMock ? "MOCK" : "LIVE"}
          </span>
        </div>

        <button
          className="sidebar-close-btn"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group, groupIdx) => {
          // Filter items by role permission
          const allowedItems = group.items.filter(item => {
            if (!item.roles) return true;
            return item.roles.includes(user.role);
          });

          if (allowedItems.length === 0) return null;

          return (
            <div key={groupIdx} className="nav-section">
              <div className="nav-section-title">{group.title}</div>
              <div className="nav-group">
                {allowedItems.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href.split("?")[0];
                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      onClick={onClose}
                      className={`nav-item ${isActive ? "active" : ""}`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-avatar">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <div className="user-name">{user.fullName}</div>
          <div className="user-role">{user.role.replace("_", " ")}</div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}
