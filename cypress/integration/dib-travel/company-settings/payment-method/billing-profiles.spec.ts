import { getEmailWithHash } from '../../../../helpers';
import { PaymentMethod } from '../../../../models';
import { clickBillingProfileCtaAction } from './helpers';

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

  // TODO: It should cancel the adding billing profile
  // note: upper right close button

  it('should not be able to submit an empty billing profile form', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    // TODO: We should confirm all required fields (one by one)
    // TODO: Confirm snackbar message: "Please fill out all required fields"
    // TODO: Remove bellow dummy test
    cy.get('.cdk-overlay-container dib-billing-profile-dialog').should('be.visible');
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
      .select(paymentMethod.lodgeCard.currency);
    // TODO: This should be revisited (we should use `person` and `groupName`)
    // Also, group should be created (`before`) and removed (`after`) properly
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[placeholder=Search]').type(paymentMethod.groupName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .members').click();
    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    // TODO: Confirm snackbar message: "Successfully added billing profile"
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethod.primaryContact.email
    );
  });

  it('should update a billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.email, 'edit');

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

    // TODO: Confirm snackbar message: "Successfully updated billing profile"
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content').should(
      'contain',
      paymentMethod.primaryContact.modifiedEmail
    );
  });

  it('should cancel the request split invoice change', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'Request change');

    cy.get('.cdk-overlay-container dib-invoice-split-dialog button').contains(' Cancel ').click();

    cy.get('.cdk-overlay-container dib-invoice-split-dialog').should('not.exist');
  });

  it('should send the request split invoice change (by cost center)', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'Request change');

    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully updated billing profile.');
  });

  it('should send the request split invoice change (by reference field)', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'Request change');

    cy.get('.cdk-overlay-container dib-invoice-split-dialog input[type=radio]').clickAttached();
    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully updated billing profile.');
  });

  it('should cancel the archiving billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'archive');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('.cdk-overlay-container confirmation-dialog').should('not.exist');
  });

  it('should archive a billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'archive');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    // TODO: Confirm snackbar message: "Successfully archived billing profile"
    cy.get('dib-company-management dib-payment-method dib-billing-profiles .billing-profiles').should(
      'contain',
      ' You have not added any billing profiles yet. '
    );
  });
});
