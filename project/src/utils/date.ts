import { format as fnsFormat } from 'date-fns';

export const formatDate = (date: Date | string | number | null | undefined): string => {
  if (!date) return 'No date';
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    return fnsFormat(dateObj, 'PPP');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};