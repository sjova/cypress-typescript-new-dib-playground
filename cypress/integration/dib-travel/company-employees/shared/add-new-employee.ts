export const addNewEmployee = (firstName: string, lastName: string, email: string): void => {
  cy.visit('/people-management/employees');

  cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');

  cy.get('dib-people-management dib-employees .table-pref ui-button').click();

  cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="firstName"]').type(firstName);
  cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="lastName"]').type(lastName);
  cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[type="email"]').type(email);
  cy.get('.cdk-overlay-container dib-employee-dialog ui-button').click();

  cy.wait('@getCorporationsEmployees').then(() => {
    cy.reload();

    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', firstName);
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', lastName);
    cy.get('dib-people-management dib-employees dib-page .grid .table-cell').should('contain', email);
  });
};
