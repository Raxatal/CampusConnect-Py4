import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Modal from '../../../components/ui/Modal';

interface DeleteRejectedButtonProps {
  onDelete: () => Promise<void>;
}

const DeleteRejectedButton: React.FC<DeleteRejectedButtonProps> = ({ onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error deleting rejected events:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md border border-red-200"
      >
        <Trash2 className="w-5 h-5 mr-2" />
        Delete All Rejected Events
      </button>

      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete all rejected events? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete All'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRejectedButton;