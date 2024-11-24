import { API_CONFIG } from '../config/api';

// Update API endpoint to use Netlify function
const PERPLEXITY_ENDPOINT = '/.netlify/functions/perplexity-proxy';

const ARTICLE_TYPE_PROMPTS = {
  general: `Create a comprehensive, informative article that thoroughly explains the topic. Include:
- Detailed overview
- Key concepts and explanations
- Expert insights
- Practical applications
- Best practices`,

  listicle: `Create a structured list-based article that covers key points. Include:
- Brief introduction explaining the list's value
- Numbered items (5-20 depending on scope)
- Detailed explanation for each item
- Practical examples
- Tips for implementation`,

  howto: `Create a detailed step-by-step guide that teaches the reader. Include:
- Prerequisites or requirements
- Clear, numbered steps
- Tips and warnings for each step
- Common mistakes to avoid
- Expected outcomes
- Troubleshooting tips`,

  review: `Create a thorough review that evaluates the subject. Include:
- Overview of what's being reviewed
- Key features and benefits
- Pros and cons analysis
- Performance evaluation
- Comparison with alternatives
- Final verdict and rating`,

  comparison: `Create a detailed comparison that helps readers make decisions. Include:
- Key differences and similarities
- Feature-by-feature analysis
- Use case scenarios
- Pros and cons for each option
- Recommendations for different needs`,

  buying: `Create a comprehensive buying guide that helps make purchase decisions. Include:
- Key factors to consider
- Feature explanations
- Price range analysis
- Top recommendations
- Common pitfalls to avoid`,

  problems: `Create a thorough guide addressing common issues and solutions. Include:
- Problem identification
- Root cause analysis
- Step-by-step solutions
- Prevention tips
- When to seek professional help`,

  alternatives: `Create a comprehensive guide about alternative options. Include:
- Why alternatives are needed
- Detailed analysis of each alternative
- Comparative strengths and weaknesses
- Best use cases for each
- Implementation considerations`,

  custom: `Create a detailed article following the custom template structure. Include:
- Comprehensive coverage of the topic
- Relevant examples and applications
- Expert insights and recommendations
- Practical implementation tips`
};

interface LocationData {
  city: string;
  state: string;
  population?: number;
  region?: string;
  landmarks?: string[];
}

const LOCATION_SENSITIVE_TYPES = ['coffee_shops', 'restaurants', 'bars', 'gyms', 'hotels', 'activities', 'attractions'];

async function isLocationSensitive(articleType: string, headline: string): Promise<boolean> {
  // Check if the article type is inherently location-sensitive
  if (LOCATION_SENSITIVE_TYPES.includes(articleType)) return true;
  
  // Check headline for location-related keywords
  const locationKeywords = ['in', 'near', 'around', 'best', 'top', 'local'];
  return locationKeywords.some(keyword => headline.toLowerCase().includes(keyword));
}

async function generateLocationSpecificContent(
  headline: string, 
  articleType: string, 
  location: LocationData
): Promise<PerplexityResponse> {
  const locationContext = `
Location Context:
- City: ${location.city}
- State: ${location.state}
${location.population ? `- Population: ${location.population}` : ''}
${location.region ? `- Region: ${location.region}` : ''}
${location.landmarks ? `- Notable Landmarks: ${location.landmarks.join(', ')}` : ''}

Please ensure all content is specifically relevant to ${location.city}, ${location.state}. Include:
1. Local context and characteristics
2. Specific locations and addresses where applicable
3. Regional considerations and preferences
4. Local cultural elements and trends
5. Area-specific recommendations`;

  const typePrompt = ARTICLE_TYPE_PROMPTS[articleType as keyof typeof ARTICLE_TYPE_PROMPTS] || ARTICLE_TYPE_PROMPTS.general;

  const prompt = `Generate location-specific content for a "${articleType}" article with the headline: "${headline.replace('[City]', location.city)}"

${locationContext}

Article Type Instructions:
${typePrompt}

General Instructions:
1. Write in a natural, engaging style
2. Include specific, detailed information about ${location.city}
3. Maintain a professional yet conversational tone
4. Structure the content for web readability
5. Optimize for local SEO

Required Format (return as JSON):
{
  "content": {
    "title": "Article title (max 60 chars)",
    "sections": {
      "introduction": "2-3 paragraphs introducing the topic with local context",
      "mainContent": [
        "Multiple paragraphs with location-specific content",
        "Each array item should be a complete section with local details"
      ],
      "conclusion": "Strong concluding paragraph with local relevance"
    },
    "seo": {
      "metaTitle": "Location-optimized title (max 60 chars)",
      "metaDescription": "Location-specific meta description (max 155 chars)",
      "focusKeywords": ["keyword1", "keyword2", "keyword3"],
      "slug": "url-friendly-version-of-title",
      "canonicalUrl": "/guides/[location-slug]/[content-slug]",
      "ogTitle": "Social media optimized title with location",
      "ogDescription": "Social media optimized description"
    },
    "schema": {
      "type": "Article",
      "data": {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Location-specific headline",
        "description": "Location-specific description",
        "articleType": "${articleType}",
        "keywords": ["keyword1", "keyword2", "keyword3"],
        "datePublished": "${new Date().toISOString()}",
        "dateModified": "${new Date().toISOString()}",
        "locationCreated": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "${location.city}",
            "addressRegion": "${location.state}",
            "addressCountry": "US"
          }
        }
      }
    }
  }
}`;

  // Make API call with location-specific prompt
  try {
    const response = await fetch(PERPLEXITY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-2.1',
        messages: [
          {
            role: 'system',
            content: `You are an expert content writer specializing in creating location-specific content for ${location.city}, ${location.state}. Your content is well-researched, locally relevant, and optimized for both readers and search engines.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4096,
        temperature: 0.7,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Perplexity API error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      
      if (process.env.NODE_ENV === 'development') {
        return mockPerplexityResponse(headline);
      }
      
      throw new Error(
        `Content generation failed: ${errorData?.error || response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Raw API response:', data);

    if (!data || typeof data !== 'object') {
      console.error('Invalid response data:', data);
      throw new Error('Invalid response format from API');
    }

    const content = data.choices?.[0]?.message?.content;
    console.log('Content from response:', content);
    
    if (!content || typeof content !== 'string') {
      console.error('Invalid content format:', content);
      throw new Error('Invalid content format in API response');
    }

    try {
      const parsedContent = JSON.parse(content);
      console.log('Parsed content:', parsedContent);
      return parsedContent;
    } catch (error) {
      console.error('Failed to parse content:', error);
      console.error('Content that failed to parse:', content);
      throw new Error('Failed to parse API response content');
    }
  } catch (error) {
    console.error('Error generating content with Perplexity:', error);
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock response in development');
      return mockPerplexityResponse(headline);
    }
    throw error;
  }
}

interface PerplexityResponse {
  content: {
    title: string;
    sections: {
      introduction: string;
      mainContent: string[];
      conclusion: string;
    };
    seo: {
      metaTitle: string;
      metaDescription: string;
      focusKeywords: string[];
      slug: string;
      canonicalUrl: string;
      ogTitle: string;
      ogDescription: string;
    };
    schema: {
      type: string;
      data: {
        "@context": string;
        "@type": string;
        headline: string;
        description: string;
        articleType: string;
        keywords: string[];
        datePublished: string;
        dateModified: string;
      };
    };
    images?: {
      url: string;
      alt: string;
      caption: string;
      placement: 'introduction' | 'middle' | 'conclusion';
    }[];
    citations?: {
      url: string;
      title?: string;
      source?: string;
    }[];
  };
}

interface DynamicVariables {
  year?: number;
  location?: {
    city?: string;
    state?: string;
    region?: string;
    country?: string;
  };
  demographic?: {
    age?: string;
    gender?: string;
    profession?: string;
    interest?: string;
  };
}

// Utility to check if content needs location-specific generation
function needsLocationSpecificContent(content: string, location: DynamicVariables['location']): boolean {
  const locationTerms = [
    'local regulations',
    'state laws',
    'regional requirements',
    'climate considerations',
    'weather patterns',
    'zoning laws',
    'municipal codes'
  ];
  
  return locationTerms.some(term => content.toLowerCase().includes(term));
}

// Smart content variation with dynamic variable insertion
export async function generateVariation(
  baseContent: PerplexityResponse,
  variables: DynamicVariables,
  forceNewGeneration: boolean = false
): Promise<PerplexityResponse> {
  // Create a deep copy of the base content
  const newContent = JSON.parse(JSON.stringify(baseContent)) as PerplexityResponse;
  const { year, location, demographic } = variables;

  // Check if we need location-specific content generation
  const needsLocationContent = location && (
    forceNewGeneration || 
    needsLocationSpecificContent(JSON.stringify(baseContent), location)
  );

  if (needsLocationContent) {
    // Generate new content with location-specific information
    return generateWithPerplexity(
      newContent.content.title,
      newContent.content.schema.data.articleType,
      {
        city: location.city,
        state: location.state,
        country: location.country || 'United States'
      }
    );
  }

  // Dynamic variable replacement functions
  const replacements: Record<string, (text: string) => string> = {
    year: (text: string) => {
      if (!year) return text;
      // Replace year references
      return text
        .replace(/\b(20\d{2})\b/g, year.toString())
        .replace(/\b(current year|this year)\b/gi, year.toString());
    },
    location: (text: string) => {
      if (!location) return text;
      const { city, state, region, country } = location;
      
      let result = text;
      if (city) {
        result = result
          .replace(/\b(your city|the city|this city)\b/gi, city)
          .replace(/\b(local|locally)\b/gi, `in ${city}`);
      }
      if (state) {
        result = result
          .replace(/\b(your state|the state)\b/gi, state)
          .replace(/\b(state-wide|statewide)\b/gi, `across ${state}`);
      }
      if (region) {
        result = result.replace(/\b(the region|this region)\b/gi, region);
      }
      if (country) {
        result = result.replace(/\b(the country|this country)\b/gi, country);
      }
      return result;
    },
    demographic: (text: string) => {
      if (!demographic) return text;
      const { age, gender, profession, interest } = demographic;
      
      let result = text;
      if (age) {
        result = result
          .replace(/\b(people|individuals|users)\b/gi, `${age}-year-olds`)
          .replace(/\b(everyone|anybody)\b/gi, `${age}-year-olds`);
      }
      if (gender) {
        result = result
          .replace(/\b(people|individuals|users)\b/gi, gender)
          .replace(/\b(everyone|anybody)\b/gi, gender);
      }
      if (profession) {
        result = result
          .replace(/\b(people|individuals|users)\b/gi, profession)
          .replace(/\b(everyone|anybody)\b/gi, profession);
      }
      if (interest) {
        result = result
          .replace(/\b(enthusiasts|hobbyists|fans)\b/gi, `${interest} enthusiasts`)
          .replace(/\b(people interested|individuals interested)\b/gi, `people interested in ${interest}`);
      }
      return result;
    }
  };

  // Apply dynamic replacements to content sections
  const applyReplacements = (text: string): string => {
    return Object.values(replacements).reduce((acc, fn) => fn(acc), text);
  };

  // Update content sections
  newContent.content.sections.introduction = applyReplacements(
    newContent.content.sections.introduction
  );
  newContent.content.sections.mainContent = newContent.content.sections.mainContent.map(
    section => applyReplacements(section)
  );
  newContent.content.sections.conclusion = applyReplacements(
    newContent.content.sections.conclusion
  );

  // Update metadata
  const locationStr = location 
    ? [location.city, location.state, location.country].filter(Boolean).join(', ')
    : '';
  const demographicStr = demographic
    ? [demographic.age, demographic.gender, demographic.profession, demographic.interest]
        .filter(Boolean)
        .join(' ')
    : '';
  const yearStr = year ? `${year} ` : '';

  // Update SEO metadata
  newContent.content.seo = {
    ...newContent.content.seo,
    metaTitle: applyReplacements(newContent.content.seo.metaTitle),
    metaDescription: applyReplacements(newContent.content.seo.metaDescription),
    focusKeywords: [
      ...newContent.content.seo.focusKeywords,
      ...(locationStr ? [locationStr] : []),
      ...(demographicStr ? [demographicStr] : []),
      ...(yearStr ? [yearStr.trim()] : [])
    ],
    slug: generateSlug(newContent.content.seo.metaTitle, variables),
    canonicalUrl: generateCanonicalUrl(newContent.content.seo.canonicalUrl, variables),
    ogTitle: applyReplacements(newContent.content.seo.ogTitle),
    ogDescription: applyReplacements(newContent.content.seo.ogDescription)
  };

  // Update schema data
  newContent.content.schema.data = {
    ...newContent.content.schema.data,
    headline: applyReplacements(newContent.content.schema.data.headline),
    description: applyReplacements(newContent.content.schema.data.description),
    keywords: [
      ...newContent.content.schema.data.keywords,
      ...(locationStr ? [locationStr] : []),
      ...(demographicStr ? [demographicStr] : []),
      ...(yearStr ? [yearStr.trim()] : [])
    ]
  };

  return newContent;
}

// Helper function to generate SEO-friendly slug
function generateSlug(title: string, variables: DynamicVariables): string {
  const { year, location, demographic } = variables;
  const parts = [
    year,
    location?.city,
    location?.state,
    demographic?.profession,
    demographic?.interest,
    title
  ]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  return parts;
}

// Helper function to generate canonical URL
function generateCanonicalUrl(baseUrl: string, variables: DynamicVariables): string {
  const slug = generateSlug('', variables);
  return `${baseUrl}${slug ? `/${slug}` : ''}`;
}

interface LocationContext {
  city?: string;
  state?: string;
  location?: string;
}

export async function generateWithPerplexity(
  headline: string,
  type: string = 'general',
  locationContext?: LocationContext
): Promise<PerplexityResponse> {
  try {
    const prompt = `${ARTICLE_TYPE_PROMPTS[type as keyof typeof ARTICLE_TYPE_PROMPTS] || ARTICLE_TYPE_PROMPTS.general}

Topic: ${headline}
${locationContext ? `Location: ${[locationContext.city, locationContext.state].filter(Boolean).join(', ')}` : ''}

Please generate a comprehensive article that includes:
1. A compelling title
2. An engaging introduction
3. Detailed main content sections
4. A strong conclusion
5. SEO metadata and schema markup

Format the response as a JSON object with the following structure:
{
  "content": {
    "title": "string",
    "sections": {
      "introduction": "string",
      "mainContent": ["string"],
      "conclusion": "string"
    },
    "seo": {
      "metaTitle": "string",
      "metaDescription": "string",
      "focusKeywords": ["string"],
      "slug": "string",
      "canonicalUrl": "string",
      "ogTitle": "string",
      "ogDescription": "string"
    },
    "schema": {
      "type": "Article",
      "data": {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "string",
        "description": "string",
        "articleType": "string",
        "keywords": ["string"],
        "datePublished": "string",
        "dateModified": "string"
      }
    }
  }
}`;

    // Make API call
    const response = await fetch(PERPLEXITY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-2.1',
        messages: [
          {
            role: 'system',
            content: `You are an expert content writer specializing in ${type} articles. Your task is to generate high-quality, informative content that is engaging and SEO-optimized.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4096,
        temperature: 0.7,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Perplexity API error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      
      if (process.env.NODE_ENV === 'development') {
        return mockPerplexityResponse(headline);
      }
      
      throw new Error(
        `Content generation failed: ${errorData?.error || response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Raw API response:', data);

    if (!data || typeof data !== 'object') {
      console.error('Invalid response data:', data);
      throw new Error('Invalid response format from API');
    }

    const content = data.choices?.[0]?.message?.content;
    console.log('Content from response:', content);
    
    if (!content || typeof content !== 'string') {
      console.error('Invalid content format:', content);
      throw new Error('Invalid content format in API response');
    }

    try {
      const parsedContent = JSON.parse(content);
      console.log('Parsed content:', parsedContent);
      return parsedContent;
    } catch (error) {
      console.error('Failed to parse content:', error);
      console.error('Content that failed to parse:', content);
      throw new Error('Failed to parse API response content');
    }
  } catch (error) {
    console.error('Error generating content with Perplexity:', error);
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock response in development');
      return mockPerplexityResponse(headline);
    }
    throw error;
  }
}

// Update the mock response to include images and citations
function mockPerplexityResponse(headline: string): PerplexityResponse {
  return {
    content: {
      title: `Mock Article: ${headline}`,
      sections: {
        introduction: "This is a mock introduction paragraph...",
        mainContent: [
          "This is the first main content section...",
          "This is the second main content section..."
        ],
        conclusion: "This is the mock conclusion paragraph..."
      },
      images: [
        {
          url: "https://via.placeholder.com/800x400?text=Introduction+Image",
          alt: "Introduction section image",
          caption: "A compelling introduction image",
          placement: "introduction"
        },
        {
          url: "https://via.placeholder.com/800x400?text=Middle+Image",
          alt: "Middle section image",
          caption: "An engaging middle section image",
          placement: "middle"
        },
        {
          url: "https://via.placeholder.com/800x400?text=Conclusion+Image",
          alt: "Conclusion section image",
          caption: "A powerful conclusion image",
          placement: "conclusion"
        }
      ],
      citations: [
        {
          url: "https://example.com/source1",
          title: "Mock Source 1",
          source: "example.com"
        },
        {
          url: "https://example.com/source2",
          title: "Mock Source 2",
          source: "example.com"
        }
      ],
      seo: {
        metaTitle: `Mock SEO Title: ${headline}`,
        metaDescription: "This is a mock meta description...",
        focusKeywords: ["mock", "test", "example"],
        slug: "mock-article-slug",
        canonicalUrl: "/guides/mock-article-slug",
        ogTitle: `Mock Social Title: ${headline}`,
        ogDescription: "This is a mock social description..."
      },
      schema: {
        type: "Article",
        data: {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: headline,
          description: "Mock article description",
          articleType: "general",
          keywords: ["mock", "test", "example"],
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString()
        }
      }
    }
  };
}