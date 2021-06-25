export const asyncAdd = (a: number, b: number): void => {
  cy.log(`${a} + ${b}`);
  // our application in "index.html" has placed a promise-returning
  // method "asyncAdd" onto the "window" object.
  // from the tests's custom command we can invoke that method
  // Cypress automatically waits for the promises to resolve
  // before yielding their value to the next command in the test
  // https://on.cypress.io/invoke
  cy.window().invoke('asyncAdd', a, b);
};
