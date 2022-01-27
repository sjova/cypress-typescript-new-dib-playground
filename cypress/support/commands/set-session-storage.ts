/**
 * @todo Used for Cypress demo purposes and must be revisited before usage
 *
 * Set Session Storage - Sets the value of the pair identified by key to value,
 * creating a new key/value pair if none existed for key previously.
 *
 * @param {string} key - Key name
 * @example
 *    cy.setSessionStorage('abc', '123')
 */
export const setSessionStorage = (key: string, value: string): void => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value);
  });
};
