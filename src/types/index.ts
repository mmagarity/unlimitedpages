import type { Icon } from 'lucide-react';

export type IconType = typeof Icon;

export interface WorkflowStep {
  title: string;
  description: string;
  completed: boolean;
}

export interface ArticleType {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  examples: string[];
}

export interface HeadlineTemplate {
  id: string;
  pattern: string;
  articleType: string;
  prepositions: {
    location?: string;
    demographic?: string;
  };
  allowedVariations: ('location' | 'demographic' | 'custom')[];
  numberOptions?: number[];
}

export interface HeadlineVariation {
  id: string;
  baseHeadline: string;
  variations: {
    type: 'location' | 'demographic' | 'custom';
    value: string;
    preposition: string;
  }[];
  selected: boolean;
  articleType?: string;
}

export interface ContentVariation {
  id: string;
  type: 'location' | 'demographic' | 'year';
  value: string;
  preposition?: string;
  metadata?: {
    city?: string;
    state?: string;
    stateName?: string;
    population?: number;
  };
}

export interface CMSField {
  id: string;
  name: string;
  type: string;
  required: boolean;
}

export interface GeneratedArticle {
  id: string;
  title: string;
  content: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeywords?: string[];
    slug?: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  schema: {
    '@context': string;
    '@type': string;
    data: {
      headline: string;
      description?: string;
      articleType?: string;
      datePublished?: string;
      dateModified?: string;
      keywords?: string[];
    };
  };
  variation: string;
  metadata?: {
    city?: string;
    state?: string;
    stateName?: string;
    population?: number;
    year?: number;
    demographic?: string;
  };
}