import { PaymentMethod } from '../../../../models';

describe('Company Settings - Payment Method - Lodge Cards', () => {
  let paymentMethodForm: PaymentMethod;

  before(() => {
    cy.fixture('company-settings/payment-method-form').then((paymentMethodFormDetails) => {
      paymentMethodForm = paymentMethodFormDetails;
    });
  });

  beforeEach(() => {
    cy.loginAgent();
    cy.visit('/company-management/payment-method/lodge-cards');
  });
  // TODO: Cypress cannot see any elements on this page and all tests below failed.
  it('should display payment method in sidebar menu', () => {
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
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button button').contains(' Cancel ').click();
    cy.get('dib-company-management dib-payment-method dib-lodge-cards h1').should('contain', ' Lodge Cards ');
  });

  it('creates a new lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=companyLegalName]').type(
      paymentMethodForm.legalName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=companyRegistrationNumber]').type(
      paymentMethodForm.companyRegistrationNumber
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=vatNumber]').type(paymentMethodForm.vatNumber);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=addressLine]').type(paymentMethodForm.streetName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=postalCode]').type(paymentMethodForm.zipCode);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=city]').type(paymentMethodForm.city);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains(paymentMethodForm.country)
      .click();
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.country)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactFirstName]').type(
      paymentMethodForm.firstName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactLastName]').type(paymentMethodForm.lastName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactEmail]').type(paymentMethodForm.email);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains(paymentMethodForm.cardProvider)
      .click();
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.cardProvider)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=lodgeCardName]').type(
      paymentMethodForm.lodgeCardName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=creditCardNumber]').type(
      paymentMethodForm.cardNumber
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains(paymentMethodForm.month)
      .click();
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.month)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains(paymentMethodForm.year)
      .click();
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.year)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains(paymentMethodForm.currency)
      .click();
    cy.get('.cdk-overlay-container ui-panel .cdk-virtual-scroll-content-wrapper')
      .contains(paymentMethodForm.currency)
      .click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethodForm.email
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethodForm.firstName
    );
  });

  it('updates lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item')
      .contains(paymentMethodForm.firstName)
      .first()
      .parents('dib-lodge-cards')
      .within(() => {
        return cy.get('ui-button').contains('edit').click();
      });
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactFirstName]')
      .clear()
      .type(paymentMethodForm.firstNameUpdate);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethodForm.firstNameUpdate
    );
  });

  it('archives lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item')
      .contains(paymentMethodForm.firstName)
      .first()
      .parents('dib-lodge-cards')
      .within(() => {
        return cy.get('ui-button').contains(' archive ').click();
      });
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'not.contain',
      paymentMethodForm.firstNameUpdate
    );
  });
});
