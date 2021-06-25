export const dataCy = (value: string): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get(`[data-cy=${value}]`);
};
