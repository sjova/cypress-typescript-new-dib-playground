import { getEmailWithHash } from '../../../../helpers';
import { PaymentMethod } from '../../../../models';
import { cancelCardFormAndConfirm, clickLodgeCardCtaButton } from './helpers';

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
          modifiedEmail: getEmailWithHash(paymentMethodFixture.invoiceRecipient.modifiedEmail),
        },
      };
    });
  });

  beforeEach(() => {
    cy.loginAgent();
    cy.visit('/company-management/payment-method/lodge-cards');

    cy.waitForAngular();
  });

  it('should close the form for adding lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog').should('not.exist');
  });

  it('should cancel the adding lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();

    cancelCardFormAndConfirm();
  });

  it('should not be able to submit an empty lodge card form', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-control-wrapper .error')
      .should('contain', 'Company legal name is required.')
      .should('contain', 'Company registration number is required.')
      .should('contain', 'VAT is required.')
      .should('contain', 'Address line is required.')
      .should('contain', 'Postal code is required.')
      .should('contain', 'City is required.')
      .should('contain', 'Country is required.')
      .should('contain', 'First name is required.')
      .should('contain', 'Last name is required.')
      .should('contain', 'Email is required.')
      .should('contain', 'Card provider is required.')
      .should('contain', 'Email is required.');
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
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.currency.originalCurrency).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=expiryDateTrailingValue]').type(
      paymentMethod.lodgeCard.expiryDateTrailingValue
    );
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=invoiceRecipientEmail]').type(
      paymentMethod.invoiceRecipient.email
    );

    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully added lodge card.');
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item')
      .should('contain', paymentMethod.lodgeCard.number.slice(-4))
      .should('contain', paymentMethod.companyInformation.vatNumber)
      .should('contain', paymentMethod.primaryContact.firstName)
      .should('contain', paymentMethod.primaryContact.lastName)
      .should('contain', paymentMethod.primaryContact.email)
      .should('contain', paymentMethod.lodgeCard.expiryMonth)
      .should('contain', paymentMethod.lodgeCard.expiryYear.slice(-2))
      .should('contain', paymentMethod.companyInformation.country)
      .should('contain', paymentMethod.invoiceRecipient.email)
      .should('contain', paymentMethod.currency.originalCurrency)
      .should('contain', paymentMethod.lodgeCard.provider)
      .should('contain', paymentMethod.companyInformation.companyRegistrationNumber)
      .should('contain', paymentMethod.companyInformation.address);
  });

  it('should close the form for editing lodge card', () => {
    clickLodgeCardCtaButton(paymentMethod.primaryContact.email, 'Edit');

    cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog').should('not.exist');
  });

  it('should cancel the editing lodge card', () => {
    clickLodgeCardCtaButton(paymentMethod.primaryContact.email, 'Edit');

    cancelCardFormAndConfirm();
  });

  it('should update a lodge card', () => {
    clickLodgeCardCtaButton(paymentMethod.primaryContact.email, 'Edit');

    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=companyLegalName]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.companyLegalName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=companyRegistrationNumber]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.companyRegistrationNumber);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=vatNumber]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.vatNumber);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=addressLine]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.address);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=postalCode]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.zipCode);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=city]')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.city);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-autocomplete').click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-autocomplete input')
      .clear()
      .type(paymentMethod.modifiedCompanyInformation.country);
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.modifiedCompanyInformation.country).click();

    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactFirstName]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedFirstName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactLastName]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedLastName);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=contactEmail]')
      .clear()
      .type(paymentMethod.primaryContact.modifiedEmail);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('Card provider')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.modifiedLodgeCard.provider).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=lodgeCardName]')
      .clear()
      .type(paymentMethod.modifiedLodgeCard.name);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=creditCardNumber]')
      .clear()
      .type(paymentMethod.modifiedLodgeCard.number);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('MM')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.modifiedLodgeCard.expiryMonth).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('YYYY')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.modifiedLodgeCard.expiryYear).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-dropdown .placeholder')
      .contains('Currency')
      .parents('ui-dropdown')
      .click();
    cy.get('.cdk-overlay-container ui-panel .item').contains(paymentMethod.currency.modifiedCurrency).click();
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=expiryDateTrailingValue]')
      .clear()
      .type(paymentMethod.modifiedLodgeCard.expiryDateTrailingValue);
    cy.get('.cdk-overlay-container dib-lodge-card-dialog input[name=invoiceRecipientEmail]')
      .clear()
      .type(paymentMethod.invoiceRecipient.modifiedEmail);

    cy.get('.cdk-overlay-container dib-lodge-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully updated lodge card.');
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item')
      .should('contain', paymentMethod.modifiedLodgeCard.number.slice(-4))
      .should('contain', paymentMethod.modifiedCompanyInformation.vatNumber)
      .should('contain', paymentMethod.primaryContact.modifiedFirstName)
      .should('contain', paymentMethod.primaryContact.modifiedLastName)
      .should('contain', paymentMethod.primaryContact.modifiedEmail)
      .should('contain', paymentMethod.modifiedLodgeCard.expiryMonth)
      .should('contain', paymentMethod.modifiedLodgeCard.expiryYear.slice(-2))
      .should('contain', paymentMethod.modifiedCompanyInformation.country)
      .should('contain', paymentMethod.invoiceRecipient.modifiedEmail)
      .should('contain', paymentMethod.currency.modifiedCurrency)
      .should('contain', paymentMethod.modifiedLodgeCard.provider)
      .should('contain', paymentMethod.modifiedCompanyInformation.companyRegistrationNumber)
      .should('contain', paymentMethod.modifiedCompanyInformation.address);
  });

  it('should cancel the archiving lodge card', () => {
    cy.get('dib-company-management dib-payment-method dib-lodge-cards dib-item');

    clickLodgeCardCtaButton(paymentMethod.primaryContact.modifiedEmail, ' Archive ');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('.cdk-overlay-container confirmation-dialog').should('not.exist');
  });

  it('should archive a lodge card', () => {
    clickLodgeCardCtaButton(paymentMethod.primaryContact.modifiedEmail, ' Archive ');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Successfully archived lodge card.');
    cy.get('dib-company-management dib-payment-method dib-lodge-cards .items').should(
      'contain',
      ' You have not added any lodge cards yet. '
    );
  });
});
