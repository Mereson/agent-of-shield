export const parseResMsg = (message?: string | string[]) =>
  Array.isArray(message) ? message?.[0] : message || 'An error occurred';
