describe('Company Settings - Travel Policy', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/travel-policy');
  });

  it('should display "Travel Policy" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Travel Policy ').should('exist');
  });
});
