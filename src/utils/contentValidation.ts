import type { GeneratedArticle } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ContentValidator {
  static validateArticle(article: GeneratedArticle): ValidationResult {
    const errors: string[] = [];

    // Validate title
    if (!article.content.title || article.content.title.length < 10) {
      errors.push('Title must be at least 10 characters long');
    }

    // Validate main content
    if (!article.content.mainContent || article.content.mainContent.length < 100) {
      errors.push('Main content must be at least 100 characters long');
    }

    // Validate introduction
    if (!article.content.introduction || article.content.introduction.length < 50) {
      errors.push('Introduction must be at least 50 characters long');
    }

    // Validate SEO metadata
    if (!article.seo.metaTitle || article.seo.metaTitle.length < 10) {
      errors.push('Meta title must be at least 10 characters long');
    }
    if (!article.seo.metaDescription || article.seo.metaDescription.length < 50) {
      errors.push('Meta description must be at least 50 characters long');
    }

    // Validate content structure
    if (!this.hasValidStructure(article.content.mainContent)) {
      errors.push('Content structure is invalid (must have headings and paragraphs)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static hasValidStructure(content: string): boolean {
    // Check for basic HTML structure
    const hasHeadings = /<h[1-6][^>]*>.*?<\/h[1-6]>/i.test(content);
    const hasParagraphs = /<p[^>]*>.*?<\/p>/i.test(content);
    
    // Check for minimum content sections
    const sections = content.split(/(?=<h[1-6])/i);
    const hasMinimumSections = sections.length >= 3; // At least 3 sections including intro
    
    return hasHeadings && hasParagraphs && hasMinimumSections;
  }
}
