import { Group } from '@cy/models';

export const addCostCenter = (referenceFieldsName: string, referenceFieldsDescription: string, group: Group) => {
  cy.waitForAngular();

  cy.get('dib-company-management dib-reference-fields dib-cost-center ui-button[size="large"]')
    .contains('Add cost center')
    .click();

  cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost center name*"]').type(
    referenceFieldsName
  );
  cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost center description"]').type(
    referenceFieldsDescription
  );

  cy.get('.cdk-overlay-container dib-cost-center-dialog  ui-control-wrapper .container').click();

  cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label')
    .contains(`${group.employee.firstName} ${group.employee.lastName}`)
    .click();

  cy.get('.cdk-overlay-container dib-cost-center-dialog ui-button').contains('save').click();

  cy.waitForAngular();

  cy.get('dib-company-management dib-reference-fields dib-cost-center').should('contain', referenceFieldsName);
};
