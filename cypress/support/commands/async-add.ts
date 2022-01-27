/**
 * @todo Used for Cypress demo purposes and must be revisited before usage
 *
 * Adds two numbers asynchronously
 *
 * @param {number} a
 * @param {number} b
 * @example
 *    cy.asyncAdd(2, 3).should('equal', 5)
 */
export const asyncAdd = (a: number, b: number): void => {
  cy.log(`${a} + ${b}`);
  // our application in "index.html" has placed a promise-returning
  // method "asyncAdd" onto the "window" object.
  // from the test's custom command we can invoke that method
  // Cypress automatically waits for the promises to resolve
  // before yielding their value to the next command in the test
  // https://on.cypress.io/invoke
  cy.window().invoke('asyncAdd', a, b);
};
