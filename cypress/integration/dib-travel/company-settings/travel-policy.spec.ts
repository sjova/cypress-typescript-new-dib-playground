describe('Company Settings - Travel Policy', () => {
  it('should display "Travel Policy" in the sidebar navigation', () => {
    cy.login();
    cy.visit('/company-management/travel-policy');

    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Travel Policy ').should('exist');
  });
});
