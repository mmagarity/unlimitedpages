import type { ContentParams, GeneratedContent } from '../types';

const CLAUDE_API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

interface ClaudeResponse {
  content: string;
  metadata: Record<string, any>;
}

export async function generateContentWithClaude(params: ContentParams): Promise<GeneratedContent> {
  const prompt = generatePrompt(params);
  
  try {
    const response = await fetch(CLAUDE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY || '',
        'anthropic-version': '2024-01-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 4096,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    return parseClaudeResponse(data, params);
  } catch (error) {
    console.error('Claude API error:', error);
    return generateFallbackContent(params);
  }
}

function generatePrompt(params: ContentParams): string {
  const { headline, location, keyword, year, variations } = params;
  
  return `Generate comprehensive content for a local SEO article with the following parameters:

Headline: "${headline}"
Location: ${location.city}, ${location.state}
Main Keyword: ${keyword}
Year: ${year}
Variations: ${variations.map(v => v.type + ': ' + v.value).join(', ')}

Please provide the following in JSON format:

1. SEO Content:
   - Meta title (max 60 chars)
   - Meta description (max 155 chars)
   - Focus keywords
   - H1 heading
   - Section headings (H2)

2. Main Content:
   - Introduction (2-3 paragraphs)
   - Key sections with local details
   - Expert recommendations
   - Local insights
   - Conclusion

3. Schema Data:
   - Article schema
   - Local business references
   - Geographic targeting

4. Local Elements:
   - Area-specific details
   - Nearby locations
   - Local terminology

Ensure all content is:
- Unique and locally relevant
- Natural and engaging
- SEO-optimized
- Factually accurate
- Properly structured

Format the response as valid JSON with clear sections.`;
}

function parseClaudeResponse(response: ClaudeResponse, params: ContentParams): GeneratedContent {
  const { content } = response;
  const parsedContent = JSON.parse(content);

  return {
    seo: {
      title: parsedContent.seo.title,
      metaTitle: parsedContent.seo.metaTitle,
      metaDescription: parsedContent.seo.metaDescription,
      focusKeywords: parsedContent.seo.focusKeywords
    },
    content: {
      introduction: parsedContent.content.introduction,
      mainContent: parsedContent.content.mainContent,
      sections: parsedContent.content.sections,
      conclusion: parsedContent.content.conclusion
    },
    schema: parsedContent.schema,
    localElements: parsedContent.localElements,
    metadata: {
      generatedAt: new Date().toISOString(),
      source: 'claude-3-opus',
      params
    }
  };
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