import Papa from 'papaparse';
import type { GeneratedArticle } from '../types/content';

export async function exportToCSV(articles: GeneratedArticle[]) {
  const data = articles.map(article => ({
    // Basic Information
    title: article.content.title,
    seoTitle: `${article.content.title} | Expert Guide 2024`,
    slug: article.content.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    status: article.status || 'draft',
    location: article.metadata.location.city,
    variation: article.metadata.demographic || 'Base',
    
    // SEO Content
    metaTitle: article.seo.metaTitle,
    metaDescription: article.seo.metaDescription,
    canonicalUrl: article.metadata.location ? 
      `/${article.metadata.location.state.toLowerCase()}/${article.metadata.location.city.toLowerCase()}/${article.slug}` : 
      `/guides/${article.slug}`,
    
    // Keywords
    primaryKeyword: article.content.title.split(' ').slice(-2).join(' '),
    secondaryKeywords: article.seo.focusKeywords.join('; '),
    
    // Content Structure
    headingStructure: JSON.stringify(article.content.sections.map((section, index) => ({
      level: index === 0 ? 1 : 2,
      text: section
    }))),
    
    // Main Content
    introduction: article.content.introduction,
    mainContent: article.content.mainContent,
    expertTips: Array.isArray(article.content.expertTips) ? 
      article.content.expertTips.join('\n') : 
      article.content.expertTips,
    localInsights: Array.isArray(article.content.localInsights) ? 
      article.content.localInsights.join('\n') : 
      article.content.localInsights,
    conclusion: article.content.conclusion,
    
    // Schema Data
    schemaType: 'Article',
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.content.title,
      "description": article.seo.metaDescription,
      "author": {
        "@type": "Organization",
        "name": "Expert Team"
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "publisher": {
        "@type": "Organization",
        "name": "Your Brand"
      }
    }),
    
    // Meta Information
    wordCount: article.content.mainContent.split(' ').length,
    contentType: 'article',
    lastUpdated: new Date().toISOString(),
    
    // Images
    images: article.images.map(img => img.url).join('; '),
    imageAlts: article.images.map(img => img.alt).join('; '),
    imageCaptions: article.images.map(img => img.caption).join('; '),
    
    // Publishing Details
    publishDate: article.publishingSchedule?.publishAt || new Date().toISOString(),
    timeSlot: article.publishingSchedule?.timeSlot || 'Not scheduled'
  }));

  const csv = Papa.unparse(data, {
    quotes: true, // Force quotes around all fields
    delimiter: ',',
    header: true
  });

  // Create and download the CSV file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `content-export-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}