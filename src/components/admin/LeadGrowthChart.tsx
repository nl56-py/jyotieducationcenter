"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { month: "Jan", leads: 18 },
    { month: "Feb", leads: 25 },
    { month: "Mar", leads: 31 },
    { month: "Apr", leads: 28 },
    { month: "May", leads: 42 },
    { month: "Jun", leads: 57 },
];

export function LeadGrowthChart() {
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: 18,
                padding: 24,
                boxShadow: "0 10px 30px rgba(0,0,0,.05)",
                border: "1px solid #ECECEC",
            }}
        >
            <h3
                style={{
                    marginBottom: 20,
                    fontSize: 20,
                    fontWeight: 700,
                }}
            >
                📈 Lead Growth
            </h3>

            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="4 4" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="leads"
                        stroke="#7C3AED"
                        strokeWidth={4}
                        dot={{
                            r: 6,
                            fill: "#7C3AED",
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}