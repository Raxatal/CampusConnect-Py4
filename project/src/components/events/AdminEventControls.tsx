import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Event } from '../../types';
import Modal from '../ui/Modal';
import DeleteConfirmationModal from '../ui/DeleteConfirmationModal';
import PublicEventForm from './PublicEventForm';

interface AdminEventControlsProps {
  event: Event;
  onEdit: (data: Partial<Event>) => Promise<void>;
  onDelete: () => Promise<void>;
}

const AdminEventControls: React.FC<AdminEventControlsProps> = ({ event, onEdit, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = async (data: Partial<Event>) => {
    await onEdit(data);
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    await onDelete();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowEditModal(true);
          }}
          className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteModal(true);
          }}
          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Event"
      >
        <PublicEventForm
          onSubmit={handleEdit}
          onCancel={() => setShowEditModal(false)}
          initialData={event}
          submitLabel="Save Changes"
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
      />
    </>
  );
};

export default AdminEventControls;