"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const leadData = [
  { month: "Jan", leads: 18, bookings: 8 },
  { month: "Feb", leads: 25, bookings: 12 },
  { month: "Mar", leads: 31, bookings: 17 },
  { month: "Apr", leads: 28, bookings: 14 },
  { month: "May", leads: 42, bookings: 21 },
  { month: "Jun", leads: 57, bookings: 29 },
];

const serviceData = [
  { name: "Counseling", value: 38 },
  { name: "Visa", value: 27 },
  { name: "Tests", value: 22 },
  { name: "Admissions", value: 31 },
];

const sourceData = [
  { name: "Homepage", value: 44, color: "#451ebb" },
  { name: "Blogs", value: 22, color: "#dd3333" },
  { name: "WhatsApp", value: 18, color: "#006970" },
  { name: "Referral", value: 16, color: "#f59e0b" },
];

export function LeadGrowthChart() {
  return (
    <div className="analytics-grid">
      <div className="analytics-card analytics-card-large">
        <div className="analytics-card-header">
          <div>
            <span className="admin-kicker">Pipeline</span>
            <h3>Lead and booking momentum</h3>
          </div>
          <span className="analytics-pill">6 months</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={leadData}>
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#451ebb" stopOpacity={0.36} />
                <stop offset="100%" stopColor="#451ebb" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#e9e5f6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="leads" stroke="#451ebb" strokeWidth={3} fill="url(#leadGradient)" />
            <Area type="monotone" dataKey="bookings" stroke="#006970" strokeWidth={3} fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-card">
        <div className="analytics-card-header compact">
          <div>
            <span className="admin-kicker">Demand</span>
            <h3>Top services</h3>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={serviceData}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#edf0f5" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
            <YAxis axisLine={false} tickLine={false} fontSize={11} />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#ff4c29" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-card">
        <div className="analytics-card-header compact">
          <div>
            <span className="admin-kicker">Sources</span>
            <h3>Lead channels</h3>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie data={sourceData} dataKey="value" nameKey="name" innerRadius={54} outerRadius={86} paddingAngle={4}>
              {sourceData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="source-legend">
          {sourceData.map((entry) => (
            <span key={entry.name}><i style={{ background: entry.color }} />{entry.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
