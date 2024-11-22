import type { CMSSchema, FieldValidation } from '../types/cms';

export const CMS_SCHEMA: CMSSchema = {
  seo: {
    title: {
      type: 'string',
      required: true,
      validation: {
        maxLength: 60,
        pattern: '^[\\w\\s-.,!?&()]+$'
      },
      description: 'Page title for SEO',
      example: 'Best Coffee Shops in Philadelphia (2024) - Expert Guide'
    },
    metaTitle: {
      type: 'string',
      required: true,
      validation: {
        maxLength: 60,
        pattern: '^[\\w\\s-.,!?&()]+$'
      },
      description: 'Meta title tag content',
      example: 'Top 10 Coffee Shops in Philadelphia | Local Guide 2024'
    },
    metaDescription: {
      type: 'string',
      required: true,
      validation: {
        maxLength: 155,
        minLength: 70
      },
      description: 'Meta description tag content',
      example: 'Discover the best coffee shops in Philadelphia. Expert reviews, local favorites, and hidden gems updated for 2024. Perfect for coffee enthusiasts and casual visitors.'
    },
    slug: {
      type: 'string',
      required: true,
      validation: {
        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
      },
      description: 'URL-friendly version of the title',
      example: 'best-coffee-shops-philadelphia-2024'
    },
    canonicalUrl: {
      type: 'string',
      required: true,
      validation: {
        pattern: '^https?://[\\w\\d-]+(\\.[\\w\\d-]+)+(/[\\w\\d-]+)*/?$'
      },
      description: 'Canonical URL for this page',
      example: 'https://example.com/philadelphia/coffee-shops'
    },
    headings: {
      type: 'array',
      required: true,
      validation: {
        minItems: 1,
        itemSchema: {
          level: {
            type: 'number',
            min: 1,
            max: 6
          },
          text: {
            type: 'string',
            maxLength: 100
          }
        }
      },
      description: 'Page heading structure',
      example: [
        { level: 1, text: 'Best Coffee Shops in Philadelphia' },
        { level: 2, text: 'Top-Rated Local Cafes' }
      ]
    }
  },
  location: {
    city: {
      type: 'string',
      required: true,
      validation: {
        pattern: '^[A-Za-z\\s-]+$'
      },
      description: 'City name',
      example: 'Philadelphia'
    },
    state: {
      type: 'string',
      required: true,
      validation: {
        pattern: '^[A-Z]{2}$'
      },
      description: 'State abbreviation',
      example: 'PA'
    },
    stateFullName: {
      type: 'string',
      required: true,
      validation: {
        pattern: '^[A-Za-z\\s]+$'
      },
      description: 'Full state name',
      example: 'Pennsylvania'
    },
    region: {
      type: 'string',
      required: false,
      validation: {
        pattern: '^[A-Za-z\\s]+$'
      },
      description: 'Geographic region',
      example: 'Northeast'
    }
  },
  content: {
    mainContent: {
      type: 'richtext',
      required: true,
      validation: {
        minLength: 1000,
        maxLength: 10000
      },
      description: 'Main article content',
      example: '## Introduction\n\nPhiladelphia\'s coffee scene...'
    },
    excerpt: {
      type: 'string',
      required: true,
      validation: {
        maxLength: 200
      },
      description: 'Short article summary',
      example: 'Discover the top coffee shops in Philadelphia, from artisanal roasters to cozy cafes.'
    },
    images: {
      type: 'array',
      required: true,
      validation: {
        minItems: 1,
        itemSchema: {
          url: {
            type: 'string',
            pattern: '^https?://.+'
          },
          alt: {
            type: 'string',
            maxLength: 100
          },
          caption: {
            type: 'string',
            maxLength: 200
          }
        }
      },
      description: 'Article images',
      example: [
        {
          url: 'https://example.com/images/coffee-shop.jpg',
          alt: 'Interior of popular Philadelphia coffee shop',
          caption: 'Modern interior of Local Coffee Co.'
        }
      ]
    }
  },
  schema: {
    type: {
      type: 'string',
      required: true,
      validation: {
        enum: ['Article', 'BlogPosting', 'LocalBusiness', 'Product']
      },
      description: 'Schema.org type',
      example: 'Article'
    },
    properties: {
      type: 'object',
      required: true,
      validation: {
        required: ['headline', 'datePublished', 'author']
      },
      description: 'Schema.org properties',
      example: {
        headline: 'Best Coffee Shops in Philadelphia (2024)',
        datePublished: '2024-03-15T00:00:00Z',
        author: {
          '@type': 'Person',
          name: 'Local Expert'
        }
      }
    }
  }
};