describe('Forgot Password Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('new-login a[href="/forgot-password"]').click();
  });

  it('should display forgot password page and all elements', () => {
    cy.get('new-forgot-password span').should('contain', 'Forgot password');
    cy.get('new-forgot-password input[type="email"]').should('be.visible');
    cy.get('new-forgot-password ui-button button').should('contain', 'Send');
  });
});
