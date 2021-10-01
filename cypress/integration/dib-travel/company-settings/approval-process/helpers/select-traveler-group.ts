import { getFirstWord } from '../../../../../helpers';
import { ApprovalProcessGroup } from '../../../../../models';

export const selectTravelerGroup = (approvalProcessGroup: ApprovalProcessGroup): void => {
  cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input')
    .first()
    .type(getFirstWord(approvalProcessGroup.travelersGroupName));

  cy.get('.cdk-overlay-container dib-approval-process-dialog .members .group')
    .first()
    .contains(approvalProcessGroup.travelersGroupName, { matchCase: false })
    .click();
};
