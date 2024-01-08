// /src/utils/commonUtils.ts

// Utility function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Utility function to format a date in a user-friendly way
export const formatDate = (date: Date): string => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Utility function to debounce a function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Utility function to generate a random alphanumeric string
export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Utility function to check if a value is an empty object
export const isEmptyObject = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

// Utility function to deep clone an object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Utility function to calculate the average of an array of numbers
export const calculateAverage = (numbers: number[]): number => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

// Utility function to check if a string is a valid email address
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility function to truncate a string to a specified length
export const truncateString = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};

// Utility function to check if a value is undefined or null
export const isNullOrUndefined = (value: any): boolean => {
  return value === null || value === undefined;
};

// Utility function to flatten a nested array
export const flattenArray = <T>(arr: (T | T[])[]): T[] => {
  return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten), []);
};

// Utility function to shuffle an array
export const shuffleArray = <T>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
