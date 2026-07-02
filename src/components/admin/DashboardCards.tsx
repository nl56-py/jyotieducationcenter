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
      color: "#ffffff",
      bg: "linear-gradient(135deg, #451ebb, #8b5cf6)",
      trend: "+12%",
      trendColor: "#bbf7d0",
      trendIcon: TrendingUp,
    },
    {
      label: "Pending Bookings",
      value: stats.bookingsCount,
      icon: Calendar,
      color: "#ffffff",
      bg: "linear-gradient(135deg, #006970, #14b8a6)",
      trend: "+5%",
      trendColor: "#ccfbf1",
      trendIcon: TrendingUp,
    },
    {
      label: "Published Blogs",
      value: stats.blogsCount,
      icon: FileText,
      color: "#ffffff",
      bg: "linear-gradient(135deg, #dd3333, #ff7a59)",
      trend: "+2",
      trendColor: "#ffedd5",
      trendIcon: TrendingUp,
    },
    {
      label: "Security Alerts",
      value: stats.securityAlertsCount,
      icon: ShieldAlert,
      color: "#ffffff",
      bg: "linear-gradient(135deg, #111827, #475569)",
      trend: "-1",
      trendColor: "#fecaca",
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
              borderRadius: 16,
              padding: 24,
              background: card.bg,
              boxShadow: "0 18px 42px rgba(15, 23, 42, .14)",
              border: "1px solid rgba(255,255,255,.22)",
              cursor: "pointer",
              color: "#fff",
              overflow: "hidden",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 24px 55px rgba(15,23,42,.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 18px 42px rgba(15, 23, 42, .14)";
            }}
          >
            <div className="stat-card-sheen" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <p className="stat-title" style={{ color: "rgba(255,255,255,.78)" }}>{card.label}</p>

                <h2 className="stat-value" style={{ color: "#fff" }}>{card.value}</h2>

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
                      opacity: .9,
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
                  background: "rgba(255,255,255,.16)",
                  border: "1px solid rgba(255,255,255,.24)",
                  backdropFilter: "blur(12px)",
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
