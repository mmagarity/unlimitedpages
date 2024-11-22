import type { HeadlineTemplate, HeadlineVariation } from '../types';
import { capitalizeWords } from './textUtils';

export function generateHeadlineVariation(
  template: HeadlineTemplate,
  keyword: string,
  number?: number
): HeadlineVariation {
  const baseHeadline = template.pattern
    .replace(/\[keyword\]/g, keyword)
    .replace(/\[number\]/g, number?.toString() || '');

  return {
    id: `${template.id}-${Date.now()}-${Math.random()}`,
    baseHeadline: capitalizeWords(baseHeadline),
    variations: [],
    selected: false
  };
}

export function generateHeadlineSuggestions(
  templates: HeadlineTemplate[],
  keyword: string,
  existingHeadlines: Set<string>
): HeadlineVariation[] {
  const suggestions: HeadlineVariation[] = [];
  const maxSuggestionsPerTemplate = 3;

  templates.forEach(template => {
    if (template.numberOptions?.length) {
      // For numbered templates, use each number option once
      template.numberOptions.slice(0, maxSuggestionsPerTemplate).forEach(number => {
        const headline = generateHeadlineVariation(template, keyword, number);
        if (!existingHeadlines.has(headline.baseHeadline)) {
          suggestions.push(headline);
        }
      });
    } else {
      // For non-numbered templates, generate one variation
      const headline = generateHeadlineVariation(template, keyword);
      if (!existingHeadlines.has(headline.baseHeadline)) {
        suggestions.push(headline);
      }
    }
  });

  return suggestions;
}