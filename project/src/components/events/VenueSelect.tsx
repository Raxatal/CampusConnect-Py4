import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Venue } from '../../types';
import { getVenues } from '../../services/venues';

interface VenueSelectProps {
  onChange: (venue: Venue) => void;
  selectedVenue?: Venue;
}

const VenueSelect: React.FC<VenueSelectProps> = ({ onChange, selectedVenue }) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      const fetchedVenues = await getVenues();
      setVenues(fetchedVenues);
    } catch (error) {
      console.error('Error loading venues:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-gray-700">
            {selectedVenue ? selectedVenue.name : 'Select Venue'}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {loading ? (
            <div className="p-4 text-gray-500">Loading venues...</div>
          ) : (
            <ul className="max-h-60 overflow-auto py-2">
              {venues.map((venue) => (
                <li
                  key={venue.id}
                  onClick={() => {
                    onChange(venue);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  {venue.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default VenueSelect;