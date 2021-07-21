import { PaymentMethod } from '../../../../models';

describe('Company Settings - Payment Method - Billing Profiles', () => {
  let paymentMethodForm: PaymentMethod;

  before(() => {
    cy.fixture('company-settings/payment-method-form').then((paymentMethodFormDetails) => {
      paymentMethodForm = paymentMethodFormDetails;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/payment-method/billing-profiles');
  });

  it('should display payment method in sidebar menu', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel').contains(' Payment Method ');
  });

  it('submits empty form for creating billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog').should('be.visible');
  });

  it('creates a new billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=legalName]').type(paymentMethodForm.legalName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=taxId]').type(paymentMethodForm.taxId);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=city]').type(paymentMethodForm.city);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select').first().select(paymentMethodForm.country);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=streetName]').type(
      paymentMethodForm.streetName
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=zipcode]').type(paymentMethodForm.zipCode);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactFirstName]').type(
      paymentMethodForm.firstName
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactLastName]').type(
      paymentMethodForm.lastName
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactEmail]').type(paymentMethodForm.email);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethodForm.invoiceRecipientEmail
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=vatNumber]').type(paymentMethodForm.vatNumber);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select').last().select(paymentMethodForm.currency);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[placeholder=Search]').type(
      paymentMethodForm.searchPeopleOrGroup
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .members').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2').should(
      'contain',
      paymentMethodForm.legalName
    );
  });

  it('updates billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2')
      .contains(paymentMethodForm.legalName)
      .first()
      .parents('dib-item')
      .within(() => {
        return cy.get('ui-button').contains('edit').clickAttached();
      });
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=legalName]')
      .clear()
      .type(paymentMethodForm.legalNameUpdate);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2').should(
      'contain',
      paymentMethodForm.legalNameUpdate
    );
  });

  it('closes dialog for request split invoice changes', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2')
      .contains(paymentMethodForm.legalNameUpdate)
      .first()
      .parents('dib-item')
      .within(() => {
        return cy.get('ui-button').contains('Request change').clickAttached();
      });
    cy.get('.cdk-overlay-container dib-invoice-split-dialog button').contains(' Cancel ').click();
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2').should(
      'contain',
      paymentMethodForm.legalNameUpdate
    );
  });

  it('sends a request for split invoice changes (by cost center)', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2')
      .contains(paymentMethodForm.legalNameUpdate)
      .first()
      .parents('dib-item')
      .within(() => {
        return cy.get('ui-button').contains('Request change').clickAttached();
      });
    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', paymentMethodForm.message);
  });

  it('sends a request for split invoice changes (by reference field)', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2')
      .contains(paymentMethodForm.legalNameUpdate)
      .first()
      .parents('dib-item')
      .within(() => {
        return cy.get('ui-button').contains('Request change').clickAttached();
      });
    cy.get('.cdk-overlay-container dib-invoice-split-dialog input[type=radio]').clickAttached();
    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', paymentMethodForm.message);
  });

  it('checks cancellation of confirmation dialog', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2')
      .contains(paymentMethodForm.legalNameUpdate)
      .first()
      .parents('dib-item')
      .within(() => {
        return cy.get('ui-button').contains('archive').clickAttached();
      });
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2').should(
      'contain',
      paymentMethodForm.legalNameUpdate
    );
  });

  it('archives billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2')
      .contains(paymentMethodForm.legalNameUpdate)
      .first()
      .parents('dib-item')
      .within(() => {
        return cy.get('ui-button').contains('archive').clickAttached();
      });
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item h2').should(
      'not.contain',
      paymentMethodForm.legalNameUpdate
    );
  });
});
