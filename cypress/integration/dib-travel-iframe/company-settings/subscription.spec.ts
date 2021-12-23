import { getEmailWithHash } from '@cy/helpers';
import { CreditCard, PaymentMethod } from '@cy/models';
import {
  addCreditCard,
  cancelAddingCreditCard,
  confirmAddedCreditCard,
  deleteCreditCardAndConfirm,
  submitEmptyCreditCardFormAndConfirm,
} from './payment-method/helpers';

describe('Company Settings - Subscription', () => {
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
    cy.visit('/company-management/subscription/payment-method');
  });

  it('should cancel the adding new credit card', () => {
    cy.get('dib-company-management dib-subscription dib-subscription-payment-method span')
      .contains(' Add new Credit Card ')
      .click();

    cancelAddingCreditCard();
  });

  it('should not be able to submit an empty credit card form', () => {
    cy.get('dib-company-management dib-subscription dib-subscription-payment-method span')
      .contains(' Add new Credit Card ')
      .click();

    submitEmptyCreditCardFormAndConfirm();
  });

  it('should add credit card', () => {
    cy.get('dib-company-management dib-subscription dib-subscription-payment-method span')
      .contains(' Add new Credit Card ')
      .click();

    addCreditCard(paymentMethod, creditCard, false);

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .dib-dialog-form-section')
      .contains('CREDIT CARD DETAILS:')
      .next('.StripeElement')
      .find('iframe')
      .switchToIframe()
      .find('.CardNumberField input[name="cardnumber"]')
      .type(creditCard.visa.number);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('have.text', 'Company Shared Credit Card Added');

    cy.visit('/company-management/payment-method/credit-cards');

    confirmAddedCreditCard(paymentMethod, creditCard);

    deleteCreditCardAndConfirm(paymentMethod);
  });
});
