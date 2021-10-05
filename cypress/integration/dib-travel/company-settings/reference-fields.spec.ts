describe('Company Settings - Reference Fields', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display "Reference Fields" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Reference Fields');
  });

  it('should check if "Employee" is displayed in header and verify that link is valid', () => {
    cy.visit('/company-management/reference-fields/cost-center');

    cy.get('dib-company-management dib-reference-fields .header__details__description')
      .contains('Employees page')
      .click();
    cy.get('dib-people-management dib-employees .header__title').should('have.text', ' Employees ');
  });
});
