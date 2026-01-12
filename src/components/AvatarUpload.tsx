import { useState, useRef } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import { Upload, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function AvatarUpload() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (4.5 MB limit for server uploads)
      const maxSize = 4.5 * 1024 * 1024; // 4.5 MB in bytes
      if (file.size > maxSize) {
        setError('File size must be less than 4.5 MB for server uploads');
        return;
      }

      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsUploading(true);

    try {
      if (!inputFileRef.current?.files) {
        throw new Error('No file selected');
      }

      const file = inputFileRef.current.files[0];

      if (!file) {
        throw new Error('No file selected');
      }

      const response = await fetch(
        `/api/avatar/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: 'POST',
          body: file,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
      }

      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setBlob(null);
    setPreview(null);
    setError(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Upload Your Avatar
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Select Image
          </label>
          <input
            id="file"
            name="file"
            ref={inputFileRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            required
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              dark:file:bg-blue-900 dark:file:text-blue-300
              dark:hover:file:bg-blue-800
              cursor-pointer"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Accepted formats: JPEG, PNG, WebP. Max size: 4.5 MB
          </p>
        </div>

        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
            />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isUploading || !inputFileRef.current?.files?.[0]}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
              transition-colors duration-200 font-medium"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload
              </>
            )}
          </button>

          {(blob || preview) && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg
                hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {blob && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                Upload successful!
              </p>
              <p className="text-xs text-green-700 dark:text-green-400 mb-2">
                Blob URL:
              </p>
              <a
                href={blob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-all"
              >
                {blob.url}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
