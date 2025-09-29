
"use client";
import { DashboardLayout } from "@/components/dashboard/layout";
import { ProtectedRoute } from "@/components/protected-route";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function CoordinatorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['coordinator']}>
      <SidebarProvider>
        <DashboardLayout role="coordinator">{children}</DashboardLayout>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
