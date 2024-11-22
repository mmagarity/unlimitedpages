import type { HeadlineTemplate } from '../types';
import { capitalizeWords } from './textUtils';

export function generateHeadlines(template: string, keyword: string): string {
  return template.replace(/\[keyword\]/g, keyword);
}

export function validateHeadline(headline: string): boolean {
  // Basic validation rules
  if (!headline) return false;
  if (headline.includes('[') || headline.includes(']')) return false;
  if (headline.length < 10 || headline.length > 100) return false;
  
  // Check for common grammar issues
  const commonIssues = [
    'in in',
    'for for',
    'the the',
    'a a',
    'an an',
  ];
  
  return !commonIssues.some(issue => headline.toLowerCase().includes(issue));
}