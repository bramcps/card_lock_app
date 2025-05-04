'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({
  children,
  adminOnly = false,
  redirectTo = '/'
}) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (adminOnly && !isAdmin) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, isAdmin, loading, adminOnly, redirectTo, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isAuthenticated && (!adminOnly || isAdmin)) {
    return children;
  }

  return null;
}
