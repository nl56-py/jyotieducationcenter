"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminShellProps {
    user: {
        fullName: string;
        email: string;
        role: string;
        isMock?: boolean;
    };
    children: React.ReactNode;
}

export default function AdminShell({
    user,
    children,
}: AdminShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-body">
            <div className="admin-layout">
                <AdminSidebar
                    user={user}
                    sidebarOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {sidebarOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <main className="admin-main">
                    <AdminHeader
                        title="EduMark Portal"
                        user={user}
                        sidebarOpen={sidebarOpen}
                        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
                    />

                    <div className="admin-content-scrollable">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}