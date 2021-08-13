// Please don't modify or delete this file

import { CreditCard } from '../../../models';

describe('Personal Settings - Credit Cards (Iframe Demo)', () => {
  let creditCard: CreditCard;

  before(() => {
    cy.fixture('credit-card').then((creditCardFixture) => {
      creditCard = creditCardFixture;
    });
  });

  beforeEach(() => {
    cy.iframeFix();

    cy.login();
    cy.visit('/profile/payment');
  });

  it('should populate credit card details inside the iframe', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"]').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField .CardNumberField input[name="cardnumber"]')
      .type(
        `${creditCard.visa.number}${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}${creditCard.cvc}${
          creditCard.zipCode
        }`
      );

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input .stripe-card').should(
      'have.class',
      'StripeElement--complete'
    );
  });
});
