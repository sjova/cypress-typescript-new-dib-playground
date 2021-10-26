import { getEmailWithHash, getFirstWord } from '@cy/helpers';
import { Group, PaymentMethod } from '@cy/models';
import { addGroup, deleteGroup } from '../../company-employees';
import { clickBillingProfileCtaAction } from './helpers';

describe('Company Settings - Payment Method - Billing Profiles', () => {
  let paymentMethod: PaymentMethod;
  let group: Group;

  before(() => {
    cy.fixture('company-employees/group').then((groupFixture) => {
      group = groupFixture;
    });

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
          modifiedEmail: getEmailWithHash(paymentMethodFixture.invoiceRecipient.modifiedEmail),
        },
      };
    });
  });

  // TODO: Rethink a better way to execute prepare data actions instead of duplicated `before()`
  // Maybe load multiple fixtures and then execute prepare actions
  // eslint-disable-next-line mocha/no-sibling-hooks
  before(() => {
    cy.login();
    cy.visit('/people-management/groups');

    addGroup(group.name, group.description, false);

    cy.resetState();
  });

  after(() => {
    cy.resetState();

    cy.login();
    cy.visit('/people-management/groups');

    cy.waitForAngular();

    deleteGroup(group.name);
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/payment-method/billing-profiles');

    cy.waitForAngular();
  });

  it('should close the form for adding billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog').should('not.exist');
  });

  it('should not be able to submit an empty billing profile form', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Please fill out all required fields');
    cy.get('.cdk-overlay-container dib-billing-profile-dialog dib-input .dib-input-error').should(
      'contain',
      'Required'
    );
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
      .select(paymentMethod.currency.originalCurrency);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[placeholder=Search]').type(
      getFirstWord(paymentMethod.groupName)
    );
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .members .group').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully added billing profile.');
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content')
      .should('contain', paymentMethod.companyInformation.taxId)
      .should('contain', paymentMethod.primaryContact.firstName)
      .should('contain', paymentMethod.primaryContact.lastName)
      .should('contain', paymentMethod.primaryContact.email)
      .should('contain', paymentMethod.companyInformation.address)
      .should('contain', 1)
      .should('contain', paymentMethod.currency.originalCurrency)
      .should('contain', paymentMethod.invoiceRecipient.email)
      .should('contain', paymentMethod.invoiceRecipient.vatNumber);
  });

  it('should close the form for editing billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.email, 'Edit');

    cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog').should('not.exist');
  });

  it('should update a billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.email, 'Edit');

    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=legalName]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.companyLegalName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=taxId]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.taxId);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=city]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.city);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .dib-select')
      .first()
      .select(paymentMethod.modifiedCompanyInformation.country);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=streetName]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.address);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=zipcode]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.zipCode);

    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactFirstName]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedFirstName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactLastName]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedLastName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=contactEmail]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedEmail);

    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=invoiceRecipientEmail]')
      .clear()
      .type(paymentMethod.invoiceRecipient.modifiedEmail);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[name=vatNumber]')
      .clear()
      .type(paymentMethod.invoiceRecipient.modifiedVatNumber);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog input[placeholder=Search]')
      .clear()
      .type(paymentMethod.person.firstName);
    cy.get('.cdk-overlay-container dib-billing-profile-dialog .members .user').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully updated billing profile.');
    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-item .content')
      .should('contain', paymentMethod.modifiedCompanyInformation.taxId)
      .should('contain', paymentMethod.primaryContact.modifiedFirstName)
      .should('contain', paymentMethod.primaryContact.modifiedLastName)
      .should('contain', paymentMethod.primaryContact.modifiedEmail)
      .should('contain', paymentMethod.primaryContact.modifiedEmail)
      .should('contain', paymentMethod.modifiedCompanyInformation.address)
      .should('contain', 2)
      .should('contain', paymentMethod.currency.originalCurrency)
      .should('contain', paymentMethod.invoiceRecipient.modifiedEmail)
      .should('contain', paymentMethod.invoiceRecipient.modifiedVatNumber);
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

    cy.get('.cdk-overlay-container dib-invoice-split-dialog .radio-label').contains(' By Your reference ').click();

    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully updated billing profile.');
  });

  it('should cancel the archiving billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'Archive ');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('.cdk-overlay-container confirmation-dialog').should('not.exist');
  });

  it('should archive a billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'Archive ');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Successfully archived billing profile.'
    );
    cy.get('dib-company-management dib-payment-method dib-billing-profiles .billing-profiles').should(
      'contain',
      ' You have not added any billing profiles yet. '
    );
  });
});
