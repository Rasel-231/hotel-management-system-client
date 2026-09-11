import type { ReactNode } from "react";
import AdminShell from "@/app/feature/components/management/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
