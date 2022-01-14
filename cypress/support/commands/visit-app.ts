export const visitApp = (url: string): void => {
  cy.visit(url, {
    onBeforeLoad: (window) => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    },
  });
};
