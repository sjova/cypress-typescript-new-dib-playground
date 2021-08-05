describe('Company Settings - Travel Policy', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/travel-policy');
  });

  it('should display "Travel Policy" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Travel Policy ').should('exist');
  });

  // TODO: Nenad - We need to discuss this?
  it('should submit empty travel policy form', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-travel-policy-dialog').should('be.visible');
  });
});
