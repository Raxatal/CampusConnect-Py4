import { useState, useEffect } from 'react';
import { Venue } from '../types';
import { getVenues } from '../services/venues';

export const useVenues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      setLoading(true);
      const fetchedVenues = await getVenues();
      setVenues(fetchedVenues);
    } catch (err) {
      setError('Failed to load venues');
      console.error('Error loading venues:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    venues,
    loading,
    error,
    refreshVenues: loadVenues
  };
};