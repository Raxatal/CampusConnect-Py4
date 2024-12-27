import React from 'react';
import { Event } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateEventFormProps {
  onSubmit: (data: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialData?: Partial<Event>;
  submitLabel?: string;
}

const PrivateEventForm: React.FC<PrivateEventFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialData,
  submitLabel = 'Create'
}) => {
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const startDateTime = new Date(formData.get('startDate') as string);
    const endDateTime = formData.get('endDate') ? new Date(formData.get('endDate') as string) : null;

    const eventData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string || '',
      startDate: startDateTime,
      endDate: endDateTime || startDateTime, // Default to start date if not provided
      location: {
        name: formData.get('location') as string || 'TBD',
        coordinates: [5.355, 100.302] // Default coordinates
      },
      organizer: user?.email?.split('@')[0] || 'Unknown',
      organizerId: user?.uid || '',
      type: 'private' as const
    };

    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Title</label>
        <input
          type="text"
          name="title"
          defaultValue={initialData?.title}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
        <input
          type="datetime-local"
          name="startDate"
          defaultValue={initialData?.startDate?.toISOString().slice(0, 16)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date & Time (Optional)
        </label>
        <input
          type="datetime-local"
          name="endDate"
          defaultValue={initialData?.endDate?.toISOString().slice(0, 16)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location (Optional)
        </label>
        <input
          type="text"
          name="location"
          defaultValue={initialData?.location?.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={initialData?.description}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PrivateEventForm;