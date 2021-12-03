export const resetState = (): void => {
  cy.clearLocalStorage();

  // Note: We'll keep this for testing purposes
  // Replacement for `cy.clearLocalStorage()`
  /* cy.window().then((window) => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }); */

  cy.clearCookies();
};
