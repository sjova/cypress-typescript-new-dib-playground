import { getEmailWithHash } from '../../../../helpers';
import { PaymentMethod } from '../../../../models';
import { archiveLodgeCard, editLodgeCard } from './helpers';

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

  // TODO: Revisit test or description
  it('should confirm the cancellation of adding a lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog button').contains(' Cancel ').click();

    // TODO: Below test is wrong, you should confirm: "You have not added any lodge cards yet."
    cy.get('dib-company-management dib-payment-method dib-lodge-cards h1').should('contain', ' Lodge Cards ');
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
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.lodgeCardDetails.cardProvider).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=lodgeCardName]').type(
      paymentMethod.lodgeCardDetails.cardName
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=creditCardNumber]').type(
      paymentMethod.lodgeCardDetails.cardNumber
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('MM')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.lodgeCardDetails.expiryMonth).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('YYYY')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.lodgeCardDetails.expiryYear).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('Currency')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.lodgeCardDetails.currency).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethod.invoiceRecipient.email
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    // TODO: Confirm snackbar message (double-check?)
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethod.primaryContact.email
    );
  });

  it('should update a lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item');

    editLodgeCard(paymentMethod.primaryContact.email);

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

    // TODO: Confirm snackbar message (double-check?)
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethod.primaryContact.modifiedEmail
    );
  });

  // TODO: Revisit test or description
  it('should not be able to submit an empty lodge card form', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    // TODO: Below test is wrong. Instead, please confirm required fields msg or something similar
    cy.get('.cdk-overlay-container dib-lodge-card-dialog').should('be.visible');
  });

  // TODO: Revisit test or description
  it('should check cancellation of confirmation dialog', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item');

    archiveLodgeCard(paymentMethod.primaryContact.modifiedEmail);

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item').should(
      'contain',
      paymentMethod.primaryContact.modifiedEmail
    );
  });

  it('should archive a lodge card', () => {
    archiveLodgeCard(paymentMethod.primaryContact.modifiedEmail);

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    // TODO: Confirm snackbar message (double-check?)
    cy.get('dib-company-management dib-payment-method dib-lodge-cards .items').should(
      'contain',
      ' You have not added any lodge cards yet. '
    );
  });
});
