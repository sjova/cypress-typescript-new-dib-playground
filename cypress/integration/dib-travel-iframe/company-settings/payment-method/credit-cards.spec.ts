import { getEmailWithHash } from '@cy/helpers';
import { CreditCard, PaymentMethod } from '@cy/models';
import { addCreditCard, confirmAddedCreditCard, deleteCreditCardAndConfirm } from './helpers';

describe('Company Settings - Payment Method - Credit Cards', () => {
  let creditCard: CreditCard;
  let paymentMethod: PaymentMethod;

  before(() => {
    cy.fixture('credit-card').then((creditCardFixture) => {
      creditCard = creditCardFixture;
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
        },
      };
    });
  });

  beforeEach(() => {
    cy.iframeFix();

    cy.login();
    cy.visit('/company-management/payment-method/credit-cards');

    cy.waitForAngular();
  });

  it('should close the form for adding new credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog').should('not.exist');
  });

  it('should cancel the adding new credit card', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button').contains('Cancel').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog').should('not.exist');
  });

  it('should not be able to submit an empty credit card form', () => {
    cy.get('dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog .error')
      .should('contain', 'Postal code is required.')
      .should('contain', 'City is required.')
      .should('contain', 'Country is required.')
      .should('contain', 'Street name is required.')
      .should('contain', 'Email is required.')
      .should('contain', 'VAT is required.')
      .should('contain', 'First name is required.')
      .should('contain', 'Last name is required.');
  });

  it('should add Visa credit card', () => {
    addCreditCard(paymentMethod, creditCard);

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .dib-dialog-form-section')
      .contains('CREDIT CARD DETAILS:')
      .next('.StripeElement')
      .find('iframe')
      .switchToIframe()
      .find('.CardNumberField input[name="cardnumber"]')
      .type(creditCard.visa.number);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    confirmAddedCreditCard(paymentMethod, creditCard);
  });

  it('should delete Visa credit card', () => {
    deleteCreditCardAndConfirm(paymentMethod);
  });

  it('should add Visa 3D Secure credit card', () => {
    addCreditCard(paymentMethod, creditCard);

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .dib-dialog-form-section')
      .contains('CREDIT CARD DETAILS:')
      .next('.StripeElement')
      .find('iframe')
      .switchToIframe()
      .find('.CardNumberField input[name="cardnumber"]')
      .type(creditCard.visa3DSecure.number);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    cy.waitForAngular();

    cy.get('body > div > iframe[name^="__privateStripeFrame"]')
      .switchToIframe()
      .find('iframe#challengeFrame')
      .switchToIframe()
      .find('iframe[name=acsFrame]')
      .switchToIframe()
      .find('.container .source .actions button#test-source-authorize-3ds')
      .click();

    cy.waitForAngular();

    confirmAddedCreditCard(paymentMethod, creditCard);
  });

  it('should delete Visa 3D Secure credit card', () => {
    deleteCreditCardAndConfirm(paymentMethod);
  });

  it('should add Mastercard credit card', () => {
    addCreditCard(paymentMethod, creditCard);

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .dib-dialog-form-section')
      .contains('CREDIT CARD DETAILS:')
      .next('.StripeElement')
      .find('iframe')
      .switchToIframe()
      .find('.CardNumberField input[name="cardnumber"]')
      .type(creditCard.mastercard.number);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    confirmAddedCreditCard(paymentMethod, creditCard);
  });

  it('should delete Mastercard credit card', () => {
    deleteCreditCardAndConfirm(paymentMethod);
  });

  it('should add American Express credit card', () => {
    addCreditCard(paymentMethod, creditCard);

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .dib-dialog-form-section')
      .contains('CREDIT CARD DETAILS:')
      .next('.StripeElement')
      .find('iframe')
      .switchToIframe()
      .find('.CardNumberField input[name="cardnumber"]')
      .type(creditCard.americanExpress.number);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    confirmAddedCreditCard(paymentMethod, creditCard);
  });

  it('should delete American Express credit card', () => {
    deleteCreditCardAndConfirm(paymentMethod);
  });
});
