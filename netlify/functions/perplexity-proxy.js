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
    // Parse and validate request body
    let body;
    try {
      body = JSON.parse(event.body);
      console.log('Parsed request body:', JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: 'Invalid request body',
          details: parseError.message
        })
      };
    }

    // Validate API key
    const apiKey = process.env.VITE_PERPLEXITY_API_KEY;
    if (!apiKey) {
      console.error('Missing Perplexity API key in environment');
      return {
        statusCode: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: 'Configuration Error',
          message: 'API key not configured'
        })
      };
    }

    // Validate request structure
    if (!body.messages || !Array.isArray(body.messages)) {
      console.error('Invalid request structure:', body);
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
              console.error('Empty response from Perplexity API');
              reject(new Error('Empty response from API'));
              return;
            }

            let parsedData;
            try {
              parsedData = JSON.parse(data);
              console.log('Parsed API response:', JSON.stringify(parsedData, null, 2));
            } catch (parseError) {
              console.error('Failed to parse API response:', parseError);
              console.error('Raw data causing parse error:', data);
              reject(new Error('Failed to parse API response'));
              return;
            }

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

            // Extract and validate the content
            const content = parsedData.choices[0].message.content;
            console.log('Extracted content:', content);

            if (typeof content !== 'string') {
              console.error('Invalid content type:', typeof content);
              reject(new Error('Invalid content type in API response'));
              return;
            }

            // Try to parse the content as JSON if it looks like JSON
            let finalContent = content;
            if (content.trim().startsWith('{') && content.trim().endsWith('}')) {
              try {
                const contentObj = JSON.parse(content);
                if (typeof contentObj !== 'object' || !contentObj) {
                  throw new Error('Parsed content is not an object');
                }
                finalContent = contentObj.content || contentObj;
                console.log('Parsed content as JSON:', finalContent);
              } catch (contentParseError) {
                console.error('Content JSON parse failed:', contentParseError);
                console.error('Raw content that failed to parse:', content);
              }
            }

            resolve({
              statusCode: 200,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ content: finalContent })
            });
          } catch (error) {
            console.error('Error in response processing:', error);
            reject(new Error('Failed to process API response'));
          }
        });
      });

      req.on('error', (error) => {
        console.error('Request error:', error);
        reject(new Error('Failed to connect to Perplexity API'));
      });

      // Add request timeout
      req.setTimeout(30000, () => {
        console.error('Request timeout');
        req.destroy();
        reject(new Error('Request timeout'));
      });

      // Write request body and handle potential errors
      try {
        const requestBody = JSON.stringify(body);
        console.log('Sending request body:', requestBody);
        req.write(requestBody);
        req.end();
      } catch (error) {
        console.error('Error writing request body:', error);
        reject(new Error('Failed to send request body'));
      }
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
