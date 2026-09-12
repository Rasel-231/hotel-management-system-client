import { Suspense } from "react";
import AdminDashboardPage from "./DashboardPages";

const DashboardPage = () => {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-sand" />}>
      <AdminDashboardPage />
    </Suspense>
  );
};

export default DashboardPage;