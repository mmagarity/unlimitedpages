const fetch = (await import('node-fetch')).default;

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;
    
    const body = JSON.parse(event.body);
    const apiKey = process.env.VITE_PERPLEXITY_API_KEY;

    if (!apiKey) {
      console.error('Missing API key in environment');
      throw new Error('API key not configured');
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Perplexity API error:', data);
      throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
    }

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};
