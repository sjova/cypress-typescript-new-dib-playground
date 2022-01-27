/**
 * Select DOM element by data-cy attribute
 *
 * @param {string} value - Attribute value
 * @example
 *    cy.dataCy('greeting')
 */
export const dataCy = (value: string): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get(`[data-cy=${value}]`);
};
