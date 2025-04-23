import React from 'react';
import { Plus } from 'lucide-react';

interface CreateRequestButtonProps {
  onClick: () => void;
}

const CreateRequestButton: React.FC<CreateRequestButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
    >
      <Plus className="w-5 h-5 mr-2" />
      Create Request
    </button>
  );
};

export default CreateRequestButton;