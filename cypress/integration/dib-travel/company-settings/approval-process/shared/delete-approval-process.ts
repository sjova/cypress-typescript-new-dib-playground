export const deleteApprovalProcess = (traveler: string): void => {
  cy.get('dib-company-management dib-approval-process dib-approval-process-item')
    .contains(traveler)
    .parents('dib-approval-process-item')
    .find('ui-button')
    .contains('delete')
    .clickAttached();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

  // TODO: Confirm snackbar message: "Approval process successfully deleted."
  cy.get('dib-company-management dib-approval-process dib-page dib-approval-process-item').should('not.exist');
};
