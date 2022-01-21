import { User } from '@cy/models';

export const searchAndSelectEmployee = (employee: User): void => {
  cy.get('.cdk-overlay-container dib-travel-policy-dialog  ui-control-wrapper .container').click();
  cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label')
    .contains(`${employee.firstName} ${employee.lastName}`)
    .click();
  cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();
};
