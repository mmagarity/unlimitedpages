const https = require('https');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const body = JSON.parse(event.body);
    const apiKey = process.env.VITE_PERPLEXITY_API_KEY;

    if (!apiKey) {
      console.error('Missing API key in environment');
      throw new Error('API key not configured');
    }

    // Create the request options
    const options = {
      hostname: 'api.perplexity.ai',
      path: '/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    };

    // Make the request using a Promise wrapper
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            headers: res.headers,
            data: JSON.parse(data)
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      // Write request body
      req.write(JSON.stringify(body));
      req.end();
    });

    // Handle non-200 responses
    if (response.statusCode !== 200) {
      console.error('Perplexity API error:', response.data);
      throw new Error(`Perplexity API error: ${response.statusCode} ${response.statusMessage}`);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(response.data)
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
