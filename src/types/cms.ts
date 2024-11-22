import type { USCity, USState } from './locations';

export interface LocationData {
  city: string;
  state: string;
  stateFullName: string;
  cityState: string;
  region?: string;
  population: number;
  rank: number;
}

export interface ContentStructure {
  headings: {
    level: number;
    text: string;
    id: string;
  }[];
  contentTemplate: string;
  contentType: 'guide' | 'comparison' | 'review' | 'list' | 'howto';
  category: string;
  sections: {
    id: string;
    type: string;
    content: string;
  }[];
}

export interface SEOData {
  canonicalUrl: string;
  alternateUrls: string[];
  breadcrumbs: {
    text: string;
    url: string;
  }[];
  schema: Record<string, any>;
  targetKeywordDensity: number;
  focusKeywords: string[];
  semanticKeywords: string[];
}

export interface PublicationData {
  publishDate?: string;
  expiryDate?: string;
  seasonality?: string[];
  author: string;
  reviewDate?: string;
  status: 'draft' | 'review' | 'published';
  version: number;
}

export interface AudienceData {
  targetDemographic: string[];
  intendedAudience: string[];
  searchIntent: 'informational' | 'transactional' | 'navigational';
  userExperience: 'beginner' | 'intermediate' | 'advanced';
}

export interface ContentVariations {
  angles: string[];
  relatedTopics: string[];
  localFeatures: string[];
  seasonalContent?: string[];
}

export interface CMSEntry {
  id: string;
  slug: string;
  baseHeadline: string;
  generatedHeadline: string;
  location: LocationData;
  content: ContentStructure;
  seo: SEOData;
  publication: PublicationData;
  audience: AudienceData;
  variations: ContentVariations;
  tracking: {
    createdAt: string;
    updatedAt: string;
    lastPublished?: string;
  };
}

export interface CMSField {
  id: string;
  name: string;
  type: 'string' | 'text' | 'richtext' | 'image' | 'slug' | 'select' | 'boolean' | 'array' | 'object';
  required: boolean;
  description?: string;
  defaultValue?: any;
  validations?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    options?: string[];
  };
}

export interface CMSTemplate {
  id: string;
  name: string;
  fields: CMSField[];
  mappings: {
    [key: string]: string;
  };
}