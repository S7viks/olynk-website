import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<VercelResponse> {
  if (request.method !== 'GET' && request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const query = (request.query.query as string) || 'recent';
    const limit = Math.min(Number(request.query.limit) || 20, 100);
    const context = {
      query,
      limit,
      items: [] as unknown[],
    };
    return response.status(200).json(context);
  } catch (error) {
    console.error('memory/context error:', error);
    return response.status(500).json({
      error: 'Failed to get memory context',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
