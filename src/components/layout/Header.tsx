
'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { Menu } from 'lucide-react';
import { MainNav } from '@/components/layout/MainNav';
import type { NavItem } from '@/types';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Dictionary } from '@/lib/getDictionary';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

interface HeaderProps {
  locale: string;
  dictionary: Dictionary;
}

export function Header({ locale, dictionary }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkKeys = Object.keys(dictionary.NavLinks || {});
  
  const navLinks: NavItem[] = navLinkKeys.map(key => {
    let href = `/${locale}`;
    if (key === 'home') {
      // Home link goes to the root of the locale
    } else if (key === 'about') { // Specific handling for 'about' to match non-slugified route
      href += '/about';
    } else if (key === 'products') {
      href += '/products';
    } else if (key === 'contact') {
      href += '/contact';
    } else if (key === 'catalogs') {
      href += '/catalogs';
    }
     else {
      // Default to slugified key for other links if necessary in future
      href += `/${key.toLowerCase().replace(/\s+/g, '-')}`;
    }
    return {
      href,
      label: dictionary.NavLinks[key]
    };
  });
  

  const companyName = dictionary.Header?.companyName || "TheHomeCeramics";
  const mobileMenuSheetTitle = dictionary.Header?.mobileMenuTitle || "Menu";
  const logoAltText = dictionary.Header?.logoAlt || `${companyName} logo`;


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href={`/${locale}`} className="mr-6 flex items-center space-x-2">
          <Image 
            src="/image/logo.png" 
            alt={logoAltText}
            width={28} 
            height={28} 
            className="h-7 w-auto" 
          />
          <span className="font-bold font-headline text-lg sm:inline-block">
            {companyName}
          </span>
        </Link>
        
        <div className="hidden md:flex items-center">
          <MainNav items={navLinks} className="flex-row gap-x-4 lg:gap-x-6" />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:block">
             <LanguageSwitcher currentLocale={locale} dictionary={dictionary} />
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={mobileMenuSheetTitle}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[340px] p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="flex items-center space-x-2 text-left">
                     <Image 
                        src="/image/logo.png" 
                        alt={logoAltText}
                        width={20} 
                        height={20} 
                        className="h-5 w-auto"
                      />
                    <span className="font-bold font-headline text-md">
                      {companyName}
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="p-4 flex-grow">
                  <MainNav
                    items={navLinks}
                    className="flex-col gap-y-1 text-base"
                    onNavItemClick={() => setIsMobileMenuOpen(false)}
                  />
                </div>
                <div className="p-4 border-t">
                   <LanguageSwitcher currentLocale={locale} dictionary={dictionary} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
