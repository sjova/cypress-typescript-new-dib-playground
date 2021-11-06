export const submitEmptyForm = (): void => {
  cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Please fill out all required fields');
  cy.get('.cdk-overlay-container dib-billing-profile-dialog dib-input .dib-input-error').should('contain', 'Required');
};
