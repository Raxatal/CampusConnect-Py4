import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ClipboardList, BarChart, ChevronDown } from 'lucide-react';

const AdminMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span className="hidden sm:inline">Admin</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={() => handleNavigation('/admin/event-requests')}
            className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 transition-colors"
          >
            <ClipboardList className="w-5 h-5" />
            <span>Event Requests</span>
          </button>
          <button
            onClick={() => handleNavigation('/admin/reports')}
            className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 transition-colors"
          >
            <BarChart className="w-5 h-5" />
            <span>Reports</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;