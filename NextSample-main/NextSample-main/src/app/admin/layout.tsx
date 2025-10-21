"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkAuthStatus } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminNavbar from '@/components/admin/AdminNavbar';

// Loading component to use with Suspense
function AdminLoading() {
  return (
     <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center">
        <svg className="mx-auto h-12 w-12 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-medium text-foreground">Loading Admin Area...</p>
      </div>
    </div>
  );
}


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // For re-checking auth on navigation
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = checkAuthStatus();
    setIsAuth(authStatus);
    if (!authStatus) {
      router.replace('/login');
    }
  }, [router, pathname]); // Re-run on pathname change if needed, though primary check is on mount

  if (isAuth === null) {
    return <AdminLoading />;
  }
  
  if (!isAuth) {
    // This case should ideally not be hit if router.replace works immediately,
    // but as a fallback or if user navigates back quickly.
    return <AdminLoading />;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Suspense fallback={<AdminLoading />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
