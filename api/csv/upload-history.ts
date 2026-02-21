import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<VercelResponse> {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const limit = Math.min(Number(request.query.limit) || 10, 100);
    const history: Array<{ id: string; filename: string; uploadedAt: string; rowCount?: number }> = [];
    return response.status(200).json(history);
  } catch (error) {
    console.error('upload-history error:', error);
    return response.status(500).json({
      error: 'Failed to get upload history',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
