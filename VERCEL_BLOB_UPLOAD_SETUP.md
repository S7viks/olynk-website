# Vercel Blob Upload Implementation

## Overview

This implementation adds file upload functionality using Vercel Blob storage. Files are uploaded through a server-side API route (Vercel serverless function) and stored in Vercel Blob.

## Implementation Details

### Files Created

1. **`api/avatar/upload.ts`** - Vercel serverless function that handles file uploads
   - Accepts POST requests with file data
   - Validates filename from query parameters
   - Uploads file to Vercel Blob storage
   - Returns blob URL and metadata

2. **`src/components/AvatarUpload.tsx`** - React component for file upload UI
   - File selection with preview
   - Upload progress and error handling
   - Success feedback with blob URL
   - File validation (type and size)

3. **Route added to `src/App.tsx`**
   - Accessible at `/avatar/upload`

### Dependencies Installed

- `@vercel/blob` - Vercel Blob SDK for server-side uploads
- `@vercel/node` (dev) - TypeScript types for Vercel serverless functions

## Configuration

### Environment Variables

Vercel Blob requires the `BLOB_READ_WRITE_TOKEN` environment variable, which is automatically provided by Vercel when you:

1. Enable Vercel Blob storage in your Vercel project dashboard
2. Or use the Vercel CLI: `vercel blob create`

**Note:** The token is automatically injected into serverless functions at runtime. You don't need to manually set it in your `.env` file for production.

For local development, you can pull environment variables:
```bash
vercel env pull
```

### File Size Limits

- **Server uploads:** Limited to 4.5 MB (as per Vercel's server upload limit)
- **For larger files:** Consider implementing client-side uploads using `@vercel/blob/client`

## Usage

### Access the Upload Page

Navigate to `/avatar/upload` in your application.

### Upload a File

1. Click "Select Image" and choose a file (JPEG, PNG, or WebP)
2. Preview will appear if the file is valid
3. Click "Upload" to submit
4. Upon success, the blob URL will be displayed

### API Endpoint

The API endpoint is available at:
```
POST /api/avatar/upload?filename=<filename>
```

**Request:**
- Method: POST
- Body: Binary file data
- Query parameter: `filename` (required)

**Response:**
```json
{
  "url": "https://...",
  "pathname": "...",
  "size": 12345,
  "uploadedAt": "2024-..."
}
```

## Error Handling

The implementation includes error handling for:
- Missing filename
- Missing file data
- Invalid file types
- File size exceeding 4.5 MB limit
- Network errors
- Server errors

## Security Considerations

1. **File Type Validation:** Only image files (JPEG, PNG, WebP) are accepted
2. **File Size Limits:** 4.5 MB limit enforced on client and server
3. **Public Access:** Files are uploaded with `access: 'public'` - adjust if private storage is needed
4. **Authentication:** Consider adding authentication middleware if uploads should be restricted

## Future Enhancements

1. **Client-Side Uploads:** For files larger than 4.5 MB, implement client-side uploads
2. **Authentication:** Add authentication/authorization to restrict uploads
3. **File Management:** Add delete functionality
4. **Progress Tracking:** Add upload progress bar for better UX
5. **Multiple Files:** Support batch uploads
6. **Image Processing:** Add image resizing/optimization before upload

## Troubleshooting

### Upload Fails with "Failed to upload file"

1. Check that Vercel Blob is enabled in your Vercel project
2. Verify `BLOB_READ_WRITE_TOKEN` is available (check Vercel dashboard)
3. Check serverless function logs in Vercel dashboard
4. Ensure file size is under 4.5 MB

### "Method not allowed" Error

- Ensure you're using POST method
- Check that the API route is correctly deployed

### File Not Found in Response

- Verify the filename query parameter is included
- Check that the request body contains the file data

## References

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
