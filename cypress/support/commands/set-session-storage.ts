export const setSessionStorage = (key: string, value: string): void => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value);
  });
};
