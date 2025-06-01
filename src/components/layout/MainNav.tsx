'use client';

import type { NavItem } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface MainNavProps {
  items: NavItem[];
  className?: string;
  onNavItemClick?: () => void;
}

export function MainNav({ items, className, onNavItemClick }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center", className)}>
      {items.map((item) => {
        const isActive = pathname.endsWith(item.href) || (item.href === '/' && /^\/(en|es|fr)$/.test(pathname));
        
        return (
          <Link
            key={item.label} // Using label as key assuming labels are unique within this nav
            href={item.href}
            className={cn(
              'font-medium transition-colors hover:text-primary',
              'py-2 px-1 md:px-0', // Added some padding for mobile tap targets, zeroed for desktop if parent handles
              isActive ? 'text-primary font-semibold' : 'text-foreground/70',
              // For mobile, links are block by default due to flex-col in parent
              // For desktop, they are inline-block due to flex-row in parent
            )}
            onClick={onNavItemClick}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
