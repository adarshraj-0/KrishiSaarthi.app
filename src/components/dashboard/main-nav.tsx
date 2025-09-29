
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  LineChart,
  Tractor,
  Building,
  Shield,
  Truck,
  BookUser,
  HeartHandshake
} from "lucide-react"
import { AppLogo } from "../logo"
import type { UserRole } from "@/lib/types"

const navLinks: Record<UserRole, { href: string; label: string; icon: React.ElementType }[]> = {
  farmer: [
    { href: "/farmer", label: "Dashboard", icon: Home },
    { href: "/farmer/crops", label: "My Crops", icon: Package },
    { href: "/farmer/orders", label: "Orders", icon: ShoppingCart },
    { href: "/farmer/analytics", label: "Analytics", icon: LineChart },
  ],
  consumer: [
    { href: "/consumer", label: "Marketplace", icon: Home },
    { href: "/consumer/orders", label: "My Orders", icon: Package },
    { href: "/consumer/subscriptions", label: "Subscriptions", icon: BookUser },
  ],
  business: [
    { href: "/business", label: "Dashboard", icon: Home },
    { href: "/business/orders", label: "Bulk Orders", icon: ShoppingCart },
    { href: "/business/contracts", label: "Contracts", icon: HeartHandshake },
  ],
  coordinator: [
    { href: "/coordinator", label: "Overview", icon: Home },
    { href: "/coordinator/logistics", label: "Logistics", icon: Truck },
    { href: "/coordinator/farmers", label: "Farmers", icon: Users },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/users", label: "User Management", icon: Users },
    { href: "/admin/analytics", label: "Analytics", icon: LineChart },
    { href: "/admin/settings", label: "Settings", icon: Shield },
  ],
};

const roleIcons: Record<UserRole, React.ElementType> = {
    farmer: Tractor,
    consumer: Users,
    business: Building,
    coordinator: Truck,
    admin: Shield,
}

interface MainNavProps {
    role: UserRole;
    isCollapsed: boolean;
}

export function MainNav({ role, isCollapsed }: MainNavProps) {
  const pathname = usePathname()
  const links = navLinks[role] || [];
  const RoleIcon = roleIcons[role];

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
        <div className="flex items-center justify-center h-12 border-b">
            {isCollapsed ? <RoleIcon className="h-6 w-6"/> : <AppLogo className="text-primary"/>}
        </div>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
             <Link
                key={index}
                href={link.href}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  pathname.startsWith(link.href) && (link.href !== `/${role}` || pathname === link.href) && "bg-accent text-accent-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.label}</span>
              </Link>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname.startsWith(link.href) && (link.href !== `/${role}` || pathname === link.href) ? "bg-accent" : "transparent",
              )}
            >
                <link.icon className="mr-2 h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          )
        )}
      </nav>
    </div>
  )
}
