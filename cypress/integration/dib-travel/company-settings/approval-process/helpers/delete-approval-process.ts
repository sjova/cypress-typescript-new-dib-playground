export const deleteApprovalProcess = (travelerName: string): void => {
  cy.get('dib-company-management dib-approval-process dib-approval-process-item')
    .contains(travelerName)
    .parents('dib-approval-process-item')
    .find('ui-button')
    .contains('Delete')
    .click();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should(
    'have.text',
    'Approval process successfully deleted.'
  );
  cy.get('dib-company-management dib-approval-process dib-page dib-approval-process-item').should('not.exist');
};
