export const deleteAddedEmployee = (
  modifiedFirstName: string,
  firstName: string,
  lastName: string,
  email: string
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
