export const checkToken = (token: string): void => {
  cy.window().its('localStorage.token').should('eq', token);
};
