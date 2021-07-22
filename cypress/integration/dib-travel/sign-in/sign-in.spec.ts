import { DibTravelAccounts } from '../../../models';

describe('Sign in (User)', () => {
  let loginDetails: DibTravelAccounts;
  before(() => {
    cy.fixture('dib-travel-accounts').then((loginFixture) => {
      loginDetails = loginFixture;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should check agent redirection link', () => {
    cy.get('new-login a[href="/login/agent"]').should('have.text', 'Agent login');
  });

  it('should check forgot-password redirection link', () => {
    cy.get('new-login .forgot-password-wrapper a[href="/forgot-password"]').should('have.text', 'Forgot password?');
  });

  it('should check sign-up redirection link', () => {
    cy.get('new-login a[href="/sign-up"]').should('have.text', "Don't have an account?");
  });

  it('should display error message when empty form is submitted', () => {
    cy.get('new-login ui-button button').click();

    cy.get('new-login ui-control-wrapper .error')
      .should('contain', 'Email is required')
      .should('contain', 'Password is required');
  });

  it('should display error message when wrong password is submitted', () => {
    cy.get('new-login ui-input input[name=email]').type(loginDetails.defaultAccount.email);
    cy.get('new-login ui-input input[name=password]').type(loginDetails.invalidAccount.password);
    cy.get('new-login ui-button button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Invalid Credentials');
  });

  it('should display error message when invalid email address is inserted', () => {
    const email = loginDetails.defaultAccount.email;
    const invalidEmail = email.replace('@', '');
    cy.get('new-login ui-input input[name=email]').type(invalidEmail);
    cy.get('new-login ui-input input[name=password]').type(loginDetails.defaultAccount.password);
    cy.get('new-login ui-button button').click();

    cy.get('new-login ui-input[type="email"] .error').should(
      'contain',
      'The email should be in email@example.com format'
    );
  });

  it('should display pop up error message when user enters credential that does not exist', () => {
    cy.get('new-login ui-input input[name=email]').type(loginDetails.invalidAccount.email);
    cy.get('new-login ui-input input[name=password]').type(loginDetails.invalidAccount.password);
    cy.get('new-login ui-button button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Invalid Credentials');
  });

  it('should allow user to sign in with valid credentials', () => {
    cy.get('new-login ui-input input[name=email]').clear().type(loginDetails.defaultAccount.email);
    cy.get('new-login ui-input input[name=password]').clear().type(loginDetails.defaultAccount.password);
    cy.get('new-login ui-button button').click();
    cy.get('[data-cy="navbar-my-travels-link"]').should('contain', 'My Travels');
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Log Out');
  });
});