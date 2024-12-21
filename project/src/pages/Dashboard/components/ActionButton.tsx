import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      {icon}
      <h3 className="font-semibold">{label}</h3>
    </button>
  );
};

export default ActionButton;