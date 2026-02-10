export const ALLOWED_EMAIL = 'aflogon@gmail.com';

export const canAccess = (email?: string | null): boolean => email === ALLOWED_EMAIL;
