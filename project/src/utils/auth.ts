// Authentication utility functions
export const isUsmEmail = (email: string): boolean => {
  return email.endsWith('@usm.my');
};

export const isAdminEmail = (email: string): boolean => {
  return email.endsWith('@admin.campusconnect.my');
};

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }
  if (!isUsmEmail(email) && !isAdminEmail(email)) {
    return 'Please use a valid USM or admin email';
  }
  return null;
};