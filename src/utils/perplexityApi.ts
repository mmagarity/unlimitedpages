import type { ContentRequest, GeneratedArticle, Location } from '../types/content';
import { contentCache } from './contentCache';

const PERPLEXITY_API_ENDPOINT = 'https://api.perplexity.ai/v1/generate';

// Generate base template that can be reused across variations
async function generateBaseTemplate(topic: string): Promise<any> {
  // Try to get from cache first
  const cachedTemplate = await contentCache.getTemplate(topic);
  if (cachedTemplate) {
    return cachedTemplate;
  }

  try {
    const response = await fetch(PERPLEXITY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content strategist. Create a detailed, dynamic template that can be used to generate location-specific articles.'
          },
          {
            role: 'user',
            content: `Create a dynamic template for articles about ${topic}.

Required Template Components:
1. Article Structure (with placeholders)
2. Key Sections
3. Dynamic Elements
4. SEO Patterns
5. CMS Field Mappings

The template should be designed to:
- Allow easy location substitution
- Support demographic customization
- Include dynamic fact patterns
- Enable SEO optimization
- Map to CMS fields

Format the response as a structured JSON template with clear placeholders and variation points.`
          }
        ],
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data = await response.json();
    const template = JSON.parse(data.content);
    
    // Cache the template for future use
    contentCache.setTemplate(topic, template);
    
    return template;
  } catch (error) {
    console.error('Template generation error:', error);
    throw error;
  }
}

// Generate location-specific facts and details
async function generateLocationDetails(location: Location): Promise<any> {
  // Try to get from cache first
  const cachedDetails = await contentCache.getLocationDetails(location);
  if (cachedDetails) {
    return cachedDetails;
  }

  try {
    const response = await fetch(PERPLEXITY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b',
        messages: [
          {
            role: 'system',
            content: 'You are a local expert. Provide specific, factual details about this location.'
          },
          {
            role: 'user',
            content: `Provide key details about ${location.city}, ${location.state}.

Required Information:
1. Demographics
2. Local Landmarks
3. Notable Features
4. Business Districts
5. Cultural Elements
6. Recent Developments

Format the response as structured JSON with categorized facts.`
          }
        ],
        max_tokens: 512,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data = await response.json();
    const details = JSON.parse(data.content);
    
    // Cache the location details
    contentCache.setLocationDetails(location, details);
    
    return details;
  } catch (error) {
    console.error('Location details generation error:', error);
    throw error;
  }
}

// Generate demographic variations
async function generateDemographicPatterns(demographic: string): Promise<any> {
  // Try to get from cache first
  const cachedPatterns = await contentCache.getDemographicPatterns(demographic);
  if (cachedPatterns) {
    return cachedPatterns;
  }

  try {
    const response = await fetch(PERPLEXITY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b',
        messages: [
          {
            role: 'system',
            content: 'You are a demographic expert. Create patterns for customizing content for specific audiences.'
          },
          {
            role: 'user',
            content: `Create content customization patterns for the ${demographic} demographic.

Required Patterns:
1. Language Style
2. Content Focus
3. Value Propositions
4. Common Pain Points
5. Preferred Solutions

Format the response as a JSON pattern guide.`
          }
        ],
        max_tokens: 512,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data = await response.json();
    const patterns = JSON.parse(data.content);
    
    // Cache the demographic patterns
    contentCache.setDemographicPatterns(demographic, patterns);
    
    return patterns;
  } catch (error) {
    console.error('Demographic patterns generation error:', error);
    throw error;
  }
}

// Main content generation function
export async function generateArticleContent(request: ContentRequest): Promise<GeneratedArticle> {
  try {
    // Step 1: Generate or retrieve base template (cache this!)
    const baseTemplate = await generateBaseTemplate(request.topic);
    
    // Step 2: Get location-specific details (cache per location!)
    const locationDetails = await generateLocationDetails(request.location);
    
    // Step 3: Get demographic patterns (cache per demographic!)
    const demographicPatterns = request.demographic ? 
      await generateDemographicPatterns(request.demographic) : null;

    // Step 4: Generate final article by combining all components
    const article = await generateFinalArticle(request, baseTemplate, locationDetails, demographicPatterns);
    
    return article;
  } catch (error) {
    console.error('Content generation error:', error);
    throw error;
  }
}

// Generate final article by combining components
async function generateFinalArticle(
  request: ContentRequest,
  baseTemplate: any,
  locationDetails: any,
  demographicPatterns: any | null
): Promise<GeneratedArticle> {
  try {
    const response = await fetch(PERPLEXITY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b',
        messages: [
          {
            role: 'system',
            content: 'You are a content assembler. Create the final article by combining the template with specific details.'
          },
          {
            role: 'user',
            content: `Create a final article using:

Base Template: ${JSON.stringify(baseTemplate)}
Location Details: ${JSON.stringify(locationDetails)}
${demographicPatterns ? `Demographic Patterns: ${JSON.stringify(demographicPatterns)}` : ''}

Requirements:
- Use the template structure
- Insert location-specific details
- Apply demographic customizations if provided
- Ensure natural flow
- Optimize for SEO
- Map to CMS fields

Format the response as a complete article in JSON format.`
          }
        ],
        max_tokens: 2048,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.content);

    return {
      metadata: {
        generatedAt: new Date().toISOString(),
        location: request.location,
        topic: request.topic,
        demographic: request.demographic,
        year: request.year
      },
      content: {
        title: content.title,
        introduction: content.introduction,
        mainContent: content.mainContent,
        sections: content.sections,
        conclusion: content.conclusion,
        expertTips: content.expertTips,
        localInsights: content.localInsights
      },
      seo: {
        metaTitle: content.seo.metaTitle,
        metaDescription: content.seo.metaDescription,
        focusKeywords: content.seo.focusKeywords,
        headings: content.seo.headings
      },
      template: baseTemplate,
      locationDetails,
      demographicPatterns,
      images: [],
      internalLinks: [],
      publishingSchedule: null
    };
  } catch (error) {
    console.error('Final article generation error:', error);
    throw error;
  }
}