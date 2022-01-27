/**
 * @todo Used for Cypress demo purposes and must be revisited before usage
 *
 * Click on a link with a specific label
 *
 * @param {string} label - Link label
 * @example
 *    cy.clickLink('Buy Now')
 */
export const clickLink = (label: string): Cypress.Chainable<JQuery<HTMLAnchorElement>> => {
  return cy.get('a').contains(label).click();
};
