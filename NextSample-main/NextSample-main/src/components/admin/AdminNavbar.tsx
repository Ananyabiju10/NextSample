
"use client";

import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const getPageTitle = (pathname: string): string[] => {
  if (pathname === '/admin') return ['Dashboard'];
  if (pathname.startsWith('/admin/food-items')) return ['Dashboard', 'Food Items'];
  if (pathname.startsWith('/admin/orders')) return ['Dashboard', 'Orders'];
  // Add more specific paths if needed, e.g., /admin/food-items/edit/123
  return ['Dashboard']; // Fallback
};

export default function AdminNavbar() {
  const pathname = usePathname();
  const breadcrumbSegments = getPageTitle(pathname);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6 shadow-sm">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbSegments.flatMap((segment, index) => {
            const isLast = index === breadcrumbSegments.length - 1;
            
            const itemPath = index === 0 
              ? '/admin' 
              : `/admin/${breadcrumbSegments.slice(1, index + 1).join('/').toLowerCase().replace(/\s+/g, '-')}`;

            const itemElement = (
              <BreadcrumbItem key={`${segment}-item-${index}`}>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold">{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={itemPath}>
                    {segment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            );

            if (isLast) {
              return [itemElement];
            } else {
              return [
                itemElement,
                <BreadcrumbSeparator key={`${segment}-separator-${index}`} />
              ];
            }
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Admin User</span>
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="user avatar" />
          <AvatarFallback>AU</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
