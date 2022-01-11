describe('Company Report - Invoices', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display "Invoices" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Invoices').should('exist');
  });

  it('should check Invoices page', () => {
    cy.visitAngularUrl('/reporting/invoices');

    cy.get('dib-reporting dib-invoices h1').should('have.text', ' Invoices ');

    cy.get('dib-reporting dib-invoices p')
      .should('contain', 'Here you can see a list of all processed invoices made by employees of your company.')
      .should('contain', 'No billing profiles to chose from');
  });
});
