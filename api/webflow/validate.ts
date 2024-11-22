import type { VercelRequest, VercelResponse } from '@vercel/node';
import { WebflowService } from '../../services/WebflowService';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { apiKey, siteId, collectionId } = req.body;

  if (!apiKey || !siteId || !collectionId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const isValid = await WebflowService.validateCredentials({
      apiKey,
      siteId,
      collectionId
    });

    return res.json({ isValid });
  } catch (error) {
    console.error('Validation error:', error);
    return res.status(500).json({ error: 'Failed to validate credentials' });
  }
}