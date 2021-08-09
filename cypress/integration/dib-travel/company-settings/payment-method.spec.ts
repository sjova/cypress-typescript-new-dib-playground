describe('Company Settings - Payment Method', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/payment-method/billing-profiles');
  });

  it('should display "Payment Method" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains(' Payment Method ').should('exist');
  });
});
