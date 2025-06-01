'use client';

import { usePathname, useRouter } // Removed useSearchParams as it's not used
from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import type { Dictionary } from '@/lib/getDictionary';

const supportedLocales = [
  { code: 'es', nameKey: 'es' }, // nameKey matches key in dictionary.LanguageSwitcher.currentLanguage
  { code: 'en', nameKey: 'en' },
  { code: 'fr', nameKey: 'fr' },
];

interface LanguageSwitcherProps {
  currentLocale: string;
  dictionary: Dictionary;
}

export function LanguageSwitcher({ currentLocale, dictionary }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname(); // e.g. /en/about or /es/products

  const handleLocaleChange = (newLocale: string) => {
    // Pathname is /<locale>/<path> or /<locale>
    // We want to change /<locale> to /<newLocale>
    // and /<locale>/<path> to /<newLocale>/<path>
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace the locale part
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  const t = dictionary.LanguageSwitcher || {};
  const currentLangDisplay = t.currentLanguage?.[currentLocale as keyof typeof t.currentLanguage] || currentLocale.toUpperCase();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2"> {/* Adjusted size and padding */}
          <Globe className="h-5 w-5 mr-1" />
          <span className="hidden sm:inline">{currentLangDisplay}</span>
          <span className="sr-only sm:hidden">{t.changeLanguage || 'Change language'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLocales.map((localeInfo) => (
          <DropdownMenuItem
            key={localeInfo.code}
            onClick={() => handleLocaleChange(localeInfo.code)}
            disabled={currentLocale === localeInfo.code}
            className={currentLocale === localeInfo.code ? 'font-semibold' : ''}
          >
            {t.currentLanguage?.[localeInfo.nameKey as keyof typeof t.currentLanguage] || localeInfo.code.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
