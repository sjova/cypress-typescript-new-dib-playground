export const cancelCardFormAndConfirm = (): void => {
  cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button').contains(' Cancel ').click();

  cy.get('.cdk-overlay-container dib-lodge-card-dialog').should('not.exist');
};
