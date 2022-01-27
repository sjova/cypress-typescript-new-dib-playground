/**
 * @todo This is a temp. workaround and will be revisited
 *
 * Clear local storage, clear session storage, and then visit URL
 *
 * Mostly should be used outside of a single test (e.g., `beforeEach()`)
 *
 * @param {string} url - Url
 */
export const visitApp = (url: string): void => {
  cy.visit(url, {
    onBeforeLoad: (window) => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    },
  });
};
