import { GenericProduct } from '@cy/models';

export const deleteGenericProduct = (genericProduct: GenericProduct): void => {
  cy.visitAngularUrl('/my-travels/active');

  cy.get('app-my-travels dib-travels-list .item .name')
    .contains(genericProduct.serviceName)
    .parents('dib-travels-list')
    .find('a .button__label')
    .contains('View more')
    .click();

  cy.get('dib-layout dib-trip-item-generic-product i').contains('keyboard_arrow_down').click();

  cy.get(' dib-cart dib-trip-item .booking-actions img').click();

  cy.get('.cdk-overlay-container confirmation-dialog button').contains(' Delete ').click();

  cy.get('.cdk-overlay-container simple-snack-bar > span').should('have.text', 'Travel successfully deleted');
  cy.get('dib-cart-wrapper dib-trip-item-generic-product').should('not.exist');
  cy.get('app-my-travels dib-travels-list .table-container.empty-list .empty-trips-section').should(
    'contain',
    " You don't have any active travels, but you can always create one "
  );
};
