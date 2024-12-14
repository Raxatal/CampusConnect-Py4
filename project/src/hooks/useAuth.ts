import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

// TODO: Implement with Firebase
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Add Firebase auth state listener
    setLoading(false);
    return () => {
      // Cleanup
    };
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user
  };
};