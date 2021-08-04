/**
 * Archive employee
 *
 * @param {string} email - Employee email
 */
export const archiveEmployee = (email: string): void => {
  cy.get('dib-people-management dib-employees dib-page .grid .table-cell h4')
    .contains(email)
    .parent('.table-cell')
    .next('.table-cell')
    .next('.button-cell')
    .find('ui-button button')
    .contains('archive')
    .clickAttached();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains('archive').click();
};
