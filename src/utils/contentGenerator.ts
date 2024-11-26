import { generateWithPerplexity } from '../lib/perplexity';
import type { HeadlineVariation, ContentVariation, GeneratedArticle } from '../types';

export async function generatePreviewContent(headline: string) {
  try {
    const baseContent = await generateWithPerplexity(headline, 'preview');
    
    return {
      title: baseContent.content.title,
      metaDescription: baseContent.content.seo.metaDescription,
      introduction: baseContent.content.sections.introduction,
      sections: baseContent.content.mainContent,
      cmsFields: {
        title: baseContent.content.title,
        slug: headline.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        metaTitle: baseContent.content.seo.metaTitle,
        metaDescription: baseContent.content.seo.metaDescription,
        canonicalUrl: `/guides/${headline.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        mainContent: formatContent(baseContent.content),
        images: [
          {
            url: `https://source.unsplash.com/1200x800/?${encodeURIComponent(headline)}`,
            alt: `${headline} - Primary Image`,
            caption: `Exploring ${headline}`
          }
        ],
        schema: baseContent.content.schema
      }
    };
  } catch (error) {
    console.error('Error generating preview content:', error);
    return generateFallbackContent(headline);
  }
}

function formatContent(content: any) {
  return `
## Introduction

${content.sections.introduction}

${content.sections.mainContent.map((section: string, index: number) => `
## Section ${index + 1}

${section}
`).join('\n')}

## Conclusion

${content.sections.conclusion}
  `.trim();
}

function generateFallbackContent(headline: string) {
  return {
    title: `[Mock Data] ${headline}`,
    metaDescription: `[Mock Data] Discover ${headline.toLowerCase()}. AI-generated insights and recommendations updated for ${new Date().getFullYear()}.`,
    introduction: `[Mock Data] Looking for information about ${headline.toLowerCase()}? This AI-generated guide provides expert insights and recommendations.`,
    sections: [
      '[Mock Data] Overview - AI-generated content',
      '[Mock Data] Key Features - AI-generated content',
      '[Mock Data] Expert Recommendations - AI-generated content',
      '[Mock Data] Conclusion - AI-generated content'
    ],
    cmsFields: {
      title: `[Mock Data] ${headline}`,
      slug: headline.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      metaTitle: `[Mock Data] ${headline} | AI-Generated Guide ${new Date().getFullYear()}`,
      metaDescription: `[Mock Data] Discover ${headline.toLowerCase()}. AI-generated insights and recommendations updated for ${new Date().getFullYear()}.`,
      canonicalUrl: `/guides/${headline.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      mainContent: `## [Mock Data] Introduction

This is an AI-generated guide about ${headline.toLowerCase()}.

## [Mock Data] Overview

AI-generated overview content.

## [Mock Data] Key Features

AI-generated features content.

## [Mock Data] Expert Recommendations

AI-generated recommendations content.

## [Mock Data] Conclusion

AI-generated conclusion content.`,
      images: [
        {
          url: `https://source.unsplash.com/1200x800/?${encodeURIComponent(headline)}`,
          alt: `[Mock Data] ${headline} - AI-Generated Content`,
          caption: `[Mock Data] AI-generated image for ${headline}`
        }
      ],
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `[Mock Data] ${headline}`,
        description: `[Mock Data] AI-generated guide about ${headline.toLowerCase()}.`,
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: '[Mock Data] AI Content Generator'
        }
      }
    }
  };
}

export async function generateContent(
  headline: HeadlineVariation,
  variations: ContentVariation[]
): Promise<GeneratedArticle[]> {
  try {
    // Generate base content
    const baseContent = await generateWithPerplexity(headline.baseHeadline, headline.articleType || 'general');
    const articles: GeneratedArticle[] = [];

    // Create base article
    articles.push({
      id: `${headline.id}-base`,
      title: baseContent.content.title,
      content: formatContent(baseContent.content),
      seo: baseContent.content.seo,
      schema: baseContent.content.schema,
      variation: 'base'
    });

    // Generate variations
    for (const variation of variations) {
      let variationTitle = headline.baseHeadline;
      let variationContent = baseContent.content;
      let metadata = variation.metadata;

      // Apply variation
      switch (variation.type) {
        case 'location': {
          const { city, state } = variation.metadata || {};
          if (!city || !state) continue;

          variationTitle = `${headline.baseHeadline} ${variation.preposition || 'in'} ${variation.value}`;
          
          // Generate location-specific content if needed
          const locationTerms = [
            'local regulations',
            'state laws',
            'regional requirements',
            'climate considerations',
            'weather patterns',
            'zoning laws',
            'municipal codes'
          ];
          
          const needsLocationSpecific = locationTerms.some(term => 
            JSON.stringify(baseContent.content).toLowerCase().includes(term)
          );

          if (needsLocationSpecific) {
            // Generate new content with location context
            const locationContent = await generateWithPerplexity(
              variationTitle,
              headline.articleType || 'general',
              {
                city,
                state,
                location: variation.value
              }
            );
            variationContent = locationContent.content;
          } else {
            // Replace generic location references with specific location
            variationContent = {
              ...baseContent.content,
              sections: {
                ...baseContent.content.sections,
                introduction: baseContent.content.sections.introduction
                  .replace(/in your area|in the area|locally/gi, `in ${variation.value}`)
                  .replace(/this city/gi, city)
                  .replace(/this state/gi, state),
                mainContent: baseContent.content.sections.mainContent.map(section => 
                  section
                    .replace(/in your area|in the area|locally/gi, `in ${variation.value}`)
                    .replace(/this city/gi, city)
                    .replace(/this state/gi, state)
                ),
                conclusion: baseContent.content.sections.conclusion
                  .replace(/in your area|in the area|locally/gi, `in ${variation.value}`)
                  .replace(/this city/gi, city)
                  .replace(/this state/gi, state)
              }
            };
          }
          break;
        }

        case 'demographic':
          variationTitle = `${headline.baseHeadline} ${variation.preposition || 'for'} ${variation.value}`;
          // Adjust content for specific demographic
          variationContent = {
            ...baseContent.content,
            sections: {
              ...baseContent.content.sections,
              introduction: baseContent.content.sections.introduction + `\n\nThis guide is specifically tailored for ${variation.value}.`,
              mainContent: baseContent.content.sections.mainContent.map(section =>
                section.replace(/people|users|customers|readers/gi, variation.value)
              )
            }
          };
          metadata = { demographic: variation.value };
          break;

        case 'year': {
          const year = parseInt(variation.value.match(/\d{4}/)?.[0] || '2024');
          variationTitle = `${headline.baseHeadline} ${variation.preposition || 'for'} ${variation.value}`;
          // Update year references
          variationContent = {
            ...baseContent.content,
            sections: {
              ...baseContent.content.sections,
              introduction: baseContent.content.sections.introduction.replace(/\b\d{4}\b/g, year.toString()),
              mainContent: baseContent.content.sections.mainContent.map(section =>
                section.replace(/\b\d{4}\b/g, year.toString())
              ),
              conclusion: baseContent.content.sections.conclusion.replace(/\b\d{4}\b/g, year.toString())
            }
          };
          metadata = { year };
          break;
        }
      }

      // Generate slug based on variation
      const slug = `${headline.baseHeadline.toLowerCase()}-${variation.value.toLowerCase()}`
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      articles.push({
        id: `${headline.id}-${variation.type}-${variation.id}`,
        title: variationTitle,
        content: formatContent(variationContent),
        seo: {
          ...baseContent.content.seo,
          metaTitle: `${variationTitle} | Expert Guide`,
          metaDescription: baseContent.content.seo.metaDescription.replace(headline.baseHeadline, variationTitle),
          slug,
          canonicalUrl: `/guides/${slug}`,
          focusKeywords: [
            ...(baseContent.content.seo.focusKeywords || []),
            variation.value,
            variationTitle
          ]
        },
        schema: {
          ...baseContent.content.schema,
          data: {
            ...baseContent.content.schema.data,
            headline: variationTitle,
            keywords: [
              ...(baseContent.content.schema.data.keywords || []),
              variation.value,
              variationTitle
            ]
          }
        },
        variation: `${variation.type}:${variation.value}`,
        metadata
      });
    }

    return articles;
  } catch (error) {
    console.error('Error generating content variations:', error);
    return [];
  }
}