"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Coffee, UtensilsCrossed, ClipboardList, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { setAuthStatus } from '@/lib/auth';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Coffee },
  { href: '/admin/food-items', label: 'Food Items', icon: UtensilsCrossed },
  { href: '/admin/orders', label: 'Orders', icon: ClipboardList },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    setAuthStatus(false);
    router.replace('/login');
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-sidebar p-4 shadow-lg">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Coffee className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="font-headline text-2xl font-semibold text-sidebar-foreground">Cafe Central</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link key={item.label} href={item.href} legacyBehavior passHref>
              <a
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex w-full items-center justify-start gap-3 px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
