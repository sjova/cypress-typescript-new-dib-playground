import { Employee } from '../../../../../models';

export const searchAndSelectEmployee = (employee: Employee): void => {
  cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Search]').type(employee.email);
  cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-assign-members .members .user')
    .contains(`${employee.firstName} ${employee.lastName}`)
    .parents('.member')
    .click();
  cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();
};
