export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: {
    name: string;
    coordinates: [number, number];
  };
  organizer: string;
  type: 'public' | 'private';
  status?: 'pending' | 'approved' | 'rejected';
  isMyCSD?: boolean;
}