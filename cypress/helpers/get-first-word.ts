/**
 * Get the first word from the text
 *
 * @param {string} text - the text
 * @returns {string} - the first word from the text
 * @example
 *    getFirstWord('Petar Petrovic')
 */
export const getFirstWord = (text: string): string => {
  return text.split(' ')[0];
};
