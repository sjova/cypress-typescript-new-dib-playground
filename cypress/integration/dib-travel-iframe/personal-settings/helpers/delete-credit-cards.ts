export const deleteCreditCards = (creditCard: string): void => {
  cy.waitForAngular();

  cy.get('dib-profile dib-payment dib-credit-card .card__number-box')
    .contains(creditCard.slice(-4))
    .parents('dib-credit-card')
    .find('ui-button')
    .contains(' remove ')
    .click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Card Deleted');

  cy.get('dib-profile dib-payment dib-credit-card .card__number-box').should('not.exist');
};
