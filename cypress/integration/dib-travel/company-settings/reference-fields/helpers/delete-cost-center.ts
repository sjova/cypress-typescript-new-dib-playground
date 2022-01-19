export const deleteCostCenter = (referenceFields: string) => {
  cy.waitForAngular();

  cy.get('dib-company-management dib-reference-fields dib-cost-center .table-cell h4')
    .contains(referenceFields)
    .parent('.table-cell')
    .next('.table-cell')
    .next('.table-cell')
    .next('.button-cell')
    .contains(' Archive ')
    .click();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning').click();
};
