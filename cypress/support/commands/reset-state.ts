/**
 * Reset state
 *
 * Clear data in local storage and all browser cookies. To prevent a state from being shared across tests, Cypress automatically clears data in local storage and all cookies before each test
 */
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
