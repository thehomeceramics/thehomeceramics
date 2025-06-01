
import Link from 'next/link';
import type { Dictionary } from '@/lib/getDictionary';

interface FooterProps {
  locale: string;
  dictionary: Dictionary;
}

export function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const navLinksDict = dictionary.NavLinks || {};
  const companyName = dictionary.COMPANY_INFO?.name || "The Home Ceramics Atelier";
  const tagline = dictionary.Footer?.tagline || "Luxury Porcelain Tiles for Discerning Tastes.";

  const footerLinks = [
    { href: `/${locale}`, label: navLinksDict.home || "Home" },
    { href: `/${locale}/products`, label: navLinksDict.products || "Products" },
    { href: `/${locale}/about`, label: navLinksDict.about || "About Us" },
    { href: `/${locale}/contact`, label: navLinksDict.contact || "Contact" },
  ];

  return (
    <footer className="border-t py-8 bg-secondary/50">
      <div className="container mx-auto px-4 text-center text-secondary-foreground">
        <nav className="mb-4">
          <ul className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            {footerLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm">
          &copy; {currentYear} {companyName}. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          {tagline}
        </p>
      </div>
    </footer>
  );
}
