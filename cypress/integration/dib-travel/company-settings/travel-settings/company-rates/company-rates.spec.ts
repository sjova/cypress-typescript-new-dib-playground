// TODO: Blocked by bug (DT-11014)

/*import { TravelSettings } from '@cy/models';
import { addDiscount, confirmAddedDiscount, deleteDiscountAndConfirm, editDiscount } from './shared';

describe('Company Settings - Travel Settings - Company Rates', () => {
  let companyRatesDetails: TravelSettings;

  before(() => {
    cy.fixture('company-settings/travel-settings-details').then((companyRatesFixture) => {
      companyRatesDetails = companyRatesFixture;
    });
  });

  beforeEach(() => {
    cy.login();

    cy.visit('/company-management/travel-settings/company-rates');
  });

  it('should confirm form details for adding new discount type', () => {
    cy.get('dib-company-management dib-travel-settings dib-company-rates ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-company-rates-dialog button').contains(' Next ').click();

    cy.get('.cdk-overlay-container dib-company-rates-dialog h2').should('contain', ' Add discount ');
    cy.get('.cdk-overlay-container dib-company-rates-dialog .placeholder')
      .should('contain', 'Discount name')
      .should('contain', 'Car providers')
      .should('contain', 'Discount code');
    cy.get('.cdk-overlay-container dib-company-rates-dialog dib-slide-toggle span').should(
      'contain',
      'Active discount'
    );

    cy.get('.cdk-overlay-container dib-company-rates-dialog button').contains(' Back ').click();

    cy.get('.cdk-overlay-container dib-company-rates-dialog label')
      .should('contain', ' Please select discount type')
      .should('contain', 'Flight (coming soon)')
      .should('contain', 'Hotel (coming soon)')
      .should('contain', 'Train (coming soon)')
      .should('contain', 'Car');
  });

  it('should cancel adding new discount for car type', () => {
    cy.get('dib-company-management dib-travel-settings dib-company-rates ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-company-rates-dialog button').contains(' Cancel ').click();

    cy.get('.cdk-overlay-container dib-company-rates-dialog').should('not.exist');
    cy.get('dib-company-management dib-travel-settings dib-company-rates .grid').should(
      'contain',
      'There are no company rates'
    );
  });

  it('should add discount for car type (Hertz)', () => {
    addDiscount(companyRatesDetails);

    cy.get('.cdk-overlay-container dib-company-rates-dialog ui-dropdown').click();
    cy.get('.cdk-overlay-container .cdk-overlay-pane .item').contains(' Hertz ').click();

    confirmAddedDiscount(companyRatesDetails);
  });

  it('should cancel update discount for car type (Hertz)', () => {
    editDiscount(companyRatesDetails);

    cy.get('.cdk-overlay-container dib-company-rates-dialog button').contains(' Cancel ').click({ force: true });

    cy.get('.cdk-overlay-container dib-company-rates-dialog').should('not.exist');
    cy.get('dib-company-management dib-travel-settings dib-company-rates h4')
      .should('contain', companyRatesDetails.companyRates.discountName)
      .should('contain', 'Active');
  });

  it('should update discount for car type (Hertz)', () => {
    editDiscount(companyRatesDetails);
    cy.get('.cdk-overlay-container dib-company-rates-dialog input[name=discountName')
      .clear()
      .type(companyRatesDetails.companyRates.modifiedDiscountName);

    cy.get('.cdk-overlay-container dib-company-rates-dialog ui-dropdown').click();
    cy.get('.cdk-overlay-container .cdk-overlay-pane .item').contains(' Sixt ').click();
    cy.get('.cdk-overlay-container dib-company-rates-dialog input[name=discountCode')
      .clear()
      .type(companyRatesDetails.companyRates.modifiedDiscountCode);

    cy.get('.cdk-overlay-container dib-company-rates-dialog dib-slide-toggle').click();

    cy.get('.cdk-overlay-container dib-company-rates-dialog button').contains(' Save ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('have.text', 'Company rate successfully saved!');
    cy.get('dib-company-management dib-travel-settings dib-company-rates h4')
      .should('contain', companyRatesDetails.companyRates.modifiedDiscountName)
      .should('contain', 'Inactive');
  });

  it('should check cancellation of confirmation dialog', () => {
    cy.get('dib-company-management dib-travel-settings dib-company-rates dib-page .grid .table-cell h4')
      .contains(companyRatesDetails.companyRates.modifiedDiscountName)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .find('ui-button')
      .contains(' Delete ')
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog-v2 button').contains(' No ').click();

    cy.get('dib-company-management dib-travel-settings dib-company-rates h4')
      .should('contain', companyRatesDetails.companyRates.modifiedDiscountName)
      .should('contain', 'Inactive');
  });

  it('should delete modified discount for car type (Sixt)', () => {
    deleteDiscountAndConfirm(companyRatesDetails);

    cy.get('dib-company-management dib-travel-settings dib-company-rates .grid').should(
      'contain',
      'There are no company rates'
    );
  });

  it('should add discount for car type (Avis)', () => {
    addDiscount(companyRatesDetails);

    cy.get('.cdk-overlay-container dib-company-rates-dialog ui-dropdown').click();
    cy.get('.cdk-overlay-container .cdk-overlay-pane .item').contains(' Avis ').click();

    confirmAddedDiscount(companyRatesDetails);
  });

  it('should add discount for car type (Europcar)', () => {
    addDiscount(companyRatesDetails);

    cy.get('.cdk-overlay-container dib-company-rates-dialog ui-dropdown').click();
    cy.get('.cdk-overlay-container .cdk-overlay-pane .item').contains(' Sixt ').click();

    confirmAddedDiscount(companyRatesDetails);
  });

  it('should search by discount name (valid/invalid)', () => {
    cy.get('dib-company-management dib-travel-settings dib-company-rates input[name=undefined]').type(
      companyRatesDetails.companyRates.discountName
    );

    cy.get('dib-company-management dib-travel-settings dib-company-rates h4').should(
      'contain',
      companyRatesDetails.companyRates.discountName
    );

    cy.get('dib-company-management dib-travel-settings dib-company-rates input[name=undefined]').type(
      companyRatesDetails.companyRates.modifiedDiscountName
    );

    cy.get('dib-company-management dib-travel-settings dib-company-rates h4').should('not.exist');
  });

  it('should sort discounts for car type', () => {
    editDiscount(companyRatesDetails);

    cy.get('.cdk-overlay-container dib-company-rates-dialog input[name=discountName')
      .clear()
      .type(companyRatesDetails.companyRates.modifiedDiscountName);

    cy.get('.cdk-overlay-container dib-company-rates-dialog button').contains(' Save ').click();

    cy.get('dib-company-management dib-travel-settings dib-company-rates .grid').contains(' Discount name ').click();

    cy.get('dib-company-management dib-travel-settings dib-company-rates .grid h4:first').should(
      'have.text',
      companyRatesDetails.companyRates.modifiedDiscountName
    );

    cy.get('dib-company-management dib-travel-settings dib-company-rates .grid').contains(' Discount name ').click();

    cy.get('dib-company-management dib-travel-settings dib-company-rates .grid h4:first').should(
      'have.text',
      companyRatesDetails.companyRates.discountName
    );
  });

  it('should delete discounts for car type (Sixt/Avis)', () => {
    editDiscount(companyRatesDetails);

    cy.get('.cdk-overlay-container dib-company-rates-dialog input[name=discountName')
      .clear()
      .type(companyRatesDetails.companyRates.modifiedDiscountName);

    cy.get('.cdk-overlay-container dib-company-rates-dialog button').contains(' Save ').click();

    deleteDiscountAndConfirm(companyRatesDetails);
    deleteDiscountAndConfirm(companyRatesDetails);

    cy.get('dib-company-management dib-travel-settings dib-company-rates .grid').should(
      'contain',
      'There are no company rates'
    );
  });
});*/
