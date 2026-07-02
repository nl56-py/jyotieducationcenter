import Link from "next/link";
import { DashboardCards } from "@/components/admin/DashboardCards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth/guards";
import { Plus, Users, Calendar, FileText, AlertTriangle, Activity } from "lucide-react";
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

  let recentLeads: any[] = [];
  let draftWarnings: any[] = [];
  let totalPublished = 0;
  let healthyPublished = 0;

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

      // 2. Fetch recent leads
      const { data: dbLeads } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (dbLeads) {
        recentLeads = dbLeads;
      }

      // 3. Fetch Drafts from CMS tables for warnings
      const { data: draftBlogs } = await supabase.from("blog_posts").select("id, title, slug").eq("status", "draft");
      const { data: draftDests } = await supabase.from("destinations").select("id, name, slug").eq("status", "draft");
      const { data: draftPreps } = await supabase.from("test_preparations").select("id, name, slug").eq("status", "draft");
      const { data: draftEntrance } = await supabase.from("entrance_programs").select("id, name, slug").eq("status", "draft");
      const { data: draftServices } = await supabase.from("services").select("id, name, slug").eq("status", "draft");

      if (draftBlogs) draftBlogs.forEach(b => draftWarnings.push({ type: "Blog", label: b.title, link: "/admin/blogs" }));
      if (draftDests) draftDests.forEach(d => draftWarnings.push({ type: "Destination", label: d.name, link: "/admin/destinations" }));
      if (draftPreps) draftPreps.forEach(p => draftWarnings.push({ type: "Test Prep", label: p.name, link: "/admin/services" }));
      if (draftEntrance) draftEntrance.forEach(e => draftWarnings.push({ type: "Entrance", label: e.name, link: "/admin/services" }));
      if (draftServices) draftServices.forEach(s => draftWarnings.push({ type: "Service", label: s.name, link: "/admin/services" }));

      // 4. Calculate Content Health (Published with Meta Title and Meta Description)
      const { data: allBlogs } = await supabase.from("blog_posts").select("status, seo_title, seo_description");
      const { data: allDests } = await supabase.from("destinations").select("status, seo_title, seo_description");
      const { data: allPreps } = await supabase.from("test_preparations").select("status, seo_title, seo_description");

      const checkHealth = (items: any[]) => {
        if (!items) return;
        items.forEach(item => {
          if (item.status === "published") {
            totalPublished++;
            if (item.seo_title && item.seo_description) {
              healthyPublished++;
            }
          }
        });
      };

      if (allBlogs) checkHealth(allBlogs);
      if (allDests) checkHealth(allDests);
      if (allPreps) checkHealth(allPreps);

    } catch (e) {
      console.warn("Could not load dashboard stats from Supabase:", e);
    }
  }

  // Fallback defaults if no records found
  if (recentLeads.length === 0) {
    recentLeads = [
      { id: "1", full_name: "Ram Bahadur", phone: "+9779851012345", email: "ram@gmail.com", preferred_destination: "Australia", source: "home_form", status: "new", created_at: new Date().toISOString() },
      { id: "2", full_name: "Sita Kumari", phone: "+9779841987654", email: "sita@outlook.com", preferred_destination: "Canada", source: "consultation_form", status: "contacted", created_at: new Date(Date.now() - 3600000).toISOString() }
    ];
  }

  const contentHealthScore = totalPublished > 0 ? Math.round((healthyPublished / totalPublished) * 100) : 100;

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

        {/* Content Health Card */}
        <div className="panel-card" style={{ marginBottom: 0, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 className="panel-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={18} className="text-secondary" />
              Content SEO Health
            </h3>
            <p style={{ fontSize: "12px", color: "var(--dm-outline)", marginTop: "4px" }}>
              Percentage of published guides, destinations, and blog posts with completed SEO title and meta descriptions.
            </p>
          </div>

          <div style={{ margin: "24px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
              <span style={{ fontSize: "36px", fontWeight: 800 }}>{contentHealthScore}%</span>
              <span style={{ fontSize: "13px", color: "var(--dm-outline)" }}>{healthyPublished}/{totalPublished} Optimized</span>
            </div>
            <div style={{ height: "8px", background: "#E5E7EB", borderRadius: "999px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${contentHealthScore}%`,
                  height: "100%",
                  background: contentHealthScore > 80 ? "var(--dm-primary)" : contentHealthScore > 50 ? "#D97706" : "#DC2626",
                  borderRadius: "999px"
                }}
              />
            </div>
          </div>

          <Link href="/admin/seo" className="btn btn-light" style={{ width: "100%", textAlign: "center" }}>
            Optimize SEO Settings
          </Link>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Leads Table */}
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title">Recent CRM Leads</h3>
            <Link href="/admin/leads" className="btn btn-light" style={{ height: "32px", fontSize: "12px" }}>
              View All Leads
            </Link>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Destination</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{lead.full_name}</div>
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>{lead.email || lead.phone}</div>
                    </td>
                    <td>{lead.preferred_destination || "Not Specified"}</td>
                    <td style={{ textTransform: "capitalize" }}>{lead.source.replace("_", " ")}</td>
                    <td>
                      <span className={`status-badge lead-${lead.status}`}>
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      {new Date(lead.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
