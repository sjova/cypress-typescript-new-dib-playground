export const selectApprovalSettings = (settings: ApprovalSettings, groupName: string): void => {
  let inputSelectorPosition = -1;

  switch (settings) {
    case 'Only out of policy travels':
      inputSelectorPosition = 1;
      break;
    case 'All travels':
      inputSelectorPosition = 1;
      break;
  }

  cy.get('.cdk-overlay-container dib-approval-process-dialog-v2 label').contains(settings).click();

  cy.get('.cdk-overlay-container dib-approval-process-dialog-v2 ui-control-wrapper .container')
    .eq(inputSelectorPosition)
    .click();

  cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label').contains(groupName, { matchCase: false }).click();
};

type ApprovalSettings = 'Exception from travel policy' | 'Only out of policy travels' | 'All travels';
