import type { HeadlineTemplate } from '../types';

export const HEADLINE_TEMPLATES: HeadlineTemplate[] = [
  // General Articles
  {
    id: 'general-guide',
    pattern: 'The Complete Guide to [keyword]',
    articleType: 'general',
    prepositions: {
      location: 'in',
      demographic: 'for'
    },
    allowedVariations: ['location', 'demographic']
  },
  {
    id: 'general-overview',
    pattern: 'Understanding [keyword]',
    articleType: 'general',
    prepositions: {
      location: 'in',
      demographic: 'for'
    },
    allowedVariations: ['location', 'demographic']
  },

  // Listicles
  {
    id: 'listicle-best',
    pattern: '[number] Best [keyword]',
    articleType: 'listicle',
    prepositions: {
      location: 'in',
      demographic: 'for'
    },
    allowedVariations: ['location', 'demographic'],
    numberOptions: [5, 10, 15, 20]
  },
  {
    id: 'listicle-top',
    pattern: 'Top [number] [keyword]',
    articleType: 'listicle',
    prepositions: {
      location: 'in',
      demographic: 'for'
    },
    allowedVariations: ['location', 'demographic'],
    numberOptions: [5, 10, 15, 20]
  },

  // Reviews
  {
    id: 'review-comprehensive',
    pattern: '[keyword] Review',
    articleType: 'review',
    prepositions: {
      location: 'in',
      demographic: 'for'
    },
    allowedVariations: ['location', 'demographic']
  },
  {
    id: 'review-guide',
    pattern: 'The Ultimate [keyword] Review Guide',
    articleType: 'review',
    prepositions: {
      location: 'in',
      demographic: 'for'
    },
    allowedVariations: ['location', 'demographic']
  },

  // How-to
  {
    id: 'howto-basic',
    pattern: 'How to Choose [keyword]',
    articleType: 'howto',
    prepositions: {
      location: 'in',
      demographic: 'as'
    },
    allowedVariations: ['location', 'demographic']
  },
  {
    id: 'howto-guide',
    pattern: 'A Complete Guide to [keyword]',
    articleType: 'howto',
    prepositions: {
      location: 'in',
      demographic: 'for'
    },
    allowedVariations: ['location', 'demographic']
  }
];