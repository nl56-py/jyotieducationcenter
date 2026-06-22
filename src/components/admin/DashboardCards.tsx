"use client";


import {
  Users,
  Calendar,
  FileText,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface DashboardCardsProps {
  stats: {
    leadsCount: number;
    bookingsCount: number;
    blogsCount: number;
    securityAlertsCount: number;
  };
}

export function DashboardCards({ stats }: DashboardCardsProps) {
  const cards = [
    {
      label: "Total Leads",
      value: stats.leadsCount,
      icon: Users,
      color: "#7C3AED",
      bg: "#F3E8FF",
      trend: "+12%",
      trendColor: "#16A34A",
      trendIcon: TrendingUp,
    },
    {
      label: "Pending Bookings",
      value: stats.bookingsCount,
      icon: Calendar,
      color: "#0891B2",
      bg: "#ECFEFF",
      trend: "+5%",
      trendColor: "#16A34A",
      trendIcon: TrendingUp,
    },
    {
      label: "Published Blogs",
      value: stats.blogsCount,
      icon: FileText,
      color: "#7C3AED",
      bg: "#F3E8FF",
      trend: "+2",
      trendColor: "#16A34A",
      trendIcon: TrendingUp,
    },
    {
      label: "Security Alerts",
      value: stats.securityAlertsCount,
      icon: ShieldAlert,
      color: "#DC2626",
      bg: "#FEE2E2",
      trend: "-1",
      trendColor: "#DC2626",
      trendIcon: TrendingDown,
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trendIcon;

        return (
          <div
            key={index}
            className="stat-card"
            style={{
              borderRadius: 18,
              padding: 24,
              background: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,.05)",
              border: "1px solid #ECECEC",
              transition: ".3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 20px 45px rgba(124,58,237,.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.05)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#64748B",
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 10,
                  }}
                >
                  {card.label}
                </p>

                <h2
                  style={{
                    fontSize: 34,
                    fontWeight: 800,
                    color: "#0F172A",
                    margin: 0,
                  }}
                >
                  {card.value}
                </h2>

                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: card.trendColor,
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  <TrendIcon size={16} />
                  {card.trend}
                  <span
                    style={{
                      color: "#94A3B8",
                      fontWeight: 500,
                    }}
                  >
                    vs last week
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={28} color={card.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}