describe('Company Settings - Payment Method', () => {
  beforeEach(() => {
    cy.iframeFix();

    cy.login();
    cy.visit('/company-management/payment-method/credit-cards');
  });

  // TODO: This is only demo example
  // Please don't modify or delete this block for now
  it('should access iframes on the page', () => {
    const cardNumber = '4444333322221111';
    const mmYy = '0129';
    const cvc = '123';

    cy.get('dib-company-management dib-payment-method ui-button[type="primary"]').click();

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .dib-dialog-form-section')
      .contains('CREDIT CARD DETAILS')
      .next('.StripeElement')
      .find('iframe')
      .switchToIframe()
      .find('.CardNumberField input[name="cardnumber"]')
      .type(cardNumber);

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .card-expiry iframe')
      .switchToIframe()
      .find('.InputContainer input[name="exp-date"]')
      .type(mmYy);

    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-credit-card-dialog .card-cvc iframe')
      .switchToIframe()
      .find('.InputContainer input[name="cvc"]')
      .type(cvc);
  });
});
