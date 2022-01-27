/**
 * Iframe fix
 *
 * This command should be executed before each test
 *
 * @example
 *    cy.iframeFix()
 *
 *    beforeEach(() => {
 *      cy.iframeFix();
 *      // other commands should be placed after `cy.iframeFix()`
 *    });
 */
export const iframeFix = (): void => {
  cy.intercept('api/public/tenant/config', (req) => {
    req.headers['origin'] = Cypress.config('baseUrl') as string;
  });
};
