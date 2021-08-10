import { User } from '../../../../models';

export const archiveEmployee = (employee: Omit<User, 'password'>, includeAssertion = true): void => {
  cy.get('dib-people-management dib-employees dib-page .grid .table-cell h4')
    .contains(employee.email)
    .parent('.table-cell')
    .next('.table-cell')
    .next('.button-cell')
    .find('ui-button button')
    .contains('archive')
    .clickAttached();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains('archive').click();

  if (includeAssertion) {
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('not.contain', employee.firstName);
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('not.contain', employee.lastName);
    cy.get('dib-people-management dib-employees dib-page .grid .table-cell').should('not.contain', employee.email);
  }
};
