import type { MetadataRoute } from 'next';

const locales = ['en', 'es', 'fr'];
// Ensure this is your correct production domain and matches metadataBase
const siteUrl = 'https://www.thehomeceramics.com'; // Corrected domain

// Define common pages that exist for all locales
// Ensure these paths are correct and exist.
const pages = [
  '', // HomePage
  '/products',
  '/catalogs',
  '/about',
  '/contact',
  // Add other significant static pages here if any
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    pages.forEach(page => {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}${page === '' ? '' : page}`, // Handle homepage correctly
        lastModified: new Date().toISOString(),
        // Optional:
        // changeFrequency: page === '' ? 'daily' : 'monthly',
        // priority: page === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
