import { ApprovalProcessGroup } from '@cy/models';

export const selectTravelerGroup = (approvalProcessGroup: ApprovalProcessGroup): void => {
  cy.get('.cdk-overlay-container dib-approval-process-dialog-v2  ui-control-wrapper .container').click();

  cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label')
    .contains(approvalProcessGroup.travelersGroupName, { matchCase: false })
    .click();
};
