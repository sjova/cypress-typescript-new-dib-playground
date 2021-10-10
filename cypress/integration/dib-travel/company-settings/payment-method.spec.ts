describe('Company Settings - Payment Method', () => {
  it('should display "Payment Method" in the sidebar navigation', () => {
    cy.login();
    cy.visit('/company-management/payment-method/billing-profiles');

    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains(' Payment Method ').should('exist');
  });
});
