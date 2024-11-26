import type { ContentParams, GeneratedContent } from '../types/content';

const PERPLEXITY_API_ENDPOINT = '/api/perplexity-proxy';

interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateContentWithPerplexity(params: ContentParams): Promise<GeneratedContent> {
  try {
    const response = await fetch(PERPLEXITY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content writer specializing in preview articles. Your task is to generate high-quality, informative content that is engaging and SEO-optimized.'
          },
          {
            role: 'user',
            content: generatePrompt(params)
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        frequency_penalty: 1,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data: PerplexityResponse = await response.json();
    return parsePerplexityResponse(data, params);
  } catch (error) {
    console.error('Perplexity API error:', error);
    throw error;
  }
}

function generatePrompt(params: ContentParams): string {
  return `Create a comprehensive, informative article that thoroughly explains the topic. Include:
- Detailed overview
- Key concepts and explanations
- Expert insights
- Practical applications
- Best practices

Topic: ${JSON.stringify(params)}

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
}

function parsePerplexityResponse(response: PerplexityResponse, params: ContentParams): GeneratedContent {
  try {
    const content = response.choices[0].message.content;
    const parsedContent = JSON.parse(content);

    return {
      ...parsedContent.content,
      metadata: {
        ...parsedContent.content.seo,
        ...parsedContent.content.schema,
        source: 'perplexity-llama',
        model: 'llama-3.1-sonar-small-128k-online',
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error parsing Perplexity response:', error);
    throw new Error('Failed to parse Perplexity response');
  }
}

function generateFallbackContent(params: ContentParams): GeneratedContent {
  // Implement fallback content generation logic
  // This ensures the application continues working even if the API fails
  const { headline, location, keyword, year } = params;
  
  return {
    seo: {
      title: `${headline} in ${location.city} (${year})`,
      metaTitle: `${headline} | ${location.city} Guide ${year}`,
      metaDescription: `Discover the best ${keyword} in ${location.city}, ${location.stateFullName}. Expert local guide updated for ${year}.`,
      focusKeywords: [keyword, location.city, location.state, year]
    },
    content: {
      introduction: `Welcome to your comprehensive guide to ${keyword} in ${location.city}.`,
      mainContent: generateStructuredContent(params),
      sections: generateDefaultSections(params),
      conclusion: `Make the most of ${keyword} in ${location.city} with our expert recommendations.`
    },
    schema: generateDefaultSchema(params),
    localElements: generateLocalElements(params),
    metadata: {
      generatedAt: new Date().toISOString(),
      source: 'fallback-generator',
      params
    }
  };
}