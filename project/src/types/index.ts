export interface Venue {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  capacity?: number;
  type?: 'indoor' | 'outdoor';
}