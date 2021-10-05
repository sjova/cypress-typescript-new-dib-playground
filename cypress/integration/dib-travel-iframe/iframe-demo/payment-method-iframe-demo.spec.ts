// PLEASE DON'T MODIFY OR DELETE THIS FILE

/* eslint-disable mocha/no-hooks-for-single-case */

import { CreditCard } from '../../../models';

describe('Company Settings - Payment Method - Credit Cards (Iframe Demo)', () => {
  let creditCard: CreditCard;

  before(() => {
    cy.fixture('credit-card').then((creditCardFixture) => {
      creditCard = creditCardFixture;
    });
  });

  beforeEach(() => {
    cy.iframeFix();

    cy.login();
    cy.visit('/company-management/payment-method/credit-cards');
  });

  it('should populate credit card details inside the iframe', () => {
    cy.get(
      'dib-company-management dib-payment-method dib-payment-method-credit-cards ui-button[type="primary"]'
    ).click();

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog .dib-dialog-form-section')
      .contains('CREDIT CARD DETAILS')
      .next('.StripeElement')
      .find('iframe')
      .switchToIframe()
      .find('.CardNumberField input[name="cardnumber"]')
      .type(creditCard.visa.number);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog .card-expiry iframe')
      .switchToIframe()
      .find('.InputContainer input[name="exp-date"]')
      .type(`${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}`);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog .card-cvc iframe')
      .switchToIframe()
      .find('.InputContainer input[name="cvc"]')
      .type(creditCard.cvc);

    cy.get('.cdk-overlay-container dib-add-credit-card-dialog .StripeElement')
      .first()
      .should('have.class', 'StripeElement--complete');
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog .card-expiry').should(
      'have.class',
      'StripeElement--complete'
    );
    cy.get('.cdk-overlay-container dib-add-credit-card-dialog .card-cvc').should(
      'have.class',
      'StripeElement--complete'
    );
  });
});
