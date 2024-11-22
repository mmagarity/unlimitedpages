import type { CMSField, CMSTemplate } from '../types/cms';

export const CMS_FIELDS: CMSField[] = [
  {
    id: 'id',
    name: 'Unique ID',
    type: 'string',
    required: true,
    description: 'Auto-generated unique identifier',
    validations: {
      pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    }
  },
  {
    id: 'slug',
    name: 'URL Slug',
    type: 'slug',
    required: true,
    description: 'SEO-friendly URL path',
    validations: {
      pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    }
  },
  {
    id: 'canonicalUrl',
    name: 'Canonical URL',
    type: 'string',
    required: true,
    description: 'Full canonical URL for this variation'
  },
  {
    id: 'parentTemplate',
    name: 'Parent Template',
    type: 'string',
    required: true,
    description: 'Reference to original template'
  },
  {
    id: 'title',
    name: 'Page Title',
    type: 'string',
    required: true,
    validations: {
      minLength: 10,
      maxLength: 70
    }
  },
  {
    id: 'metaTitle',
    name: 'Meta Title',
    type: 'string',
    required: true,
    validations: {
      minLength: 30,
      maxLength: 60
    }
  },
  {
    id: 'metaDescription',
    name: 'Meta Description',
    type: 'text',
    required: true,
    validations: {
      minLength: 120,
      maxLength: 160
    }
  },
  {
    id: 'ogTitle',
    name: 'OG Title',
    type: 'string',
    required: true,
    description: 'Open Graph title for social sharing'
  },
  {
    id: 'ogDescription',
    name: 'OG Description',
    type: 'text',
    required: true,
    description: 'Open Graph description for social sharing'
  },
  {
    id: 'focusKeywords',
    name: 'Focus Keywords',
    type: 'text',
    required: true,
    description: 'Primary keywords for SEO optimization'
  },
  {
    id: 'semanticKeywords',
    name: 'Semantic Keywords',
    type: 'text',
    required: true,
    description: 'Related semantic variations of keywords'
  },
  {
    id: 'internalLinkingTags',
    name: 'Internal Linking Tags',
    type: 'text',
    required: false,
    description: 'Tags for internal linking strategy'
  },
  {
    id: 'schemaType',
    name: 'Schema Type',
    type: 'select',
    required: true,
    description: 'JSON-LD schema type'
  },
  {
    id: 'schemaProperties',
    name: 'Schema Properties',
    type: 'text',
    required: true,
    description: 'Additional schema.org properties'
  },
  {
    id: 'introduction',
    name: 'Introduction',
    type: 'richtext',
    required: true,
    description: 'AI-generated unique opening paragraph'
  },
  {
    id: 'mainContent',
    name: 'Main Content',
    type: 'richtext',
    required: true,
    description: 'Primary article content'
  },
  {
    id: 'conclusion',
    name: 'Conclusion',
    type: 'richtext',
    required: true,
    description: 'Article conclusion'
  },
  {
    id: 'featuredImage',
    name: 'Featured Image',
    type: 'image',
    required: true,
    description: 'Primary article image'
  },
  {
    id: 'imageAlt',
    name: 'Image Alt Text',
    type: 'string',
    required: true,
    description: 'SEO-friendly image alt text'
  },
  {
    id: 'status',
    name: 'Content Status',
    type: 'select',
    required: true,
    defaultValue: 'draft'
  },
  {
    id: 'readabilityScore',
    name: 'Readability Score',
    type: 'string',
    required: false,
    description: 'Automated readability analysis score'
  },
  {
    id: 'qualityFlags',
    name: 'Quality Flags',
    type: 'text',
    required: false,
    description: 'Content quality warning flags'
  },
  {
    id: 'lastUpdated',
    name: 'Last Updated',
    type: 'string',
    required: true,
    description: 'Last content update timestamp'
  }
];

export const DEFAULT_CMS_TEMPLATE: CMSTemplate = {
  id: 'default',
  name: 'Default PSEO Template',
  fields: CMS_FIELDS,
  mappings: {
    title: '{headline}',
    metaTitle: '{headline} | Your Brand',
    metaDescription: 'Discover {topic} in {location} perfect for {demographic}. Updated for {year} with expert insights and recommendations.',
    slug: '{location}/{topic}-for-{demographic}',
    introduction: 'Looking for {topic} in {location}? Our {year} guide is specially crafted for {demographic}, providing expert insights and recommendations.',
    ogTitle: '{headline} - Expert Guide {year}',
    ogDescription: 'Complete guide to {topic} in {location} for {demographic}. Expert tips, recommendations, and insights updated for {year}.',
    focusKeywords: '{topic}, {location}, {demographic}',
    canonicalUrl: 'https://yourdomain.com/{location}/{topic}-for-{demographic}',
    schemaType: 'Article',
    imageAlt: '{topic} in {location} for {demographic} - {year} Guide'
  }
};