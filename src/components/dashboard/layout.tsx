"use client"

import * as React from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
import { MainNav } from "./main-nav"
import type { UserRole } from "@/lib/types"
import { DashboardHeader } from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: UserRole
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize?: number
}

export function DashboardLayout({
  children,
  role,
  defaultLayout = [15, 85],
  defaultCollapsed = false,
  navCollapsedSize = 4,
}: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`
      }}
      className="h-full max-h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={12}
        maxSize={20}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`
        }}
        onExpand={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`
        }}
        className={cn(
          "min-w-[50px] transition-all duration-300 ease-in-out hidden sm:block",
          isCollapsed && "min-w-[50px] md:min-w-[70px]"
        )}
      >
        <MainNav role={role} isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle withHandle className="hidden sm:flex"/>
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex flex-col h-full">
            <DashboardHeader role={role} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-muted/40">
                {children}
            </main>
          </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
