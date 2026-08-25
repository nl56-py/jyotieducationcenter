import Link from "next/link";
import { DashboardCards } from "@/components/admin/DashboardCards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth/guards";
import { Plus, AlertTriangle } from "lucide-react";
import { LeadGrowthChart } from "@/components/admin/LeadGrowthChart";

export default async function DashboardPage() {
  const user = await requireAuth();

  // Initial stats
  let stats = {
    leadsCount: 0,
    bookingsCount: 0,
    blogsCount: 0,
    securityAlertsCount: 0,
  };

  let draftWarnings: any[] = [];

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    try {
      // 1. Fetch main counts
      const { count: leadsCount } = await supabase.from("leads").select("*", { count: "exact", head: true });
      const { count: bookingsCount } = await supabase.from("consultation_bookings").select("*", { count: "exact", head: true });
      const { count: blogsCount } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      const { count: alertsCount } = await supabase.from("security_events").select("*", { count: "exact", head: true }).is("resolved_at", null);

      stats = {
        leadsCount: leadsCount || 0,
        bookingsCount: bookingsCount || 0,
        blogsCount: blogsCount || 0,
        securityAlertsCount: alertsCount || 0,
      };

      // 2. Fetch Drafts from CMS tables for warnings
      const { data: draftBlogs } = await supabase.from("blog_posts").select("id, title, slug").eq("status", "draft");
      const { data: draftDests } = await supabase.from("destinations").select("id, name, slug").eq("status", "draft");
      const { data: draftPreps } = await supabase.from("test_preparations").select("id, name, slug").eq("status", "draft");
      const { data: draftEntrance } = await supabase.from("entrance_programs").select("id, name, slug").eq("status", "draft");

      if (draftBlogs) (draftBlogs as any[]).forEach((b: any) => draftWarnings.push({ type: "Blog", label: b.title, link: "/admin/blogs" }));
      if (draftDests) (draftDests as any[]).forEach((d: any) => draftWarnings.push({ type: "Destination", label: d.name, link: "/admin/destinations" }));
      if (draftPreps) (draftPreps as any[]).forEach((p: any) => draftWarnings.push({ type: "Test Prep", label: p.name, link: "/admin/services?tab=testprep" }));
      if (draftEntrance) (draftEntrance as any[]).forEach((e: any) => draftWarnings.push({ type: "Entrance", label: e.name, link: "/admin/services?tab=entrance" }));

    } catch (e) {
      console.warn("Could not load dashboard stats from Supabase:", e);
    }
  }

  return (
    <div>
      <div className="admin-page-hero">
        <div>
          <span className="admin-kicker" style={{ color: "rgba(255,255,255,.78)" }}>Command center</span>
          <h2>Welcome back, {user.fullName}.</h2>
          <p>Track leads, bookings, content health, draft risk, and security signals in one clean dashboard.</p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/admin/leads" className="btn btn-primary">
            <Plus size={16} /> Add Lead
          </Link>
          <Link href="/admin/blogs" className="btn btn-secondary">
            <Plus size={16} /> New Blog
          </Link>
        </div>
      </div>

      {/* Dashboard Metrics */}
      <DashboardCards stats={stats} />

      <div
        className="dashboard-grid"
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <LeadGrowthChart />

        {/* Draft Warnings Panel */}
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={18} className="text-warning" />
              Draft Warnings
            </h3>
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", maxHeight: "350px", overflowY: "auto" }}>
            {draftWarnings.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--dm-outline)", fontSize: "13px", padding: "20px" }}>
                🎉 Great job! No unpublished drafts outstanding.
              </div>
            ) : (
              draftWarnings.map((warn, idx) => (
                <Link key={idx} href={warn.link} className="quick-action-item" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="quick-action-icon orange" style={{ background: "#FEF3C7" }}>
                    <AlertTriangle size={20} className="text-warning" style={{ color: "#D97706" }} />
                  </div>
                  <div className="quick-action-content" style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>{warn.type} in Draft</h4>
                    <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "var(--dm-outline)" }}>{warn.label}</p>
                  </div>
                  <span className="quick-action-arrow">→</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
