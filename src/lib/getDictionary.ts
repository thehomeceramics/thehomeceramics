import 'server-only';

// Define a type for the dictionary structure for better type safety
// This is a basic example; you might want to make it more specific
export type Dictionary = {
  [key: string]: any; 
};

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const load = dictionaries[locale] || dictionaries.es; // Fallback to Spanish (default)
  try {
    return await load();
  } catch (error) {
    console.error(`Failed to load dictionary for locale "${locale}":`, error);
    // Fallback to default locale if specific one fails
    if (locale !== 'es') {
      console.warn('Falling back to default (es) dictionary.');
      return await dictionaries.es();
    }
    // If default also fails, return an empty object or throw
    return {}; 
  }
};
