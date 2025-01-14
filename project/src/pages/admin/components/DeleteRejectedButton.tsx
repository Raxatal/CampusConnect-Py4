import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import { Event } from '../../../types';

interface DeleteRejectedButtonProps {
  events: Event[];
  onDelete: () => Promise<void>;
}

const DeleteRejectedButton: React.FC<DeleteRejectedButtonProps> = ({ events, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
      setShowConfirmation(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error deleting events:', error);
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
        Delete All Rejected and Expired Events
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
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Events to be deleted:</h3>
            <div className="max-h-60 overflow-y-auto bg-gray-50 rounded-md p-3">
              <ul className="space-y-2">
                {events.map((event) => (
                  <li key={event.id} className="text-sm">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-gray-500 ml-2">({event.status})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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

      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Success"
      >
        <div className="space-y-4">
          <p className="text-green-600">Event deletion successful.</p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRejectedButton;