import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<VercelResponse> {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const expenses: unknown[] = [];
    return response.status(200).json(expenses);
  } catch (error) {
    console.error('expenses error:', error);
    return response.status(500).json({
      error: 'Failed to get expenses',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
