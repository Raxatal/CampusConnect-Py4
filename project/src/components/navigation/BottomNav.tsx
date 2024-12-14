import React from 'react';
import { Calendar, MapPin, ClipboardList } from 'lucide-react';
import NavLink from './NavLink';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-3">
          <NavLink to="/" icon={<Calendar className="w-6 h-6" />} label="Dashboard" />
          <NavLink to="/map" icon={<MapPin className="w-6 h-6" />} label="Map" />
          <NavLink to="/requests" icon={<ClipboardList className="w-6 h-6" />} label="Requests" />
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;