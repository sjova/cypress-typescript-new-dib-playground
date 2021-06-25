export const getSessionStorage = (key: string): void => {
  cy.window().then((window) => window.sessionStorage.getItem(key));
};
