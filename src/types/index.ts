import { LucideIcon } from 'lucide-react';

export type IconType = typeof LucideIcon;

export interface WorkflowStep {
  title: string;
  description: string;
  completed: boolean;
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
  type: 'location' | 'demographic' | 'year';
  value: string;
  preposition?: string;
  format?: string;
  cityCount?: number;
}

export interface CMSField {
  id: string;
  name: string;
  type: string;
  required: boolean;
}