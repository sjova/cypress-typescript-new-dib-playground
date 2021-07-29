import Employee from '../../../../fixtures/company-employees/employee.json';

export const deleteAddedEmployee = (
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
