import type { ArticleType } from '../types';

export const ARTICLE_TYPES: ArticleType[] = [
  {
    id: 'general',
    name: 'General Article',
    icon: 'FileText',
    description: 'Comprehensive articles covering various aspects of a topic',
    templates: [
      {
        id: 'general-complete',
        pattern: 'The Complete Guide to [keyword]',
        articleType: 'general',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'general-everything',
        pattern: 'Everything You Need to Know About [keyword]',
        articleType: 'general',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'general-understanding',
        pattern: 'Understanding [keyword]: A Guide',
        articleType: 'general',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'general-101',
        pattern: '[keyword] 101: Essential Information',
        articleType: 'general',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'general-ultimate',
        pattern: 'The Ultimate [keyword] Resource',
        articleType: 'general',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      }
    ]
  },
  {
    id: 'listicle',
    name: 'Listicle Article',
    icon: 'ListOrdered',
    description: 'Numbered lists featuring tips, examples, or items',
    templates: [
      {
        id: 'listicle-top',
        pattern: 'Top [number] [keyword]',
        articleType: 'listicle',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic'],
        numberOptions: [5, 10, 15, 20]
      },
      {
        id: 'listicle-best',
        pattern: '[number] Best [keyword]',
        articleType: 'listicle',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic'],
        numberOptions: [5, 10, 15, 20]
      },
      {
        id: 'listicle-must-try',
        pattern: '[number] Must-Try [keyword]',
        articleType: 'listicle',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic'],
        numberOptions: [5, 10, 15, 20]
      },
      {
        id: 'listicle-essential',
        pattern: '[number] Essential [keyword]',
        articleType: 'listicle',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic'],
        numberOptions: [5, 10, 15, 20]
      },
      {
        id: 'listicle-popular',
        pattern: 'The [number] Most Popular [keyword]',
        articleType: 'listicle',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic'],
        numberOptions: [5, 10, 15, 20]
      }
    ]
  },
  {
    id: 'howto',
    name: 'How-to Article',
    icon: 'HelpCircle',
    description: 'Step-by-step guides and tutorials',
    templates: [
      {
        id: 'howto-choose',
        pattern: 'How to Choose [keyword]',
        articleType: 'howto',
        prepositions: { location: 'in', demographic: 'as' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'howto-stepbystep',
        pattern: 'A Step-by-Step Guide to [keyword]',
        articleType: 'howto',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'howto-find',
        pattern: 'How to Find the Best [keyword]',
        articleType: 'howto',
        prepositions: { location: 'in', demographic: 'as' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'howto-select',
        pattern: 'Selecting [keyword]: A Guide',
        articleType: 'howto',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'howto-compare',
        pattern: 'How to Compare [keyword]',
        articleType: 'howto',
        prepositions: { location: 'in', demographic: 'as' },
        allowedVariations: ['location', 'demographic']
      }
    ]
  },
  {
    id: 'review',
    name: 'Review Article',
    icon: 'Star',
    description: 'In-depth product or service reviews',
    templates: [
      {
        id: 'review-best',
        pattern: 'Best [keyword] Reviews',
        articleType: 'review',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'review-expert',
        pattern: 'Expert Review: [keyword]',
        articleType: 'review',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'review-honest',
        pattern: 'Honest [keyword] Reviews',
        articleType: 'review',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'review-indepth',
        pattern: 'In-Depth [keyword] Review',
        articleType: 'review',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'review-ultimate',
        pattern: 'Ultimate [keyword] Review Guide',
        articleType: 'review',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      }
    ]
  },
  {
    id: 'comparison',
    name: 'Comparison Article',
    icon: 'ArrowLeftRight',
    description: 'Compare different options or alternatives',
    templates: [
      {
        id: 'comparison-best',
        pattern: 'Comparing the Best [keyword]',
        articleType: 'comparison',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'comparison-guide',
        pattern: '[keyword] Comparison Guide',
        articleType: 'comparison',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'comparison-faceoff',
        pattern: '[keyword] Face-Off',
        articleType: 'comparison',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'comparison-showdown',
        pattern: '[keyword] Showdown',
        articleType: 'comparison',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'comparison-versus',
        pattern: 'Which [keyword] is Best',
        articleType: 'comparison',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      }
    ]
  },
  {
    id: 'buying',
    name: 'Buying Guide',
    icon: 'ShoppingCart',
    description: 'Help users make purchasing decisions',
    templates: [
      {
        id: 'buying-guide',
        pattern: '[keyword] Buying Guide',
        articleType: 'buying',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'buying-how',
        pattern: 'How to Buy [keyword]',
        articleType: 'buying',
        prepositions: { location: 'in', demographic: 'as' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'buying-smart',
        pattern: 'Smart [keyword] Shopping Guide',
        articleType: 'buying',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'buying-complete',
        pattern: 'Complete [keyword] Shopping Guide',
        articleType: 'buying',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'buying-choose',
        pattern: 'How to Choose the Right [keyword]',
        articleType: 'buying',
        prepositions: { location: 'in', demographic: 'as' },
        allowedVariations: ['location', 'demographic']
      }
    ]
  },
  {
    id: 'problems',
    name: 'Problems & Solutions',
    icon: 'HelpCircle',
    description: 'Address common issues and their solutions',
    templates: [
      {
        id: 'problems-common',
        pattern: 'Common [keyword] Problems',
        articleType: 'problems',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'problems-solving',
        pattern: 'Solving [keyword] Challenges',
        articleType: 'problems',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'problems-troubleshooting',
        pattern: 'Troubleshooting [keyword]',
        articleType: 'problems',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'problems-solutions',
        pattern: '[keyword] Solutions',
        articleType: 'problems',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'problems-issues',
        pattern: '[number] [keyword] Issues to Avoid',
        articleType: 'problems',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic'],
        numberOptions: [5, 7, 10]
      }
    ]
  },
  {
    id: 'alternatives',
    name: 'Alternatives',
    icon: 'SwitchCamera',
    description: 'Explore alternative options and substitutes',
    templates: [
      {
        id: 'alternatives-best',
        pattern: 'Best [keyword] Alternatives',
        articleType: 'alternatives',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'alternatives-substitutes',
        pattern: '[number] [keyword] Substitutes',
        articleType: 'alternatives',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic'],
        numberOptions: [5, 7, 10]
      },
      {
        id: 'alternatives-replacements',
        pattern: '[keyword] Replacements',
        articleType: 'alternatives',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'alternatives-instead',
        pattern: 'Instead of [keyword]',
        articleType: 'alternatives',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      },
      {
        id: 'alternatives-options',
        pattern: 'Alternative [keyword] Options',
        articleType: 'alternatives',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic']
      }
    ]
  },
  {
    id: 'custom',
    name: 'Custom Template',
    icon: 'Settings',
    description: 'Create your own custom headline template',
    templates: [
      {
        id: 'custom-template',
        pattern: '[Custom Template]',
        articleType: 'custom',
        prepositions: { location: 'in', demographic: 'for' },
        allowedVariations: ['location', 'demographic', 'custom']
      }
    ]
  }
];