/**
 * Utility functions for API error handling and validation
 */

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function validateConfig(config: Record<string, any>, requiredKeys: string[]) {
  const missing = requiredKeys.filter(key => !config[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required configuration: ${missing.join(', ')}`);
  }
}

export async function handleAPIResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new APIError(
      error.message || response.statusText,
      response.status,
      error.code
    );
  }
  return response.json();
}

export function retryWithBackoff(
  fn: () => Promise<any>,
  maxRetries = 3,
  baseDelay = 1000
) {
  return new Promise((resolve, reject) => {
    const attempt = async (retryCount: number) => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        if (retryCount === maxRetries) {
          reject(error);
          return;
        }
        const delay = baseDelay * Math.pow(2, retryCount);
        setTimeout(() => attempt(retryCount + 1), delay);
      }
    };
    attempt(0);
  });
}