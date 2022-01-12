import { ApprovalProcessGroup } from '@cy/models';
import { selectTravelerGroup } from './select-traveler-group';

export const addApprovalProcessAndConfirm = (approvalProcessGroup: ApprovalProcessGroup): void => {
  cy.waitForAngular();

  cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

  selectTravelerGroup(approvalProcessGroup);

  // Computed size is zero, and we need to use `{ force: true }`
  cy.get('.cdk-overlay-container dib-approval-process-dialog-v2 label')
    .contains('Do not need approval (this overrides any travel policy)')
    .click({ force: true });
  cy.get('.cdk-overlay-container dib-approval-process-dialog-v2 ui-button[type=success]').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should(
    'have.text',
    'Approval process successfully created.'
  );
  cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left')
    .first()
    .find('.item__content p')
    .should('contain', approvalProcessGroup.travelersGroupName);
};
