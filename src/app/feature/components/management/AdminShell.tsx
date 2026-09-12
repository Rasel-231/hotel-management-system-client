"use client";

import type { ReactNode } from "react";
import { useUiStore } from "@/store/uiStore";
import Sidebar from "./Sidebar";
import Topbar from "./DashboarNavbar";

export default function AdminShell({ children }: { children: ReactNode }) {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const closeSidebar = useUiStore((s) => s.closeSidebar);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <div className="admin-shell flex min-h-screen w-full bg-cream text-ink">
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-forest-deep/50 lg:hidden"
          onClick={closeSidebar}
        />
      ) : null}

      <Sidebar
        open={sidebarOpen}
        onNavigate={closeSidebar}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          notificationCount={3}
          onMenuClick={toggleSidebar}
        />
        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-7 lg:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}