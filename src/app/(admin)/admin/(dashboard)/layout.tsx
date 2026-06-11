import { requireAuth } from "@/lib/auth/guards";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import "@/styles/admin.css";

export const metadata = {
  title: "EduMark Admin Panel",
  description: "Management dashboard for EduMark consultancy portal",
};

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce server-side authorization check for dashboard group
  const user = await requireAuth();

  return (
    <div className="admin-body">
      <div className="admin-layout">
        <AdminSidebar user={user} />
        <main className="admin-main">
          <AdminHeader title="EduMark Portal" user={user} />
          <div className="admin-content-scrollable">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
