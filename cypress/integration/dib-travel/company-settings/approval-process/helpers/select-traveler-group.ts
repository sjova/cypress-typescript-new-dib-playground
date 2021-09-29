import { getFirstWord } from '../../../../../helpers';
import { ApprovalProcess } from '../../../../../models';

export const selectTravelerGroup = (travelersGroup: ApprovalProcess): void => {
  cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input')
    .first()
    .type(getFirstWord(travelersGroup.travelersGroupName));

  cy.get('.cdk-overlay-container dib-approval-process-dialog .members .group')
    .first()
    .contains(travelersGroup.travelersGroupName, { matchCase: false })
    .click();
};
