export const cancelDeleteApprovalProcessAndConfirm = (traveler: string): void => {
  cy.get('dib-company-management dib-approval-process dib-approval-process-item')
    .contains(traveler)
    .parents('dib-approval-process-item')
    .find('ui-button')
    .contains('delete')
    .clickAttached();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

  cy.get('.cdk-overlay-container confirmation-dialog').should('not.exist');
};
