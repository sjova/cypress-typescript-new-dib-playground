export const cancelAddingCreditCard = (): void => {
  cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button').contains('Cancel').click();

  cy.get('.cdk-overlay-container dib-add-credit-card-dialog').should('not.exist');
};
