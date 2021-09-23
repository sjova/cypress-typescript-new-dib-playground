describe('Company Settings - Reference Fields', () => {
  it('should display "Reference Fields" in the sidebar navigation', () => {
    cy.login();

    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Reference Fields');
  });

  it('should check if "Employee" is displayed in header and verify that link is valid', () => {
    cy.get('dib-company-management dib-reference-fields .header__details__spacer').contains('Employees page').click();
    cy.get('dib-people-management dib-employees .header__title').should('have.text', ' Employees ');
  });
});
