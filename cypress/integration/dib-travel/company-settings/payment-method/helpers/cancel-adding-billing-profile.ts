export const cancelAddingBillingProfile = (): void => {
  cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

  cy.get('.cdk-overlay-container dib-billing-profile-dialog').should('not.exist');
};
