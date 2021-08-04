describe('Company Settings - Reference Fields', () => {
  it('should "Reference Fields" be displayed in side bar', () => {
    cy.login();

    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Reference Fields');
  });
});
