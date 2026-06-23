import { requireAuth } from "@/lib/auth/guards";
import AdminShell from "@/components/admin/AdminShell";
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
  const user = await requireAuth();

  return (
    <AdminShell user={user}>
      {children}
    </AdminShell>
  );
}