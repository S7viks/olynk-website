import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<VercelResponse> {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const status = {
      ok: true,
      version: '1.0',
      services: {} as Record<string, { status: string }>,
      timestamp: new Date().toISOString(),
    };
    return response.status(200).json(status);
  } catch (error) {
    console.error('system-status error:', error);
    return response.status(500).json({
      error: 'Failed to get system status',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
