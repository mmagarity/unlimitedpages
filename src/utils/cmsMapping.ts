import { generateContentWithPerplexity } from './perplexityApi';
import { generateSlug } from './slugUtils';
import { formatCityState } from '../data/locationData';
import type { CMSFields, ContentParams, GeneratedContent } from '../types';

export async function generateCMSFields(params: ContentParams): Promise<CMSFields> {
  // Generate content using Perplexity API
  const content = await generateContentWithPerplexity(params);
  
  // Generate slug and URLs
  const slug = generateSlug({
    location: params.location.city,
    keyword: params.keyword,
    year: params.year
  });

  const canonicalUrl = `https://example.com/${params.location.state.toLowerCase()}/${slug}`;
  
  // Format location data
  const cityState = formatCityState({
    name: params.location.city,
    state: params.location.state,
    stateName: params.location.stateFullName
  });

  // Return complete CMS fields object
  return {
    seo: {
      ...content.seo,
      slug,
      canonicalUrl,
      robots: 'index,follow',
      openGraph: {
        title: content.seo.title,
        description: content.seo.metaDescription,
        type: 'article',
        url: canonicalUrl
      }
    },
    content: {
      ...content.content,
      lastModified: new Date().toISOString(),
      author: 'Local Expert',
      reviewDate: new Date().toISOString()
    },
    location: {
      city: params.location.city,
      state: params.location.state,
      stateFullName: params.location.stateFullName,
      cityState,
      region: content.localElements.region,
      serviceArea: content.localElements.serviceArea
    },
    schema: {
      type: 'Article',
      properties: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: content.seo.title,
        description: content.seo.metaDescription,
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: 'Local Expert'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Your Brand',
          logo: {
            '@type': 'ImageObject',
            url: 'https://example.com/logo.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        about: {
          '@type': 'Thing',
          name: params.keyword
        },
        locationCreated: {
          '@type': 'Place',
          name: params.location.city,
          address: {
            '@type': 'PostalAddress',
            addressLocality: params.location.city,
            addressRegion: params.location.state,
            addressCountry: 'US'
          }
        }
      }
    },
    metadata: {
      ...content.metadata,
      variations: params.variations,
      contentType: 'article',
      category: determineCategory(params.keyword),
      status: 'draft'
    }
  };
}

function determineCategory(keyword: string): string {
  // Implement category determination logic
  const categories = {
    'coffee': 'food-and-drink',
    'restaurant': 'food-and-drink',
    'gym': 'health-and-fitness',
    'salon': 'beauty-and-wellness',
    // Add more categories as needed
  };

  const matchedCategory = Object.entries(categories).find(([key]) => 
    keyword.toLowerCase().includes(key)
  );

  return matchedCategory ? matchedCategory[1] : 'general';
}