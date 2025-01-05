import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebase';

export const useVideoUrl = (path: string) => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const videoRef = ref(storage, path);
        const downloadUrl = await getDownloadURL(videoRef);
        setUrl(downloadUrl);
      } catch (err) {
        console.error('Error loading video:', err);
        setError('Failed to load background video');
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [path]);

  return { url, loading, error };
};