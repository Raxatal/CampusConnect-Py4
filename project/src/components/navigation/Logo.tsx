import React, { useEffect, useState } from 'react';
import { getLogoUrl } from '../../services/logo';

const Logo: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState<string>('');

  useEffect(() => {
    const loadLogo = async () => {
      const url = await getLogoUrl();
      setLogoUrl(url);
    };
    loadLogo();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <img 
        src={logoUrl} 
        alt="CampusConnect Logo" 
        className="h-12 sm:h-16 w-auto"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.src = 'https://via.placeholder.com/150x50?text=CampusConnect';
        }}
      />
      <span className="text-sm sm:text-xl font-bold text-white">Campus Connect</span>
    </div>
  );
};

export default Logo;