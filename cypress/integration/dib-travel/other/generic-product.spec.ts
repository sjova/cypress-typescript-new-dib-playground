import { GenericProduct } from '@cy/models';
import { addGenericProduct, confirmAddedGenericProduct, deleteGenericProduct, tooltip } from './helpers';

describe('Other - Generic Product', () => {
  let genericProduct: GenericProduct;

  const selectForAddingGenericProduct = (containerItem: string): void => {
    cy.get('home dib-generic-product-form ui-control-wrapper label')
      .contains(containerItem)
      .parents('ui-control-wrapper')
      .click();
  };

  const selectForEditingGenericProduct = (containerItem: string): void => {
    cy.get('.cdk-overlay-container dib-generic-product-form ui-control-wrapper label')
      .contains(containerItem)
      .parents('ui-control-wrapper')
      .click();
  };

  before(() => {
    cy.fixture('other/generic-product').then((genericProductFixture) => {
      genericProduct = genericProductFixture;
    });
  });

  beforeEach(() => {
    cy.loginAgent();

    cy.get('home dib-product-pickers dib-tabs-header .label').contains('Other').click();
  });

  it('should display "Other" in the navbar', () => {
    cy.get('home dib-product-pickers dib-tabs-header .label').contains('Other').should('exist');
  });

  it('should display Other page', () => {
    cy.get('home dib-generic-product-form button').contains('Add to cart').should('exist');
  });

  it('should display link for restrictions before booking', () => {
    cy.get('home dib-covid-banner span').should(
      'have.text',
      'Get the latest travel and health restrictions before booking your trip.'
    );
    cy.get('home dib-covid-banner a[href="https://apply.joinsherpa.com/travel-restrictions"]').should(
      'have.text',
      ' Find out now '
    );
  });

  it('should not be able to submit an empty generic product form', () => {
    cy.get('home dib-generic-product-form ui-button[type=primary]').click();

    cy.get('home dib-generic-product-form ui-input .required-error').should('contain', 'This field is required');
  });

  it('should check content of tooltips for generic product form', () => {
    tooltip(0);

    cy.get('.tooltip-content').should(
      'contain',
      'Used for reconciliation and search in backoffice - PUT IN THE TICKET NR'
    );

    tooltip(1);

    cy.get('.tooltip-content').should(
      'contain',
      'Used for updating an existing travel shopping cart - defined by entering its Trip ID'
    );

    tooltip(2);

    cy.get('.tooltip-content').should('contain', 'For hotels only');

    tooltip(3);

    cy.get('.tooltip-content').should(
      'contain',
      'Choose if sale is done as “Passthrough” (i.e. cannot add markup & not legally responsibility for service) or “In own name” (possible to mark-up price to customer & legally responsible for service'
    );

    tooltip(5);

    cy.get('.tooltip-content').should('contain', 'Set in traveler profile');

    tooltip(6);

    cy.get('.tooltip-content').should('contain', 'Set in traveler profile');
  });

  it('should add generic product to cart (Sales model - Own name)', () => {
    addGenericProduct(genericProduct);

    selectForAddingGenericProduct('Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Bus ').click();

    selectForAddingGenericProduct('Sub Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Bus inside Sweden ').click();

    selectForAddingGenericProduct('Sales model');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Own name ').click();

    cy.get('home dib-generic-product-form input[name=purchasePrice]').type(genericProduct.purchasePrice);

    cy.get('home dib-generic-product-form ui-button[type=primary]').click();

    confirmAddedGenericProduct(genericProduct);

    cy.get('dib-layout dib-cart-item-generic-product-v2 h2').should('contain', 'Bus', 'in Sweden');
  });

  it('should delete generic product (Sales model - Own name)', () => {
    deleteGenericProduct(genericProduct);
  });

  it('should add generic product to cart (Sales model - Passthrough)', () => {
    addGenericProduct(genericProduct);

    selectForAddingGenericProduct('Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Bus ').click();

    selectForAddingGenericProduct('Sub Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Bus inside Sweden ').click();

    selectForAddingGenericProduct('Sales model');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Passthrough ').click();

    cy.get('home dib-generic-product-form ui-button[type=primary]').click();

    confirmAddedGenericProduct(genericProduct);

    cy.get('dib-layout dib-cart-item-generic-product-v2 h2').should('contain', 'Bus', 'in Sweden');
  });

  it('should delete generic product (Sales model - Passthrough)', () => {
    deleteGenericProduct(genericProduct);
  });

  it('should add generic product to cart (Category - Flight taxi)', () => {
    addGenericProduct(genericProduct);

    selectForAddingGenericProduct('Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Flight Taxi ').click();

    selectForAddingGenericProduct('Sub Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Flight taxi inside Sweden ').click();

    cy.get('home dib-generic-product-form ui-control-wrapper label')
      .contains('Vendor')
      .parents('ui-control-wrapper')
      .type('Flygtaxi');

    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Flygtaxi Sverige AB ').click();

    selectForAddingGenericProduct('Sales model');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Passthrough ').click();

    cy.get('home dib-generic-product-form ui-radio span').contains('ARRIVAL').click();
    cy.get('home dib-generic-product-form input[placeholder="Enter a location"]')
      .last()
      .type(genericProduct.serviceLocationCity);
    cy.get('.pac-container .pac-item').contains(genericProduct.serviceLocationCity).click();

    selectForAddingGenericProduct('Provider code');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains('TAXI ').click();

    cy.get('home dib-generic-product-form input[name=airportCode]').type(genericProduct.airportCode);

    cy.get('home dib-generic-product-form ui-button[type=primary]').click();

    confirmAddedGenericProduct(genericProduct);

    cy.get('dib-layout dib-cart-item-generic-product-v2 h2').should('contain', 'Flight taxi', 'in Sweden');
  });

  it('should edit generic product (Category - Flight taxi)', () => {
    cy.visit('/my-travels/active');

    cy.get('app-my-travels dib-travels-list .item .name')
      .contains(genericProduct.serviceName)
      .parents('dib-travels-list')
      .find('a .button__label')
      .contains('View more')
      .click();

    cy.get('dib-cart-wrapper dib-cart-item-generic-product-v2 i').contains('keyboard_arrow_down').click();

    cy.get('dib-cart-wrapper dib-cart-item-generic-product-v2 button').contains(' Edit ').click();

    cy.get('.cdk-overlay-container dib-generic-product-form input[name=serviceName]')
      .clear()
      .type(genericProduct.modifiedGenericProduct.serviceName);

    cy.get('.cdk-overlay-container dib-generic-product-form ui-control-wrapper label')
      .contains('Vendor')
      .parents('ui-control-wrapper')
      .type('Svea');

    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Svea Taxi Allians AB ').click();

    selectForEditingGenericProduct('Traveler type');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains('GROUP ').click();

    selectForEditingGenericProduct('Provider source');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains('Amadeus ').click();

    cy.get('.cdk-overlay-container dib-generic-product-form input[name=bookingReferenceId]')
      .clear()
      .type(genericProduct.modifiedGenericProduct.bookingReferenceId);

    cy.get('.cdk-overlay-container dib-generic-product-form .checkmark').click();

    cy.get('.cdk-overlay-container dib-generic-product-form span').contains('01').click();
    cy.get('.cdk-overlay-container ui-date-picker-calendar-v2 span').contains(3).click();
    // Computed size is zero, and we need to use `{ force: true }`
    cy.get('.cdk-overlay-container .cdk-overlay-backdrop').last().click({ force: true });
    cy.get('.cdk-overlay-container dib-generic-product-form input[name=hours]')
      .clear()
      .type(genericProduct.modifiedGenericProduct.hours);
    cy.get('.cdk-overlay-container dib-generic-product-form input[name=minutes]')
      .clear()
      .type(genericProduct.modifiedGenericProduct.minutes);

    cy.get('.cdk-overlay-container dib-generic-product-form ui-textarea')
      .clear()
      .type(genericProduct.modifiedGenericProduct.description);

    selectForEditingGenericProduct('Sales model');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Own name ').click();

    cy.get('.cdk-overlay-container dib-generic-product-form input[name=totalPrice]')
      .clear()
      .type(genericProduct.modifiedGenericProduct.totalPrice);
    cy.get('.cdk-overlay-container dib-generic-product-form input[name=purchasePrice]')
      .clear()
      .type(genericProduct.modifiedGenericProduct.purchasePrice);

    cy.get('.cdk-overlay-container dib-generic-product-form input[placeholder="Enter a location"]:first')
      .clear()
      .type(genericProduct.modifiedGenericProduct.serviceLocationCity);
    cy.get('.pac-container .pac-item').contains(genericProduct.modifiedGenericProduct.serviceLocationCity).click();

    cy.get('.cdk-overlay-container dib-generic-product-form ui-radio span').contains('DEPARTURE').click();
    cy.get('.cdk-overlay-container dib-generic-product-form input[placeholder="Enter a location"]:last')
      .last()
      .clear()
      .type(genericProduct.modifiedGenericProduct.serviceLocationCity);
    cy.get('.pac-container .pac-item').contains(genericProduct.modifiedGenericProduct.serviceLocationCity).click();

    selectForEditingGenericProduct('Provider code');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains('SVEA ').click();

    cy.get('.cdk-overlay-container dib-generic-product-form input[name=airportCode]')
      .clear()
      .type(genericProduct.modifiedGenericProduct.airportCode);

    cy.get('.cdk-overlay-container dib-generic-product-form ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('have.text', 'Item changed');

    cy.get('dib-cart-wrapper dib-cart-item-generic-product-v2 p')
      .should('contain', 'Ready for payment')
      .should('contain', genericProduct.modifiedGenericProduct.serviceName)
      .should('contain', genericProduct.modifiedGenericProduct.description)
      .should('contain', 'Agent Reservation');
    cy.get('dib-layout dib-cart-item-generic-product-v2 .details dib-booking-dates-v2')
      .should('contain', 3)
      .should('contain', 3)
      .should('contain', ' 15: 15 ');
    cy.get('dib-layout dib-cart-item-generic-product-v2 span').should(
      'contain',
      genericProduct.modifiedGenericProduct.totalPrice,
      'RSD'
    );
    cy.get('dib-cart-wrapper dib-cart-item-generic-product-v2 h2').should('contain', 'Flight taxi', 'in Sweden');
  });

  it('should delete generic product (Category - Flight taxi)', () => {
    deleteGenericProduct(genericProduct);
  });

  it('should not be able to add generic product with bad Vendor for flight taxi', () => {
    addGenericProduct(genericProduct);

    selectForAddingGenericProduct('Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Flight Taxi ').click();

    selectForAddingGenericProduct('Sub Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Flight taxi inside Sweden ').click();

    cy.get('home dib-generic-product-form ui-control-wrapper label')
      .contains('Vendor')
      .parents('ui-control-wrapper')
      .type('City');

    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' City Taxi i Skellefteå ').click();

    selectForAddingGenericProduct('Sales model');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Passthrough ').click();

    cy.get('home dib-generic-product-form ui-radio span').contains('ARRIVAL').click();
    cy.get('home dib-generic-product-form input[placeholder="Enter a location"]')
      .last()
      .type(genericProduct.serviceLocationCity);
    cy.get('.pac-container .pac-item').contains(genericProduct.serviceLocationCity).click();

    selectForAddingGenericProduct('Provider code');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains('TAXI ').click();

    cy.get('home dib-generic-product-form input[name=airportCode]').type(genericProduct.airportCode);

    cy.get('home dib-generic-product-form ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('have.text', 'Bad vendor for flight taxi');
  });

  it('should not be able to add generic product with incorrect Trip ID', () => {
    addGenericProduct(genericProduct);

    selectForAddingGenericProduct('Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Cruise ').click();

    selectForAddingGenericProduct('Sub Category');
    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Cruise outside of Sweden ').click();

    selectForAddingGenericProduct('Sales model');

    cy.get('.cdk-overlay-container cdk-virtual-scroll-viewport .item').contains(' Passthrough ').click();

    cy.get('home dib-generic-product-form input[name=tripId]').type(genericProduct.tripId);

    cy.get('home dib-generic-product-form ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'have.text',
      'Something went wrong, please try again'
    );
  });
});
