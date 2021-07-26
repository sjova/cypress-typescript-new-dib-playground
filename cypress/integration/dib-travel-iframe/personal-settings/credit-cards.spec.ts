describe('Personal Settings - Credit Cards', () => {
  beforeEach(() => {
    cy.iframeFix();

    cy.login();
    cy.visit('/profile/payment');
  });

  // TODO: This is only demo example
  it('should access iframe on the page', () => {
    const cardNumber = '4444333322221111';
    const mmYy = '0129';
    const cvc = '123';
    const zip = '11000';

    cy.get('dib-profile dib-payment ui-button[type="primary"] button').click();

    cy.get('.cdk-overlay-container dib-add-card-dialog dib-stripe-card-input iframe')
      .switchToIframe()
      .find('.CardField-input-wrapper .CardNumberField input[name="cardnumber"]')
      .type(`${cardNumber}${mmYy}${cvc}${zip}`);
  });
});
