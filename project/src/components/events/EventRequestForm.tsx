import React, { useState } from 'react';
import { format } from 'date-fns';
import { Upload } from 'lucide-react';
import { Event, Venue } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useFileUpload } from '../../hooks/useFileUpload';
import VenueSelect from './VenueSelect';

interface EventRequestFormProps {
  onSubmit: (data: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const EventRequestForm: React.FC<EventRequestFormProps> = ({ onSubmit, onCancel }) => {
  const { user } = useAuth();
  const { uploadFile, uploading } = useFileUpload();
  const [selectedVenue, setSelectedVenue] = useState<Venue>();
  const [posterFile, setPosterFile] = useState<File>();
  const [approvalFile, setApprovalFile] = useState<File>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedVenue) {
      alert('Please select a venue');
      return;
    }

    const formData = new FormData(e.currentTarget);
    
    try {
      // Only upload files if they were selected
      const [posterUrl, approvalUrl] = await Promise.all([
        posterFile ? uploadFile(posterFile, 'temp-id', 'poster') : Promise.resolve(undefined),
        approvalFile ? uploadFile(approvalFile, 'temp-id', 'approval') : Promise.resolve(undefined)
      ]);

      const eventData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        location: selectedVenue,
        organizer: formData.get('organizer') as string,
        requesterId: user?.uid || '',
        requesterName: user?.email?.split('@')[0] || 'Unknown',
        type: 'public' as const,
        isMyCSD: formData.get('isMyCSD') === 'on',
        ...(posterUrl && { posterUrl }), // Only include if file was uploaded
        ...(approvalUrl && { approvalLetterUrl: approvalUrl }) // Only include if file was uploaded
      };

      onSubmit(eventData);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'poster' | 'approval') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'poster') {
      setPosterFile(file);
    } else {
      setApprovalFile(file);
    }
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Organizer</label>
        <input
          type="text"
          name="organizer"
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

      <VenueSelect
        onChange={setSelectedVenue}
        selectedVenue={selectedVenue}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Poster (Optional)</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'poster')}
                  className="sr-only"
                  accept="image/*"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            {posterFile && (
              <p className="text-sm text-green-600">Selected: {posterFile.name}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Approval Letter (Optional)</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'approval')}
                  className="sr-only"
                  accept="application/pdf"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF files only, up to 5MB</p>
            {approvalFile && (
              <p className="text-sm text-green-600">Selected: {approvalFile.name}</p>
            )}
          </div>
        </div>
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
          disabled={uploading}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
};

export default EventRequestForm;