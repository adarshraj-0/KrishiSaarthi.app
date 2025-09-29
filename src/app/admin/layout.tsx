
"use client";
import { DashboardLayout } from "@/components/dashboard/layout";
import { ProtectedRoute } from "@/components/protected-route";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <SidebarProvider>
        <DashboardLayout role="admin">{children}</DashboardLayout>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
