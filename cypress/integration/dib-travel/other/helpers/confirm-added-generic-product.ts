import { GenericProduct } from '@cy/models';

export const confirmAddedGenericProduct = (genericProduct: GenericProduct): void => {
  cy.get('.cdk-overlay-container simple-snack-bar > span').should('have.text', 'Item added to cart');

  cy.get('dib-layout dib-cart-item-generic-product-v2 i').contains('keyboard_arrow_down').click();

  cy.get('dib-cart-wrapper dib-cart-item-generic-product-v2 p')
    .should('contain', 'Ready for payment')
    .should('contain', genericProduct.serviceName)
    .should('contain', genericProduct.description)
    .should('contain', 'Agent Reservation');
  cy.get('dib-layout dib-cart-item-generic-product-v2 .details dib-booking-dates-v2')
    .should('contain', 1)
    .should('contain', 2)
    .should('contain', ' 12: 12 ');
  cy.get('dib-layout dib-cart-item-generic-product-v2 span').should('contain', genericProduct.totalPrice, 'RSD');
};
