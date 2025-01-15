import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  return (
    <Link 
      to={to} 
      className="flex flex-col items-center text-gray-600 hover:text-blue-600 nav-link group"
    >
      <div className="transform transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </Link>
  );
};

export default NavLink;