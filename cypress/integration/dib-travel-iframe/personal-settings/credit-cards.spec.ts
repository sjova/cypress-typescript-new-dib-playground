import { CreditCard } from '@cy/models';
import { deleteCreditCards } from './helpers';

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
    cy.visit('/profile/payment');

    cy.waitForAngular();
  });

  it('should "Credit Cards" be displayed in side bar', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Credit Cards');
  });

  //   // TODO: This is only demo example
  //   it('should access iframe on the page', () => {
  //     const cardNumber = '4444333322221111';
  //     const mmYy = '0129';
  //     const cvc = '123';
  //     const zip = '11000';

  //     cy.get('dib-profile dib-payment ui-button[type="primary"] button').click();

  //     cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
  //       .switchToIframe()
  //       .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
  //       .type(`${cardNumber}${mmYy}${cvc}${zip}`);
  //   });
  // });

  it('should add new VISA credit card', () => {
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

  it('should delete VISA credit card', () => {
    deleteCreditCards(creditCard.visa.number);
  });

  it('should add new 3D VISA credit card', () => {
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

    cy.waitForAngular();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Card Added');

    cy.get('dib-profile dib-payment dib-credit-card .card').should('contain', creditCard.visa3DSecure.number.slice(-4));
  });

  it('should delete 3D VISA credit card', () => {
    deleteCreditCards(creditCard.visa3DSecure.number);
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
    deleteCreditCards(creditCard.mastercard.number);
  });

  it('should add new American Express credit card', () => {
    cy.get('dib-profile dib-payment ui-button[type="primary"] button').contains('Add Credit Card').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(
        `${creditCard.americanExpress.number}${creditCard.expiryMonth}${creditCard.expiryYear.slice(-2)}${
          creditCard.cvc + '1'
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
    deleteCreditCards(creditCard.americanExpress.number);
  });
});
