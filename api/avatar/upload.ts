import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<VercelResponse> {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get filename from query parameters
    const filename = request.query.filename as string;

    if (!filename) {
      return response.status(400).json({ error: 'Filename is required' });
    }

    // For Vercel Functions, the request body for file uploads comes as a Buffer
    // when the Content-Type is application/octet-stream or similar binary types
    let body: Buffer | undefined;

    if (Buffer.isBuffer(request.body)) {
      body = request.body;
    } else if (typeof request.body === 'string') {
      // If it's a string, convert to Buffer (base64 or binary)
      body = Buffer.from(request.body, 'binary');
    } else {
      // If body is not a Buffer or string, it might be parsed JSON
      // This shouldn't happen for file uploads, but handle it gracefully
      return response.status(400).json({ 
        error: 'Invalid file format. Please send the file as binary data.' 
      });
    }

    if (!body || body.length === 0) {
      return response.status(400).json({ error: 'File is required' });
    }

    // Upload to Vercel Blob
    const blob = await put(filename, body, {
      access: 'public',
    });

    return response.status(200).json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return response.status(500).json({ 
      error: 'Failed to upload file',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
