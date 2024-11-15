"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const SiteNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center p-1.5 bg-gray-200 sticky top-12 z-50">
      <nav className="flex gap-4">
        <Link 
          href="/" 
          className={`text-sm ${pathname === '/' ? 'font-bold text-blue-600' : 'text-gray-600'}`}
        >
          Home
        </Link>
        <Link 
          href="/about" 
          className={`text-sm ${pathname === '/about' ? 'font-bold text-blue-600' : 'text-gray-600'}`}
        >
          About
        </Link>
        <Link 
          href="/settings" 
          className={`text-sm ${pathname === '/settings' ? 'font-bold text-blue-600' : 'text-gray-600'}`}
        >
          Settings
        </Link>
      </nav>
    </div>
  );
};
