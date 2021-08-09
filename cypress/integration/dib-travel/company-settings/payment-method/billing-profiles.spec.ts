import { PaymentMethod } from '../../../../models';

describe('Company Settings - Payment Method - Billing Profiles', () => {
  let paymentMethodForm: PaymentMethod;

  const requestForSplitInvoiceChanges = () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content')
      .contains(paymentMethodForm.primaryContactInformation.modifiedEmail)
      .parents('dib-item')
      .find('ui-button')
      .contains('Request change')
      .clickAttached();
  };

  const openArchiveBillingProfileForm = () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content')
      .contains(paymentMethodForm.primaryContactInformation.modifiedEmail)
      .parents('dib-item')
      .find('ui-button')
      .contains('archive')
      .clickAttached();
  };

  before(() => {
    cy.fixture('company-settings/payment-method-form').then((paymentMethodFixture) => {
      paymentMethodForm = paymentMethodFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/payment-method/billing-profiles');
  });

  it('should create billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=legalName]').type(
      paymentMethodForm.companyInformation.companyLegalName
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=taxId]').type(
      paymentMethodForm.companyInformation.taxId
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=city]').type(
      paymentMethodForm.companyInformation.city
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select')
      .first()
      .select(paymentMethodForm.companyInformation.country);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=streetName]').type(
      paymentMethodForm.companyInformation.address
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=zipcode]').type(
      paymentMethodForm.companyInformation.zipCode
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactFirstName]').type(
      paymentMethodForm.primaryContactInformation.firstName
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactLastName]').type(
      paymentMethodForm.primaryContactInformation.lastName
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactEmail]').type(
      paymentMethodForm.primaryContactInformation.email
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethodForm.invoices.invoiceRecipientEmail
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=vatNumber]').type(
      paymentMethodForm.companyInformation.vatNumber
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select')
      .last()
      .select(paymentMethodForm.currencies.currency);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[placeholder=Search]').type(
      paymentMethodForm.search.searchPeopleOrGroup
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .members').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethodForm.primaryContactInformation.email
    );
  });

  it('should update billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content')
      .contains(paymentMethodForm.primaryContactInformation.email)
      .parents('dib-item')
      .find('ui-button')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactFirstName]')
      .clear()
      .type(paymentMethodForm.primaryContactInformation.modifiedFirstName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactLastName]')
      .clear()
      .type(paymentMethodForm.primaryContactInformation.modifiedLastName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactEmail]')
      .clear()
      .type(paymentMethodForm.primaryContactInformation.modifiedEmail);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethodForm.primaryContactInformation.modifiedEmail
    );
  });

  it('should close dialog for request split invoice changes', () => {
    requestForSplitInvoiceChanges();

    cy.get('.cdk-overlay-container dib-invoice-split-dialog button').contains(' Cancel ').click();

    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethodForm.primaryContactInformation.modifiedEmail
    );
  });

  it('should send request for split invoice changes (by cost center)', () => {
    requestForSplitInvoiceChanges();

    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully updated billing profile.');
  });

  it('should send request for split invoice changes (by reference field)', () => {
    requestForSplitInvoiceChanges();

    cy.get('.cdk-overlay-container dib-invoice-split-dialog input[type=radio]').clickAttached();
    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully updated billing profile.');
  });

  it('should try to submit empty form for creating billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog').should('be.visible');
  });

  it('should check cancellation of confirmation dialog', () => {
    openArchiveBillingProfileForm();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethodForm.primaryContactInformation.modifiedEmail
    );
  });

  it('should archive billing profile', () => {
    openArchiveBillingProfileForm();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    cy.get('dib-company-management dib-payment-method dib-billing-profiles .billing-profiles').should(
      'contain',
      ' You have not added any billing profiles yet. '
    );
  });
});
