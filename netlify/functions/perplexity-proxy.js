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

    console.log('Request body:', JSON.stringify(body, null, 2));

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
          try {
            const parsedData = JSON.parse(data);
            console.log('API Response:', JSON.stringify(parsedData, null, 2));
            
            resolve({
              statusCode: res.statusCode,
              statusMessage: res.statusMessage,
              headers: res.headers,
              data: parsedData
            });
          } catch (error) {
            console.error('Failed to parse API response:', error);
            console.log('Raw response:', data);
            reject(new Error('Invalid JSON response from API'));
          }
        });
      });

      req.on('error', (error) => {
        console.error('Request error:', error);
        reject(error);
      });

      // Write request body and handle errors
      try {
        req.write(JSON.stringify(body));
        req.end();
      } catch (error) {
        console.error('Error writing request:', error);
        reject(error);
      }
    });

    // Handle non-200 responses
    if (response.statusCode !== 200) {
      console.error('API error response:', {
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        data: response.data
      });
      throw new Error(`API error: ${response.statusCode} ${response.statusMessage}`);
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
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString()
      })
    };
  }
};
