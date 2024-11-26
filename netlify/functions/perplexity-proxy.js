import https from 'https';
import fs from 'fs';
import path from 'path';

// Add logging function
const log = (message, type = 'info') => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${type.toUpperCase()}] ${message}\n`;
  
  // Log to console
  console.log(logMessage);
  
  // In development, also log to file
  if (process.env.NODE_ENV === 'development') {
    const logDir = path.join(__dirname, '../../logs');
    const logFile = path.join(logDir, 'perplexity-proxy.log');
    
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Append to log file
    fs.appendFileSync(logFile, logMessage);
  }
};

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
      // Format the topic properly if it's an object
      if (body.messages && Array.isArray(body.messages)) {
        body.messages = body.messages.map(msg => {
          if (msg.content && msg.content.includes('Topic: [object Object]')) {
            // Extract the actual topic from the request
            const topicMatch = msg.content.match(/Topic:\s*(.+?)\n/);
            if (topicMatch) {
              const topic = topicMatch[1];
              try {
                const parsedTopic = JSON.parse(topic);
                msg.content = msg.content.replace(
                  /Topic:\s*.+?\n/,
                  `Topic: ${parsedTopic.baseHeadline || topic}\n`
                );
              } catch (e) {
                // If parsing fails, leave as is
                console.log('Failed to parse topic:', e);
              }
            }
          }
          return msg;
        });
      }
      log('Parsed and formatted request body: ' + JSON.stringify(body, null, 2));
    } catch (parseError) {
      log('Failed to parse request body: ' + parseError, 'error');
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
      log('Missing Perplexity API key in environment', 'error');
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
      log('Invalid request structure: ' + JSON.stringify(body), 'error');
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
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
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
            log('Raw response data: ' + data);
            
            // Check for non-200 status code
            if (res.statusCode !== 200) {
              log(`API returned status ${res.statusCode}: ${data}`, 'error');
              reject(new Error(`API returned status ${res.statusCode}: ${data}`));
              return;
            }

            if (!data) {
              log('Empty response from Perplexity API', 'error');
              reject(new Error('Empty response from API'));
              return;
            }

            let parsedData;
            try {
              parsedData = JSON.parse(data);
              log('Parsed API response: ' + JSON.stringify(parsedData, null, 2));
            } catch (parseError) {
              log('Failed to parse API response: ' + parseError, 'error');
              log('Raw data causing parse error: ' + data, 'error');
              reject(new Error('Failed to parse API response'));
              return;
            }

            // Handle API error responses
            if (parsedData.error) {
              log('API Error: ' + JSON.stringify(parsedData.error), 'error');
              reject(new Error(parsedData.error.message || 'API Error'));
              return;
            }

            // Validate response structure
            if (!parsedData.choices?.[0]?.message?.content) {
              log('Invalid API response format: ' + JSON.stringify(parsedData), 'error');
              reject(new Error('Invalid API response format'));
              return;
            }

            // Extract and validate the content
            const content = parsedData.choices[0].message.content;
            log('Extracted content: ' + content);

            if (typeof content !== 'string') {
              log('Invalid content type: ' + typeof content, 'error');
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
                log('Parsed content as JSON: ' + JSON.stringify(finalContent, null, 2));
              } catch (contentParseError) {
                log('Content JSON parse failed: ' + contentParseError, 'error');
                log('Raw content that failed to parse: ' + content, 'error');
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
            log('Error in response processing: ' + error, 'error');
            reject(new Error('Failed to process API response'));
          }
        });
      });

      req.on('error', (error) => {
        log('Request error: ' + error, 'error');
        reject(new Error('Failed to connect to Perplexity API'));
      });

      // Add request timeout
      req.setTimeout(30000, () => {
        log('Request timeout', 'error');
        req.destroy();
        reject(new Error('Request timeout'));
      });

      // Write request body and handle potential errors
      try {
        const requestBody = JSON.stringify(body);
        log('Sending request body: ' + requestBody);
        req.write(requestBody);
        req.end();
      } catch (error) {
        log('Error writing request body: ' + error, 'error');
        reject(new Error('Failed to send request body'));
      }
    });

    return response;

  } catch (error) {
    log('Function error: ' + error, 'error');
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
