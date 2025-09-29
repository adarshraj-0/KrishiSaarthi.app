
"use client";
import { DashboardLayout } from "@/components/dashboard/layout";
import { ProtectedRoute } from "@/components/protected-route";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ConsumerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['consumer']}>
      <SidebarProvider>
        <DashboardLayout role="consumer">{children}</DashboardLayout>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
