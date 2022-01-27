/**
 * @todo Used for Cypress demo purposes and must be revisited before usage
 *
 * Check token in Local Storage
 *
 * @param {string} token - Token name
 * @example
 *    cy.checkToken('abc123')
 */
export const checkToken = (token: string): void => {
  cy.window().its('localStorage.token').should('eq', token);
};
