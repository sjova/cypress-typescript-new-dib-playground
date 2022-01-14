import { getEmailWithHash } from '@cy/helpers';
import { Group, PaymentMethod } from '@cy/models';
import { addGroup, deleteGroup } from '../../company-employees';
import {
  addBillingProfile,
  archiveBillingProfile,
  cancelAddingBillingProfile,
  clickBillingProfileCtaAction,
  submitEmptyBillingProfileFormAndConfirm,
} from './helpers';

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
    cy.visitAngularUrl('/people-management/groups');

    addGroup(group.name, group.description, `${group.employee.firstName} ${group.employee.lastName}`, false);
  });

  after(() => {
    cy.login();
    cy.visitAngularUrl('/people-management/groups');

    deleteGroup(group.name);
  });

  beforeEach(() => {
    cy.login();
    cy.visitAngularUrl('/company-management/payment-method/billing-profiles');
  });

  it('should close the form for adding billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();

    cancelAddingBillingProfile();
  });

  it('should not be able to submit an empty billing profile form', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();

    submitEmptyBillingProfileFormAndConfirm();
  });

  it('should add a billing profile', () => {
    cy.get('dib-company-management dib-payment-method dib-billing-profiles ui-button[type=primary]').click();

    addBillingProfile(paymentMethod);

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

    cy.get('dib-company-management dib-payment-method dib-billing-profiles dib-tooltip')
      .invoke('show')
      .trigger('mouseover', 'bottom')
      .click();
    cy.get('.tooltip-content').should(
      'contain',
      'You can split your invoices on either Your reference or Cost center.'
    );
  });

  it('should close the form for editing billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.email, 'Edit');

    cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

    cy.get('.cdk-overlay-container dib-billing-profile-dialog').should('not.exist');
  });

  // TODO: Revisit this and below tests if needed
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
    cy.get('.cdk-overlay-container dib-billing-profile-dialog  ui-control-wrapper .container').click();

    cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label').contains(paymentMethod.groupName).click();
    cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label').contains(paymentMethod.person.firstName).click();

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

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'have.text',
      'Successfully updated billing profile.'
    );
  });

  it('should send the request split invoice change (by reference field)', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'Request change');

    cy.get('.cdk-overlay-container dib-invoice-split-dialog .radio-label').contains(' By Your reference ').click();

    cy.get('.cdk-overlay-container dib-invoice-split-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'have.text',
      'Successfully updated billing profile.'
    );
  });

  it('should cancel the archiving billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'Archive ');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('.cdk-overlay-container confirmation-dialog').should('not.exist');
  });

  it('should archive a billing profile', () => {
    clickBillingProfileCtaAction(paymentMethod.primaryContact.modifiedEmail, 'Archive ');
    archiveBillingProfile();
  });
});
