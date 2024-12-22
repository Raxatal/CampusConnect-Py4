import { Event } from '../../types';

export type EventStatus = 'pending' | 'approved' | 'rejected';

export interface EventUpdate {
  status: EventStatus;
  rejectionReason?: string;
}