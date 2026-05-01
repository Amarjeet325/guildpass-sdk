/**
 * Formats a date string or timestamp into a ISO string.
 * 
 * @param date The date to format
 * @returns ISO date string
 */
export const formatIsoDate = (date: string | number | Date): string => {
  return new Date(date).toISOString();
};

/**
 * Capitalises the first letter of a string.
 * 
 * @param str The string to capitalise
 * @returns Capitalised string
 */
export const capitalise = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
