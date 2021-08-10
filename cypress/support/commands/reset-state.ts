export const resetState = (): void => {
  cy.clearLocalStorage();
  cy.clearCookies();
};
