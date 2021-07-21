import { DibTravelAccounts } from '../../../models';

describe('Forgot Password Page', () => {
  let accountEmail: DibTravelAccounts;

  beforeEach(() => {
    cy.visit('/');
    cy.get('new-login a[href="/forgot-password"]').click();
  });

  it('should display forgot password page and all elements', () => {
    cy.get('new-forgot-password span').should('contain', 'Forgot password');
    cy.get('new-forgot-password input[type="email"]').should('be.visible');
    cy.get('new-forgot-password ui-button button').should('contain', 'Send');
  });

  it.only('should display error message when empty email input field is submitted', () => {
    cy.get('new-forgot-password ui-button button').click();
    cy.get('new-forgot-password .error').should('contain', 'Email is required.');
  });
});
