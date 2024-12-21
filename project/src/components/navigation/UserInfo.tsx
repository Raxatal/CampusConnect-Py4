import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserInfo: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const displayName = user.isAnonymous 
    ? 'Guest User' 
    : user.email?.split('@')[0] || 'User';

  return (
    <span className="text-sm">Hi, {displayName}</span>
  );
};

export default UserInfo;