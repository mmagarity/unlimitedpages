import type { ContentVariation, HeadlineVariation } from '../types';

export function cleanupHeadline(headline: string): string {
  // Remove duplicate location references
  const locationPattern = /\s+in\s+([^.]+?)(?:\s+in\s+|$)/gi;
  headline = headline.replace(locationPattern, (match, location) => ` in ${location} `);
  
  // Remove duplicate year references
  const yearPattern = /\s*\(\d{4}\).*?\(\d{4}\)/g;
  headline = headline.replace(yearPattern, (match) => match.split(')')[0] + ')');
  
  // Clean up multiple spaces
  headline = headline.replace(/\s+/g, ' ').trim();
  
  return headline;
}

export function previewHeadline(baseHeadline: string, variations: ContentVariation[]): string {
  let headline = baseHeadline;
  const addedParts = new Set<string>();

  variations.forEach(variation => {
    const part = generateVariationPart(variation);
    if (part && !addedParts.has(part)) {
      headline += ` ${part}`;
      addedParts.add(part);
    }
  });

  return cleanupHeadline(headline);
}

function generateVariationPart(variation: ContentVariation): string {
  switch (variation.type) {
    case 'location':
      return `in ${variation.value}`;
    case 'demographic':
      return `for ${variation.value}`;
    case 'year':
      return variation.format || `(${variation.value})`;
    default:
      return variation.value;
  }
}