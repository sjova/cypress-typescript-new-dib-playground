import { DibTravelAccounts } from '../../../models';
import { getEmailWithHash } from '../../../helpers';

describe('Forgot Password', () => {
  let accounts: DibTravelAccounts;

  before(() => {
    cy.fixture('dib-travel-accounts').then((accountsFixture) => {
      accounts = accountsFixture;
    });
  });

  beforeEach(() => {
    cy.visit('/login');
    cy.get('new-login .forgot-password-wrapper a[href="/forgot-password"]').click();
  });

  it('should display forgot password page and all elements', () => {
    cy.get('new-forgot-password .auth-container-title span').should('contain', 'Forgot password');
    cy.get('new-forgot-password .auth-container-content input[type="email"]').should('be.visible');
    cy.get('new-forgot-password ui-button button').should('contain', 'Send');
  });

  it.only('should check back login redirection link', () => {
    cy.get('new-forgot-password a[href="/login"]').should('have.text', 'Back');
  });

  it('should display error message when empty email input field is submitted', () => {
    cy.get('new-forgot-password ui-button button').click();

    cy.get('new-forgot-password ui-input .error').should('contain', 'Email is required.');
  });

  it('should display error message when invalid email is submitted', () => {
    const email = accounts.defaultAccount.email;
    const invalidEmail = email.replace('@', '');

    cy.get('new-forgot-password .auth-container-content input[type="email"]').type(invalidEmail);
    cy.get('new-forgot-password ui-button button').click();

    cy.get('new-forgot-password ui-input .error').should('contain', 'The email should be in email@example.com format');
  });

  it('should display error message when email does not exist', () => {
    const email = getEmailWithHash(accounts.signUpAccount.email);

    cy.get('new-forgot-password .auth-container-content input[type="email"]').type(email);
    cy.get('new-forgot-password ui-button button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Email does not exist');
  });

  it('should display successful message when user entered valid and registered email address', () => {
    cy.get('new-forgot-password .auth-container-content input[type="email"]').type(accounts.defaultAccount.email);
    cy.get('new-forgot-password ui-button button').click();

    cy.get('new-forgot-password .auth-container-content .mail-sent-notification').should(
      'contain',
      'E-mail has been sent'
    );
  });
});
