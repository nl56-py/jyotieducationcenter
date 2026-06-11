import Link from "next/link";
import { DashboardCards } from "@/components/admin/DashboardCards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth/guards";
import { Plus, Users, Calendar, FileText } from "lucide-react";

export default async function DashboardPage() {
  const user = await requireAuth();

  // 1. Fetch statistics and recent leads
  let stats = {
    leadsCount: 12,
    bookingsCount: 4,
    blogsCount: 8,
    securityAlertsCount: 0,
  };

  let recentLeads: any[] = [
    {
      id: "1",
      full_name: "Ram Bahadur",
      phone: "+9779851012345",
      email: "ram@gmail.com",
      preferred_destination: "Australia",
      source: "home_form",
      status: "new",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      full_name: "Sita Kumari",
      phone: "+9779841987654",
      email: "sita@outlook.com",
      preferred_destination: "Canada",
      source: "consultation_form",
      status: "contacted",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "3",
      full_name: "Hari Thapa",
      phone: "+9779812345678",
      email: "hari.thapa@yahoo.com",
      preferred_destination: "USA",
      source: "contact_form",
      status: "in_progress",
      created_at: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  // If Supabase is configured, fetch live data
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    try {
      const { count: leadsCount } = await supabase.from("leads").select("*", { count: "exact", head: true });
      const { count: bookingsCount } = await supabase.from("consultation_bookings").select("*", { count: "exact", head: true });
      const { count: blogsCount } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      const { count: alertsCount } = await supabase.from("security_events").select("*", { count: "exact", head: true });

      stats = {
        leadsCount: leadsCount || 0,
        bookingsCount: bookingsCount || 0,
        blogsCount: blogsCount || 0,
        securityAlertsCount: alertsCount || 0,
      };

      const { data: dbLeads } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (dbLeads && dbLeads.length > 0) {
        recentLeads = dbLeads;
      }
    } catch (e) {
      console.warn("Could not load dashboard stats from Supabase:", e);
    }
  }

  return (
    <div>
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "24px"
        }}
      >
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 700 }}>Welcome back, {user.fullName}!</h2>
          <p style={{ color: "var(--dm-outline)", fontSize: "14px", marginTop: "4px" }}>
            Here is what is happening at EduMark today.
          </p>
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

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Recent Leads Table */}
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title">Recent Leads</h3>
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
                      <div style={{ fontSize: "12px", color: "var(--dm-outline)" }}>
                        {lead.email || lead.phone}
                      </div>
                    </td>
                    <td>{lead.preferred_destination || "Not Specified"}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {lead.source.replace("_", " ")}
                    </td>
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

        {/* Quick Actions Panel */}
        <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title">Quick Actions</h3>
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link 
              href="/admin/bookings" 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px", 
                padding: "12px", 
                background: "var(--dm-surface-container-low)", 
                borderRadius: "var(--dm-rounded-md)",
                color: "inherit"
              }}
            >
              <Calendar size={18} className="text-primary" />
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>Schedule Consultation</div>
                <div style={{ fontSize: "11px", color: "var(--dm-outline)" }}>Book a session with a student</div>
              </div>
            </Link>

            <Link 
              href="/admin/blogs" 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px", 
                padding: "12px", 
                background: "var(--dm-surface-container-low)", 
                borderRadius: "var(--dm-rounded-md)",
                color: "inherit"
              }}
            >
              <FileText size={18} className="text-secondary" />
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>Manage Publications</div>
                <div style={{ fontSize: "11px", color: "var(--dm-outline)" }}>Edit destinations or blog entries</div>
              </div>
            </Link>

            <Link 
              href="/admin/security" 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px", 
                padding: "12px", 
                background: "var(--dm-surface-container-low)", 
                borderRadius: "var(--dm-rounded-md)",
                color: "inherit"
              }}
            >
              <Users size={18} className="text-primary" />
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>Manage User Roles</div>
                <div style={{ fontSize: "11px", color: "var(--dm-outline)" }}>Control counselor permissions</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
