import { Event } from '../../types';

export type EventStatus = 'pending' | 'approved' | 'rejected' | 'expired';

export interface EventUpdate {
  status: EventStatus;
  rejectionReason?: string;
}