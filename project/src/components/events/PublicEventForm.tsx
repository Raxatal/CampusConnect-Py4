import React from 'react';
import { Event } from '../../types';

interface PublicEventFormProps {
  onSubmit: (data: Partial<Event>) => Promise<void>;
  onCancel: () => void;
  initialData?: Event;
  submitLabel?: string;
}

const PublicEventForm: React.FC<PublicEventFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  submitLabel = 'Save Changes'
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const eventData: Partial<Event> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string || '',
      startDate: new Date(formData.get('startDate') as string),
      endDate: new Date(formData.get('endDate') as string),
      location: {
        name: formData.get('location') as string,
        coordinates: initialData?.location.coordinates || [5.355, 100.302]
      },
      type: 'public', // Preserve public event type
      isMyCSD: formData.get('isMyCSD') === 'on'
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

      <div className="grid grid-cols-2 gap-4">
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
          <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
          <input
            type="datetime-local"
            name="endDate"
            defaultValue={initialData?.endDate?.toISOString().slice(0, 16)}
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
          defaultValue={initialData?.location?.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={initialData?.description}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isMyCSD"
          id="isMyCSD"
          defaultChecked={initialData?.isMyCSD}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isMyCSD" className="ml-2 block text-sm text-gray-700">
          MyCSD Event
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
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PublicEventForm;