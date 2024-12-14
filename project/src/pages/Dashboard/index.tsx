import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import RecommendedEvents from './RecommendedEvents';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <ActionButtons onNavigate={navigate} />
      <RecommendedEvents onEventClick={(eventId) => navigate(`/events/${eventId}`)} />
    </div>
  );
};

export default Dashboard;