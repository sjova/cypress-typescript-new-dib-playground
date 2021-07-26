export const iframeFix = (): void => {
  cy.intercept('api/public/tenant/config', (req) => {
    req.headers['origin'] = Cypress.config('baseUrl') as string;
  });
};
