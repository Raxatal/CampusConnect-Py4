import React from 'react';
import { format } from 'date-fns';
import { Event } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface EventRequestFormProps {
  onSubmit: (data: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const EventRequestForm: React.FC<EventRequestFormProps> = ({ onSubmit, onCancel }) => {
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const startDateTime = new Date(formData.get('startDate') as string);
    const endDateTime = new Date(formData.get('endDate') as string);

    const eventData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      startDate: startDateTime,
      endDate: endDateTime,
      location: {
        name: formData.get('location') as string,
        coordinates: [5.355, 100.302] // Default coordinates, would be selected via map
      },
      organizer: user?.email?.split('@')[0] || 'Unknown',
      organizerId: user?.uid || '',
      type: 'public' as const,
      isMyCSD: formData.get('isMyCSD') === 'on'
    };

    onSubmit(eventData);
  };

  const today = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Title</label>
        <input
          type="text"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
          <input
            type="datetime-local"
            name="startDate"
            min={today}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
          <input
            type="datetime-local"
            name="endDate"
            min={today}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isMyCSD"
          id="isMyCSD"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isMyCSD" className="ml-2 block text-sm text-gray-700">
          MyCSD Provided
        </label>
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
          Submit Request
        </button>
      </div>
    </form>
  );
};

export default EventRequestForm;