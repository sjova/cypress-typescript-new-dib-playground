import { getFirstWord } from '@cy/helpers';

export const selectApprovalSettings = (settings: ApprovalSettings, groupName: string): void => {
  let inputSelectorPosition = -1;
  let groupSelectorPosition = -1;

  switch (settings) {
    case 'Only out of policy travels':
      inputSelectorPosition = 2;
      groupSelectorPosition = 2;
      break;
    case 'All travels':
      inputSelectorPosition = 3;
      groupSelectorPosition = 2;
      break;
  }

  cy.get('.cdk-overlay-container dib-approval-process-dialog .radio-button-group label').contains(settings).click();

  cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input')
    .eq(inputSelectorPosition)
    .type(getFirstWord(groupName));

  cy.get('.cdk-overlay-container dib-approval-process-dialog .members .group')
    .eq(groupSelectorPosition)
    .contains(groupName, { matchCase: false })
    .click({ force: true });
};

type ApprovalSettings = 'Exception from travel policy' | 'Only out of policy travels' | 'All travels';
