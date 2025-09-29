
"use client";
import React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { ProtectedRoute } from "@/components/protected-route";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FarmerProvider } from "@/context/farmer-context";

export default function FarmerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ProtectedRoute allowedRoles={['farmer']}>
      <SidebarProvider>
        <FarmerProvider>
          <DashboardLayout role="farmer">
            {children}
          </DashboardLayout>
        </FarmerProvider>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
