import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationFilterProps {
  enabled: boolean;
  onToggle: () => void;
  radius: number;
  onRadiusChange: (radius: number) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  enabled,
  onToggle,
  radius,
  onRadiusChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <MapPin className="w-5 h-5 text-gray-500" />
        <span>Show Nearest Events</span>
      </label>
      
      {enabled && (
        <select
          value={radius}
          onChange={(e) => onRadiusChange(Number(e.target.value))}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value={0.25}>Within 250m</option>
          <option value={0.5}>Within 500m</option>
          <option value={0.75}>Within 750m</option>
          <option value={1.00}>Within 1000m</option>
          <option value={1.25}>Within 1250m</option>
        </select>
      )}
    </div>
  );
};

export default LocationFilter;