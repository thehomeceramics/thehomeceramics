
import type { Metadata } from 'next';
// Global CSS and font links will be moved to src/app/[locale]/layout.tsx
// Toaster will also be moved there

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thehomeceramicsatelier.com'), // IMPORTANT: Ensure this is your actual production domain
  // Default title and description will now be primarily sourced from locale-specific dictionaries
  // via src/app/[locale]/layout.tsx to allow for better length control per language.
  // However, a very generic fallback can be here if desired, but it's less critical now.
  title: 'The Home Ceramics Atelier', // Generic fallback, will be overridden
  description: 'Luxury porcelain tiles for unique spaces.', // Generic fallback
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This root layout now primarily sets up metadataBase and passes children.
  // The <html> and <body> tags, along with locale-specific lang attribute,
  // global styles, fonts, and Toaster, will be in src/app/[locale]/layout.tsx.
  return children;
}
