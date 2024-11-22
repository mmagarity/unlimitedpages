import { API_CONFIG } from '../config/api';

if (!import.meta.env.VITE_PERPLEXITY_API_KEY) {
  throw new Error('Missing environment variable: VITE_PERPLEXITY_API_KEY');
}

const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
const PERPLEXITY_ENDPOINT = import.meta.env.VITE_PERPLEXITY_API_ENDPOINT || 'https://api.perplexity.ai/v1/generate';

interface PerplexityResponse {
  content: {
    title: string;
    sections: string[];
    content: string;
    localInsights: string[];
    expertTips: string[];
  };
}

export async function generateWithPerplexity(prompt: string): Promise<PerplexityResponse> {
  if (import.meta.env.DEV && !import.meta.env.VITE_FORCE_REAL_API) {
    console.log('Using mock Perplexity response in development');
    return mockPerplexityResponse(prompt);
  }

  try {
    const response = await fetch(PERPLEXITY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b',
        messages: [
          {
            role: 'system',
            content: 'You are a local expert content writer specializing in detailed, engaging articles.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `Perplexity API error: ${response.status} ${response.statusText}${
          errorData ? ` - ${JSON.stringify(errorData)}` : ''
        }`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Perplexity API call failed:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to generate content: ${error.message}`
        : 'Failed to generate content'
    );
  }
}

function mockPerplexityResponse(prompt: string): PerplexityResponse {
  console.log('Mock prompt received:', prompt);
  return {
    content: {
      title: 'Sample Article',
      sections: ['Introduction', 'Main Content', 'Conclusion'],
      content: `This is a sample article generated for development.\nPrompt used: ${prompt}`,
      localInsights: ['Local insight 1', 'Local insight 2'],
      expertTips: ['Expert tip 1', 'Expert tip 2']
    }
  };
}