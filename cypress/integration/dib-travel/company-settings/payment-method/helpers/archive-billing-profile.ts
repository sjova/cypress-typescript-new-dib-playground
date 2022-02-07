export const archiveBillingProfile = (modifiedEmail: string): void => {
  cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully archived billing profile.');
  cy.get('dib-company-management dib-payment-method dib-billing-profiles .billing-profiles')
    .contains(modifiedEmail)
    .should('not.exist');
};
