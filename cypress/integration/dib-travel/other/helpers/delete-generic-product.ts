import { GenericProduct } from '@cy/models';

export const deleteGenericProduct = (genericProduct: GenericProduct): void => {
  cy.visit('/my-travels/active');

  cy.get('app-my-travels dib-travels-list .item .name')
    .contains(genericProduct.serviceName)
    .parents('dib-travels-list')
    .find('a .button__label')
    .contains('View more')
    .click();

  cy.get('dib-layout dib-cart-checkout-header .travel-id-box img').click();
  cy.get('.cdk-overlay-container confirmation-dialog button').contains(' Delete ').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Travel successfully deleted');
};
