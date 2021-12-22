import { GenericProduct } from '@cy/models';

const startDate = 1;
const endDate = 2;

export const addGenericProduct = (genericProduct: GenericProduct) => {
  cy.get('home dib-generic-product-form input[name=serviceName]').type(genericProduct.serviceName);

  cy.get('home dib-generic-product-form input[name=bookingReferenceId]').type(genericProduct.bookingReferenceId);
  cy.get('home dib-generic-product-form .checkmark').click();
  cy.get('home dib-generic-product-form h5').contains('Start date').click();
  cy.get('.cdk-overlay-container ui-date-picker-calendar-v2 span').contains(startDate).click();
  // Computed size is zero, and we need to use `{ force: true }`
  cy.get('.cdk-overlay-container .cdk-overlay-backdrop').click({ force: true });
  cy.get('home dib-generic-product-form input[name=hours]:first').clear().type(genericProduct.hours);
  cy.get('home dib-generic-product-form input[name=minutes]:first').clear().type(genericProduct.minutes);
  cy.get('home dib-generic-product-form h5').contains('End date').click();
  cy.get('.cdk-overlay-container ui-date-picker-calendar-v2 span').contains(endDate).click();
  // Computed size is zero, and we need to use `{ force: true }`
  cy.get('.cdk-overlay-container .cdk-overlay-backdrop').click({ force: true });
  cy.get('home dib-generic-product-form input[name=hours]:last').clear().type(genericProduct.hours);
  cy.get('home dib-generic-product-form input[name=minutes]:last').clear().type(genericProduct.minutes);
  cy.get('home dib-generic-product-form ui-textarea').type(genericProduct.description);
  cy.get('home dib-generic-product-form input[name=totalPrice]').type(genericProduct.totalPrice);
  cy.get('home dib-generic-product-form input[placeholder="Enter a location"]').type(
    genericProduct.serviceLocationCity
  );
  cy.get('.pac-container .pac-item').contains(genericProduct.serviceLocationCity).click();
};
