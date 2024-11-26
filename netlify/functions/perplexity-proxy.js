import https from 'https';

export const handler = async function(event, context) {
  // Add CORS headers to all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const apiKey = process.env.VITE_PERPLEXITY_API_KEY;

    if (!apiKey) {
      console.error('Missing Perplexity API key in environment');
      throw new Error('Perplexity API key not configured');
    }

    if (!body.messages || !Array.isArray(body.messages)) {
      return {
        statusCode: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: 'Invalid request',
          message: 'Request must include messages array'
        })
      };
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
            console.log('Raw response data:', data);
            if (!data) {
              reject(new Error('Empty response from API'));
              return;
            }
            
            const parsedData = JSON.parse(data);
            console.log('API Response:', JSON.stringify(parsedData, null, 2));
            
            // Handle API error responses
            if (parsedData.error) {
              console.error('API Error:', parsedData.error);
              reject(new Error(parsedData.error.message || 'API Error'));
              return;
            }

            // Validate response structure
            if (!parsedData.choices?.[0]?.message?.content) {
              console.error('Invalid API response format:', parsedData);
              reject(new Error('Invalid API response format'));
              return;
            }

            // Extract the content from the message
            const content = parsedData.choices[0].message.content;
            
            resolve({
              statusCode: 200,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ content })
            });
          } catch (error) {
            console.error('Error parsing API response:', error);
            console.error('Raw data that failed to parse:', data);
            reject(new Error('Invalid response from API'));
          }
        });
      });

      req.on('error', (error) => {
        console.error('Request error:', error);
        reject(new Error('Failed to connect to Perplexity API'));
      });

      // Add request timeout
      req.setTimeout(30000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      // Write request body
      req.write(JSON.stringify(body));
      req.end();
    });

    return response;

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: error.statusCode || 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'API Error',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};
