import React from 'react';
import { Filter } from 'lucide-react';

interface FilterSelectProps {
  value: 'all' | 'mycsd';
  onChange: (value: 'all' | 'mycsd') => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-5 h-5 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as 'all' | 'mycsd')}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="all">All Events</option>
        <option value="mycsd">MyCSD Events</option>
      </select>
    </div>
  );
};

export default FilterSelect;