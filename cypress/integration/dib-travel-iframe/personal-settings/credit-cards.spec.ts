import { CreditCard } from '@cy/models';
import { deleteCreditCard } from './helpers';

describe('Personal Settings - Credit Cards', () => {
  let creditCard: CreditCard;

  before(() => {
    cy.fixture('credit-card').then((creditCardFixture) => {
      creditCard = creditCardFixture;
    });
  });

  beforeEach(() => {
    cy.iframeFix();

    cy.login();
    cy.visitAngularUrl('/profile/payment');

    cy.waitForAngular();
  });

  it('should "Credit Cards" be displayed in side bar', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Credit Cards');
  });

  it('should enter invalid credit card number', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').contains('Add Credit Card').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type('1111 1111 1111 1111');

    cy.get('.cdk-overlay-container dib-add-card-dialog .dib-input-error').should(
      'have.text',
      'Your card number is invalid.'
    );
  });

  it('should enter expired credit card ', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').contains('Add Credit Card').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(`${creditCard.visa.number}${creditCard.expiryMonth}20`);

    cy.get('.cdk-overlay-container dib-add-card-dialog .dib-input-error').should(
      'have.text',
      "Your card's expiration year is in the past."
    );
  });

  it('should enter credit card with invalid postal code ', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').contains('Add Credit Card').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(
        `${creditCard.visa.number}${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}${
          creditCard.cvc
        }${creditCard.zipCode.slice(-2)}`
      );

    cy.get('.cdk-overlay-container dib-add-card-dialog .title').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog .dib-input-error').should(
      'have.text',
      'Your postal code is incomplete.'
    );
  });

  it('should enter credit card with invalid security code - CVC ', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').contains('Add Credit Card').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(
        `${creditCard.visa.number}${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}${creditCard.cvc}${
          creditCard.zipCode
        }`
      );

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardField-cvc input[name="cvc"]')
      .clear()
      .type(creditCard.cvc.slice(-2));

    cy.get('.cdk-overlay-container dib-add-card-dialog .title').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog .dib-input-error').should(
      'have.text',
      "Your card's security code is incomplete."
    );
  });

  it('should not be able to add new Discover credit card', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').contains('Add Credit Card').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(
        `${creditCard.discover.number}${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}${creditCard.cvc}${
          creditCard.zipCode
        }`
      );
    cy.get('.cdk-overlay-container dib-add-card-dialog .title').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog .dib-input-error').should(
      'have.text',
      'Your card is not supported.'
    );
  });

  it('should add new Visa credit card', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').contains('Add Credit Card').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(
        `${creditCard.visa.number}${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}${creditCard.cvc}${
          creditCard.zipCode
        }`
      );

    cy.get('dib-add-card-dialog .save-wrapper ui-button button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Card Added');

    cy.get('dib-profile dib-payment dib-credit-card .card').should('contain', creditCard.visa.number.slice(-4));
  });

  it('should delete Visa credit card', () => {
    deleteCreditCard(creditCard.visa.number);
  });

  it('should add new Visa 3D Secure credit card', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(
        `${creditCard.visa3DSecure.number}${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}${creditCard.cvc}${
          creditCard.zipCode
        }`
      );

    cy.get('dib-add-card-dialog .save-wrapper ui-button button').click();

    cy.waitForAngular();

    cy.get('body > div > iframe[name^="__privateStripeFrame"]')
      .switchToIframe()
      .find('iframe#challengeFrame')
      .switchToIframe()
      .find('iframe[name=acsFrame]')
      .switchToIframe()
      .find('.container .source .actions button#test-source-authorize-3ds')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Card Added');

    cy.get('dib-profile dib-payment dib-credit-card .card').should('contain', creditCard.visa3DSecure.number.slice(-4));
  });

  it('should delete Visa 3D Secure credit card', () => {
    deleteCreditCard(creditCard.visa3DSecure.number);
  });

  it('should add new MasterCard credit card', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').contains('Add Credit Card').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(
        `${creditCard.mastercard.number}${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}${creditCard.cvc}${
          creditCard.zipCode
        }`
      );

    cy.get('dib-add-card-dialog .save-wrapper ui-button button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Card Added');

    cy.get('dib-profile dib-payment dib-credit-card .card').should('contain', creditCard.mastercard.number.slice(-4));
  });

  it('should delete Mastercard credit card', () => {
    deleteCreditCard(creditCard.mastercard.number);
  });

  it('should add new American Express credit card', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').contains('Add Credit Card').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(
        `${creditCard.americanExpress.number}${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}${
          creditCard.americanExpress.cvv
        }${creditCard.zipCode}`
      );

    cy.get('dib-add-card-dialog .save-wrapper ui-button button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Card Added');

    cy.get('dib-profile dib-payment dib-credit-card .card').should(
      'contain',
      creditCard.americanExpress.number.slice(-4)
    );
  });

  it('should delete American Express credit card', () => {
    deleteCreditCard(creditCard.americanExpress.number);
  });
});
