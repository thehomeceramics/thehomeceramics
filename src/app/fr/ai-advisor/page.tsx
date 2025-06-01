import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  // In a real scenario, you might fetch this from fr.json
  return {
    title: 'Fonctionnalité Supprimée',
    description: "Le Conseiller en Style de Carreaux IA n'est plus disponible.",
  };
}

export default function AiAdvisorRemovedPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 text-center animate-in fade-in duration-500">
      <h1 className="text-3xl font-headline font-bold text-primary mb-6">
        Conseiller en Style de Carreaux IA Supprimé
      </h1>
      <p className="text-lg text-foreground/80 mb-8">
        Cette fonctionnalité n'est plus disponible.
      </p>
      <Link href="/fr" className="text-accent hover:underline">
        Retour à la Page d'Accueil
      </Link>
    </div>
  );
}
