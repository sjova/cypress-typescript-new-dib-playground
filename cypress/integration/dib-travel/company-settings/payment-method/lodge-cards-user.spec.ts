describe('Company Settings - Payment Method - Lodge Cards (User)', () => {
  it('should check Lodge Cards page', () => {
    cy.login();

    cy.visitAngularUrl('/company-management/payment-method/lodge-cards');

    cy.get('dib-company-management dib-payment-method dib-lodge-cards h1').should('have.text', ' Lodge Cards ');
    cy.get('dib-company-management dib-payment-method dib-lodge-cards .items').should(
      'contain',
      ' To add a Lodgecard as payment method please contact us at '
    );
    cy.get(
      'dib-company-management dib-payment-method dib-lodge-cards .items a[href="mailto:support@dibtravel.com"]'
    ).should('have.text', 'support@dibtravel.com');
  });
});
