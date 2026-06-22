import Link from "next/link";
import { DashboardCards } from "@/components/admin/DashboardCards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth/guards";
import { Plus, Users, Calendar, FileText } from "lucide-react";
import { LeadGrowthChart } from "@/components/admin/LeadGrowthChart";

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

  // let upcomingConsultations: any[] = [];



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

      // const { data: dbLeads } = await supabase
      //   .from("leads")
      //   .select("*")
      //   .order("created_at", { ascending: false })
      //   .limit(5)

      // if (dbLeads && dbLeads.length > 0) {
      //   recentLeads = dbLeads;
      // }

      // const { data: dbBookings } = await supabase
      //   .from("consultation_bookings")
      //   .select("*")
      //   .order("preferred_date", { ascending: true })
      //   .limit(5);

      // if (dbBookings) {
      //   upcomingConsultations = dbBookings.map((booking: any) => ({
      //     id: booking.id,
      //     name: booking.full_name,
      //     destination: booking.preferred_destination,
      //     time: booking.preferred_time,
      //     status: booking.status?.toLowerCase() || "requested",
      //   }));
      // }
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <LeadGrowthChart />

        <div className="panel-card" style={{ marginBottom: 0, padding: "24px" }}>
          <h3 className="panel-card-title">Leads by Destination</h3>

          <div style={{ marginTop: "20px" }}>
            Australia
            <div
              style={{
                height: 8,
                background: "#E5E7EB",
                borderRadius: 999,
                margin: "6px 0 16px",
              }}
            >
              <div
                style={{
                  width: "45%",
                  height: "100%",
                  background: "#7C3AED",
                  borderRadius: 999,
                }}
              />
            </div>

            Canada
            <div
              style={{
                height: 8,
                background: "#E5E7EB",
                borderRadius: 999,
                margin: "6px 0 16px",
              }}
            >
              <div
                style={{
                  width: "30%",
                  height: "100%",
                  background: "#EC4899",
                  borderRadius: 999,
                }}
              />
            </div>

            UK
            <div
              style={{
                height: 8,
                background: "#E5E7EB",
                borderRadius: 999,
                margin: "6px 0 16px",
              }}
            >
              <div
                style={{
                  width: "15%",
                  height: "100%",
                  background: "#06B6D4",
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        </div>
      </div>

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
            <h3
              className="panel-card-title"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "18px",
              }}
            >
              ⚡ Quick Actions
            </h3>
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link href="/admin/bookings" className="quick-action-item">
              <div className="quick-action-icon purple">
                <Calendar size={22} />
              </div>

              <div className="quick-action-content">
                <h4>Schedule Consultation</h4>
                <p>Book a session with a student</p>
              </div>
              <span className="quick-action-arrow">→</span>
            </Link>

            <Link href="/admin/blogs" className="quick-action-item">
              <div className="quick-action-icon blue">
                <FileText size={22} />
              </div>

              <div className="quick-action-content">
                <h4>Manage Publications</h4>
                <p>Edit destinations & blogs</p>
              </div>
              <span className="quick-action-arrow">→</span>
            </Link>

            <Link href="/admin/security" className="quick-action-item">
              <div className="quick-action-icon red">
                <Users size={22} />
              </div>

              <div className="quick-action-content">
                <h4>Manage User Roles</h4>
                <p>Control counselor permissions</p>
              </div>
              <span className="quick-action-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Upcoming Consultations
      /*  <div className="panel-card" style={{ marginBottom: 0 }}>
          <div className="panel-card-header">
            <h3 className="panel-card-title">
              📅 Upcoming Consultations
            </h3>
          </div>

          <div style={{ padding: "20px" }}>
            {upcomingConsultations.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>
                    👤 {item.name}
                  </div>

                  <div style={{ color: "#64748B" }}>
                    🌍 {item.destination}
                  </div>

                  <div style={{ color: "#64748B" }}>
                    📅 {item.time}
                  </div>
                </div>

                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 700,
                    background:
                      item.status === "confirmed"
                        ? "#DCFCE7"
                        : item.status === "pending" || item.status === "requested"
                          ? "#FEF3C7"
                          : item.status === "cancelled"
                            ? "#FEE2E2"
                            : "#DBEAFE",
                    color:
                      item.status === "confirmed"
                        ? "#15803D"
                        : item.status === "pending" || item.status === "requested"
                          ? "#B45309"
                          : item.status === "cancelled"
                            ? "#DC2626"
                            : "#1D4ED8",
                  }}
                >
                  {item.status === "confirmed" && "🟢 Confirmed"}

                  {(item.status === "pending" || item.status === "requested") &&
                    "🟡 Pending"}

                  {item.status === "scheduled" && "🔵 Scheduled"}

                  {item.status === "cancelled" && "🔴 Cancelled"}
                </span>
              </div>
            ))}
          </div>  */}
      </div>
    </div>


  );
}
