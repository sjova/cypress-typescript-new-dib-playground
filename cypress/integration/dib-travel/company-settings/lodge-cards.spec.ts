import { PaymentMethod } from '../../../models';

describe('Company Settings - Payment Method - Lodge Cards', () => {
  let paymentMethodForm: PaymentMethod;

  before(() => {
    cy.fixture('company-settings/payment-method-form').then((paymentMethodFormDetails) => {
      paymentMethodForm = paymentMethodFormDetails;
    });
  });

  beforeEach(() => {
    cy.loginAgent();
    cy.clearCookies();
    cy.visit('/company-management/payment-method/lodge-cards');
  });
  //TODO: Cypress cannot see any elements on this page.
  it('should display company settings/payment method in navbar menu', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel').contains(' Payment Method ');
  });

  it('submits empty form for creating lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog').should('be.visible');
  });

  it('closes dialog for creating lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button').contains(' Cancel ').click();
    cy.get('dib-company-management dib-payment-method dib-lodge-cards h1').should('contain', ' Lodge Cards ');
  });

  it('creates a new lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=companyLegalName]').type(
      paymentMethodForm.legalName
    );
    cy.get(
      '.cdk-overlay-container dib-payment-method dib-lodge-card-dialog input[name=companyRegistrationNumber]'
    ).type(paymentMethodForm.companyRegistrationNumber);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=vatNumber]').type(paymentMethodForm.vatNumber);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=addressLine]').type(paymentMethodForm.streetName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=postalCode]').type(paymentMethodForm.zipcode);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=city]').type(paymentMethodForm.city);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog .dib-select').first().select(paymentMethodForm.country);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactFirstName]').type(
      paymentMethodForm.firstName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactLastName]').type(paymentMethodForm.lastName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactEmail]').type(paymentMethodForm.email);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog .container').select(paymentMethodForm.cardProvider);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=lodgeCardName]').select(
      paymentMethodForm.lodgeCardName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=creditCardNumber]').type(
      paymentMethodForm.cardNumber
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .selected').select(paymentMethodForm.month);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .selected').select(paymentMethodForm.year);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog .cdk-virtual-scroll-content-wrapper')
      .last()
      .select(paymentMethodForm.currency);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethodForm.email
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-payment-method dib-lodge-cards .card__name').should(
      'contain',
      paymentMethodForm.firstName
    );
  });

  it('deletes lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards .card__name')
      .contains(paymentMethodForm.firstName)
      .parents('dib-credit-card')
      .within(() => {
        return cy.get('ui-button').contains('Delete').click();
      });
    cy.get('dib-company-management dib-payment-method dib-lodge-cards .card__name').should(
      'not.contain',
      paymentMethodForm.firstName
    );
  });
});
