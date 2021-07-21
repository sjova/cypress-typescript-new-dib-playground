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

  it.only('should display error message when invalid email is submitted', () => {
    const invalidEmail = getEmailWithHash(account.signUpAccount.email);
    cy.get('new-forgot-password input[type="email"]').type(invalidEmail.replace('@', ''));
    cy.get('new-forgot-password ui-button button').click();
    cy.get('new-forgot-password .error').should('contain', 'The email should be in email@example.com format');
  });
});
