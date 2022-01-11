import { GenericProduct } from '@cy/models';

export const deleteGenericProduct = (genericProduct: GenericProduct): void => {
  cy.visit('/my-travels/active');

  cy.waitForAngular();

  cy.get('app-my-travels dib-travels-list .item .name')
    .contains(genericProduct.serviceName)
    .parents('dib-travels-list')
    .find('a .button__label')
    .contains('View more')
    .click();

  cy.get('dib-cart-wrapper dib-cart-checkout-header .travel-id-box img').click();

  cy.get('.cdk-overlay-container confirmation-dialog button').contains(' Delete ').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('have.text', 'Travel successfully deleted');
  cy.get('dib-cart-wrapper dib-cart-item-generic-product-v2').should('not.exist');
  cy.get('app-my-travels dib-travels-list .table-container.empty-list .empty-trips-section').should(
    'contain',
    " You don't have any active travels, but you can always create one "
  );
};
