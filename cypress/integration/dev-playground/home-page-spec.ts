describe('The Home Page', () => {
  it('should include title "Kitchen Sink"', () => {
    cy.visit('https://example.cypress.io/');

    cy.title().should('include', 'Kitchen Sink');
  });
});
