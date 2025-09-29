
"use client";
import { DashboardLayout } from "@/components/dashboard/layout";
import { ProtectedRoute } from "@/components/protected-route";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function BusinessDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['business']}>
      <SidebarProvider>
        <DashboardLayout role="business">{children}</DashboardLayout>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
