export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: {
    name: string;
    coordinates: [number, number];
  };
  organizer: string;
  organizerId: string;
  type: 'public' | 'private';
  status: 'pending' | 'approved' | 'rejected';
  isMyCSD: boolean;
  createdAt: Date;
  updatedAt: Date;
  rejectionReason?: string;
}