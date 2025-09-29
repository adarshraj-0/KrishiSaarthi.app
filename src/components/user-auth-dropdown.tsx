
"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserNav } from "./dashboard/user-nav";


export function UserAuthDropdown() {
  const { isAuthenticated, userRole } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
        <div className="flex items-center space-x-4">
            <Button variant="outline" disabled>
                Login
            </Button>
            <Button disabled>
                Register
            </Button>
        </div>
    );
  }
  
  if(isAuthenticated && userRole) {
    return (
        <div className="flex items-center space-x-4">
            <Button onClick={() => router.push(`/${userRole}`)}>Go to Dashboard</Button>
            <UserNav />
        </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
        <Button asChild variant="outline">
            <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
            <Link href="/signup">Register</Link>
        </Button>
    </div>
  );
}
