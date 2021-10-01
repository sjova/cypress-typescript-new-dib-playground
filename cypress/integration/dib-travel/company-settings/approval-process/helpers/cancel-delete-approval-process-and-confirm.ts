export const cancelDeleteApprovalProcessAndConfirm = (travelerName: string): void => {
  // TODO: Revisit this line later, and maybe move in test `beforeEach` or test itself
  cy.waitForAngular();

  cy.get(
    'dib-company-management dib-approval-process dib-approval-process-item div[dib-column-left] .item__left .item__content p'
  )
    .contains(travelerName)
    .parents('dib-approval-process-item')
    .find('ui-button')
    .contains('delete')
    .click();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

  cy.get('.cdk-overlay-container confirmation-dialog').should('not.exist');
};
