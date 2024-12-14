import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import { Event } from '../../types';

interface EventDetailsModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleViewOnMap = () => {
    navigate(`/map?eventId=${event.id}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Event Details">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">{event.title}</h3>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-3" />
            <span>{format(new Date(event.date), 'PPP p')}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-3" />
            <span>{event.location.name}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <User className="w-5 h-5 mr-3" />
            <span>{event.organizer}</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-gray-600">{event.description}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleViewOnMap}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View on Map
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailsModal;