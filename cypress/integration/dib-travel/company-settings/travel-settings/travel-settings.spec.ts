describe('Company Settings - Travel Settings', () => {
  it('should display "Travel Settings" in the sidebar navigation', () => {
    cy.login();
    cy.visit('/company-management/travel-settings');

    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Travel Settings ').should('exist');
  });
});
