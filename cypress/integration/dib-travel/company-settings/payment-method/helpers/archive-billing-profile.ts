export const archiveBillingProfile = (): void => {
  cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully archived billing profile.');
  cy.get('dib-company-management dib-payment-method dib-billing-profiles .billing-profiles').should(
    'contain',
    ' You have not added any billing profiles yet. '
  );
};
