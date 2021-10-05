import { getEmailWithHash } from '@cy/helpers';
import { PaymentMethod } from '@cy/models';
import { clickLodgeCardCtaButton } from './helpers';

describe('Company Settings - Payment Method - Lodge Cards (Agent)', () => {
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
    cy.loginAgent();
    cy.visit('/company-management/payment-method/lodge-cards');
  });

  it('should cancel the adding lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog button').contains(' Cancel ').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog').should('not.exist');
  });

  it('should not be able to submit an empty lodge card form', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    // TODO: We should confirm all required fields (one by one)
    // TODO: Remove bellow dummy test
    cy.get('.cdk-overlay-container dib-lodge-card-dialog').should('be.visible');
  });

  it('should add a lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=companyLegalName]').type(
      paymentMethod.companyInformation.companyLegalName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=companyRegistrationNumber]').type(
      paymentMethod.companyInformation.companyRegistrationNumber
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=vatNumber]').type(
      paymentMethod.companyInformation.vatNumber
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=addressLine]').type(
      paymentMethod.companyInformation.address
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=postalCode]').type(
      paymentMethod.companyInformation.zipCode
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=city]').type(paymentMethod.companyInformation.city);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-autocomplete').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-autocomplete input').type(
      paymentMethod.companyInformation.country
    );
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.companyInformation.country).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactFirstName]').type(
      paymentMethod.primaryContact.firstName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactLastName]').type(
      paymentMethod.primaryContact.lastName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactEmail]').type(
      paymentMethod.primaryContact.email
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('Card provider')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.lodgeCard.provider).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=lodgeCardName]').type(paymentMethod.lodgeCard.name);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=creditCardNumber]').type(
      paymentMethod.lodgeCard.number
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('MM')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.lodgeCard.expiryMonth).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('YYYY')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.lodgeCard.expiryYear).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('Currency')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.lodgeCard.currency).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethod.invoiceRecipient.email
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    // TODO: Confirm snackbar message: "Successfully added lodge card"
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethod.primaryContact.email
    );
  });

  it('should update a lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item');

    clickLodgeCardCtaButton(paymentMethod.primaryContact.email, 'edit');

    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactFirstName]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedFirstName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactLastName]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedFirstName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactEmail]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedEmail);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    // TODO: Confirm snackbar message: "Successfully updated lodge card"
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethod.primaryContact.modifiedEmail
    );
  });

  it('should cancel the removing lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item');

    clickLodgeCardCtaButton(paymentMethod.primaryContact.modifiedEmail, ' archive ');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('.cdk-overlay-container confirmation-dialog').should('not.exist');
  });

  it('should archive a lodge card', () => {
    clickLodgeCardCtaButton(paymentMethod.primaryContact.modifiedEmail, ' archive ');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    // TODO: Confirm snackbar message: "Successfully archived lodge card"
    cy.get('dib-company-management dib-payment-method dib-lodge-cards .items').should(
      'contain',
      ' You have not added any lodge cards yet. '
    );
  });
});
