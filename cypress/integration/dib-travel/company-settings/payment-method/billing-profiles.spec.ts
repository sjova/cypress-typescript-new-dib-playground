import { getEmailWithHash } from '../../../../helpers';
import { PaymentMethod } from '../../../../models';
import { archiveBillingProfile, requestSplitInvoiceChange } from './helpers';

describe('Company Settings - Payment Method - Billing Profiles', () => {
  let paymentMethod: PaymentMethod;

  before(() => {
    cy.fixture('company-settings/payment-method').then((paymentMethodFixture) => {
      paymentMethod = {
        ...paymentMethodFixture,
        primaryContact: {
          ...paymentMethodFixture.primaryContact,
          email: getEmailWithHash(paymentMethodFixture.primaryContact.email),
          modifiedEmail: getEmailWithHash(paymentMethodFixture.primaryContact.modifiedEmail),
        },
        invoiceRecipient: {
          ...paymentMethodFixture.invoiceRecipient,
          email: getEmailWithHash(paymentMethodFixture.invoiceRecipient.email),
        },
      };
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/payment-method/billing-profiles');
  });

  it('should add a billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=legalName]').type(
      paymentMethod.companyInformation.companyLegalName
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=taxId]').type(
      paymentMethod.companyInformation.taxId
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=city]').type(
      paymentMethod.companyInformation.city
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select')
      .first()
      .select(paymentMethod.companyInformation.country);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=streetName]').type(
      paymentMethod.companyInformation.address
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=zipcode]').type(
      paymentMethod.companyInformation.zipCode
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactFirstName]').type(
      paymentMethod.primaryContact.firstName
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactLastName]').type(
      paymentMethod.primaryContact.lastName
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactEmail]').type(
      paymentMethod.primaryContact.email
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethod.invoiceRecipient.email
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=vatNumber]').type(
      paymentMethod.invoiceRecipient.vatNumber
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select')
      .last()
      .select(paymentMethod.lodgeCardDetails.currency);
    // TODO: This should be revisited (we should use `person` and `groupName`)
    // Also, group should be created (`before`) and removed (`after`) properly
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[placeholder=Search]').type(paymentMethod.groupName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .members').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    // TODO: Confirm snackbar message (double-check?)
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethod.primaryContact.email
    );
  });

  it('should update a billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content')
      .contains(paymentMethod.primaryContact.email)
      .parents('dib-item')
      .find('ui-button')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactFirstName]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedFirstName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactLastName]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedLastName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactEmail]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedEmail);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    // TODO: Confirm snackbar message (double-check?)
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethod.primaryContact.modifiedEmail
    );
  });

  // TODO: Revisit test or description
  it('should close dialog for request split invoice changes', () => {
    requestSplitInvoiceChange(paymentMethod.primaryContact.modifiedEmail);

    cy.get('.cdk-overlay-container dib-invoice-split-dialog button').contains(' Cancel ').click();

    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethod.primaryContact.modifiedEmail
    );
  });

  it('should send request for split invoice changes (by cost center)', () => {
    requestSplitInvoiceChange(paymentMethod.primaryContact.modifiedEmail);

    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully updated billing profile.');
  });

  it('should send request for split invoice changes (by reference field)', () => {
    requestSplitInvoiceChange(paymentMethod.primaryContact.modifiedEmail);

    cy.get('.cdk-overlay-container dib-invoice-split-dialog input[type=radio]').clickAttached();
    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully updated billing profile.');
  });

  // TODO: Revisit test or description
  it('should try to submit empty form for creating billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog').should('be.visible');
  });

  // TODO: Revisit test or description
  it('should check cancellation of confirmation dialog', () => {
    archiveBillingProfile(paymentMethod.primaryContact.modifiedEmail);

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethod.primaryContact.modifiedEmail
    );
  });

  it('should archive a billing profile', () => {
    archiveBillingProfile(paymentMethod.primaryContact.modifiedEmail);

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    // TODO: Confirm snackbar message (double-check?)
    cy.get('dib-company-management dib-payment-method dib-billing-profiles .billing-profiles').should(
      'contain',
      ' You have not added any billing profiles yet. '
    );
  });
});
