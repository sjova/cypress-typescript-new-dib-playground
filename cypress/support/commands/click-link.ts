export const clickLink = (label: string): Cypress.Chainable<JQuery<HTMLAnchorElement>> => {
  return cy.get('a').contains(label).click();
};
