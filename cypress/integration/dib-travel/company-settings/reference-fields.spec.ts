describe('Company Settings - Reference Fields', () => {
  it('should display "Reference Fields" in the sidebar navigation', () => {
    cy.login();

    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Reference Fields');
  });
});
