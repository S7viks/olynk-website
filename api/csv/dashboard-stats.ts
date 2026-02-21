import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<VercelResponse> {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stats = {
      totalUploads: 0,
      totalRows: 0,
      lastUploadAt: null as string | null,
      filesProcessed: 0,
    };
    return response.status(200).json(stats);
  } catch (error) {
    console.error('dashboard-stats error:', error);
    return response.status(500).json({
      error: 'Failed to get dashboard stats',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
