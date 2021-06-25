describe('The Home Page', () => {
  it('Successfully loads', () => {
    cy.visit('https://example.cypress.io/');
  });

  it('Include title "Kitchen Sink"', () => {
    cy.visit('https://example.cypress.io/');

    cy.title().should('include', 'Kitchen Sink');
  });
});
