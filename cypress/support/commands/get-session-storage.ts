/**
 * @todo Used for Cypress demo purposes and must be revisited before usage
 *
 * Get Session Storage - Returns the current value associated with the given key,
 * or null if the given key does not exist in the list associated with the object.
 *
 * @param {string} key - Key name
 * @example
 *    cy.getSessionStorage('abc123')
 */
export const getSessionStorage = (key: string): void => {
  cy.window().then((window) => window.sessionStorage.getItem(key));
};
