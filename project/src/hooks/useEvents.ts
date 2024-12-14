import { Event } from '../types';

// This will be replaced with actual API calls later
export const useRecommendedEvents = () => {
  const recommendedEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Talk: AI in Education',
      date: new Date('2024-03-25'),
      location: { name: 'DKG 1', coordinates: [5.355, 100.302] },
      description: 'Join us for an insightful discussion about AI in education.',
      organizer: 'School of Computer Sciences',
      type: 'public',
      isMyCSD: true
    },
    {
      id: '2',
      title: 'Cultural Night 2024',
      date: new Date('2024-04-15'),
      location: { name: 'Dewan Tuanku Syed Putra', coordinates: [5.357, 100.303] },
      description: 'Annual cultural celebration featuring performances from diverse student groups.',
      organizer: 'Student Affairs Department',
      type: 'public',
      isMyCSD: true
    }
  ];

  return recommendedEvents;
};