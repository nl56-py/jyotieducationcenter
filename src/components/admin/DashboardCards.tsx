"use client";

import { Users, Calendar, FileText, ShieldAlert } from "lucide-react";

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
      label: "Leads This Week",
      value: stats.leadsCount,
      icon: Users,
      iconType: "primary",
    },
    {
      label: "Pending Bookings",
      value: stats.bookingsCount,
      icon: Calendar,
      iconType: "secondary",
    },
    {
      label: "Published Blogs",
      value: stats.blogsCount,
      icon: FileText,
      iconType: "primary",
    },
    {
      label: "Security Alerts",
      value: stats.securityAlertsCount,
      icon: ShieldAlert,
      iconType: "error",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="stat-card">
            <div className="stat-info">
              <span className="stat-label">{card.label}</span>
              <span className="stat-value">{card.value}</span>
            </div>
            <div className={`stat-icon ${card.iconType}`}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
