
'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    } else if (isAuthenticated && userRole && !allowedRoles.includes(userRole)) {
      // Redirect to their own dashboard if they try to access a wrong one
      router.push(`/${userRole}`);
    }
  }, [isAuthenticated, userRole, router, allowedRoles]);
  
  if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
    // Show a loading skeleton or a blank screen while redirecting
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="space-y-4 w-full max-w-4xl p-8">
            <Skeleton className="h-12 w-1/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
