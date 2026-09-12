import { Suspense } from "react";
import type { ReactNode } from "react";
import AdminShell from "@/app/feature/components/management/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-forest" />
        </div>
      }
    >
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}