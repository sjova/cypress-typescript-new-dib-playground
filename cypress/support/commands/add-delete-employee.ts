import Employee from '../../fixtures/company-employees/employee.json';

export const addEmployee = (
  firstName = Employee.firstName,
  lastName = Employee.lastName,
  email = Employee.email
): void => {
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

export const deleteEmployee = (
  modifiedFirstName = Employee.modifiedFirstName,
  firstName = Employee.firstName,
  lastName = Employee.lastName,
  email = Employee.email
): void => {
  cy.visit('/people-management/employees');

  cy.get('dib-people-management dib-employees dib-page .grid .name-cell h4')
    .contains(modifiedFirstName)
    .parent('.name-cell')
    .next('.table-cell')
    .next('.table-cell')
    .next('.button-cell')
    .find('ui-button button')
    .contains('archive')
    .clickAttached();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains('archive').click();

  cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('not.contain', firstName);
  cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('not.contain', lastName);
  cy.get('dib-people-management dib-employees dib-page .grid .table-cell').should('not.contain', email);
};
