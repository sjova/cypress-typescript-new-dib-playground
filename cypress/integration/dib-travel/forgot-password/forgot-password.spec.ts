import { DibTravelAccounts } from '../../../models';
import { getEmailWithHash } from '../../../helpers';

describe('Forgot Password Page', () => {
  let account: DibTravelAccounts;

  before(() => {
    cy.fixture('dib-travel-accounts').then((accountFixture) => {
      account = accountFixture;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('new-login a[href="/forgot-password"]').click();
  });

  it('should display forgot password page and all elements', () => {
    cy.get('new-forgot-password span').should('contain', 'Forgot password');
    cy.get('new-forgot-password input[type="email"]').should('be.visible');
    cy.get('new-forgot-password ui-button button').should('contain', 'Send');
  });

  it('should display error message when empty email input field is submitted', () => {
    cy.get('new-forgot-password ui-button button').click();

    cy.get('new-forgot-password .error').should('contain', 'Email is required.');
  });

  it('should display error message when invalid email is submitted', () => {
    const email = getEmailWithHash(account.signUpAccount.email);
    cy.get('new-forgot-password input[type="email"]').type(email.replace('@', ''));
    cy.get('new-forgot-password ui-button button').click();

    cy.get('new-forgot-password .error').should('contain', 'The email should be in email@example.com format');
  });

  it('should display error message when email does not exist', () => {
    const email = getEmailWithHash(account.signUpAccount.email);
    cy.get('new-forgot-password input[type="email"]').type(email);
    cy.get('new-forgot-password ui-button button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Email does not exist');
  });

  it('should display successful message when user entered valid and registered email address', () => {
    cy.get('new-forgot-password input[type="email"]').type(account.defaultAccount.email);
    cy.get('new-forgot-password ui-button button').click();

    cy.get('new-forgot-password div .mail-sent-notification').should('contain', 'E-mail has been sent');
  });
});
