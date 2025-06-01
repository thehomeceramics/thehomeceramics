// This non-localized page is effectively unused due to middleware redirecting to /es by default.
// However, to be safe and consistent, make it a similar placeholder or empty.
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Feature Removed',
    description: 'The AI Tile Style Advisor feature is no longer available.',
  };
}

export default function AiAdvisorRemovedPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 text-center animate-in fade-in duration-500">
      <h1 className="text-3xl font-headline font-bold text-primary mb-6">
        AI Tile Style Advisor Removed
      </h1>
      <p className="text-lg text-foreground/80 mb-8">
        This feature is no longer available.
      </p>
      <Link href="/" className="text-accent hover:underline">
        Return to Homepage
      </Link>
    </div>
  );
}
