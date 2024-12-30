import { useState } from 'react';
import { uploadEventFile } from '../services/storage';

interface UseFileUploadResult {
  uploadFile: (file: File, eventId: string, type: 'poster' | 'approval') => Promise<string>;
  uploading: boolean;
  error: string | null;
}

export const useFileUpload = (): UseFileUploadResult => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, eventId: string, type: 'poster' | 'approval'): Promise<string> => {
    try {
      setUploading(true);
      setError(null);
      const { url } = await uploadEventFile(file, eventId, type);
      return url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload file';
      setError(message);
      throw new Error(message);
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, error };
};