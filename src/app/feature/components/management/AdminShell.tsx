"use client";

import { useState, type ReactNode } from "react";
import { HotelMockDataProvider } from "@/hooks/useHotelMockData";
import Sidebar from "./Sidebar";
import Topbar from "./DashboarNavbar";

export default function AdminShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <HotelMockDataProvider>
      <div className="admin-shell flex min-h-screen w-full bg-slate-50 text-slate-900">
        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <Sidebar
          open={sidebarOpen}
          onNavigate={() => setSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            notificationCount={3}
            onMenuClick={() => setSidebarOpen((v) => !v)}
          />
          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-7 lg:py-6">
            {children}
          </div>
        </div>
      </div>
    </HotelMockDataProvider>
  );
}
