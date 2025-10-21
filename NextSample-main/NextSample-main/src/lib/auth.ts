// src/lib/auth.ts
const AUTH_KEY = 'cafeCentralAdminLoggedIn';

export const checkAuthStatus = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }
  return false; // Default to not logged in on server or if window is not available
};

export const setAuthStatus = (loggedIn: boolean): void => {
  if (typeof window !== 'undefined') {
    if (loggedIn) {
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }
};
