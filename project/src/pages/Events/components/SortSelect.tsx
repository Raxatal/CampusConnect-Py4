import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'date' | 'title' | 'venue';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-5 h-5 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="date">Sort by Date</option>
        <option value="title">Sort by Title</option>
        <option value="venue">Sort by Venue</option>
      </select>
    </div>
  );
};

export default SortSelect;