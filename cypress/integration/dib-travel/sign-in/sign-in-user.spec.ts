import { DibTravelAccounts } from '@cy/models';

describe('Sign In (User)', () => {
  let accounts: DibTravelAccounts;

  before(() => {
    cy.fixture('dib-travel-accounts').then((accountsFixture) => {
      accounts = accountsFixture;
    });
  });

  beforeEach(() => {
    cy.visit('/login');

    cy.waitForAngular();
  });

  it('should check if a not logged user can visit a page', () => {
    cy.resetState();

    cy.visit('/people-management/employees');
    cy.waitForAngular();

    cy.get('new-login ui-input input[name=email]').should('be.visible');
    cy.get('new-login ui-input input[name=password]').should('be.visible');
    cy.get('new-login ui-button').should('contain', 'Sign in');
  });

  it('should check agent redirection link', () => {
    cy.get('new-login .auth-container-footer a[href="/login/agent"]').should('have.text', 'Agent login');
  });

  it('should check forgot-password redirection link', () => {
    cy.get('new-login .forgot-password-wrapper a[href="/forgot-password"]').should('have.text', 'Forgot password?');
  });

  it('should check sign-up redirection link', () => {
    cy.get('new-login .auth-container-footer a[href="/sign-up"]').should('have.text', "Don't have an account?");
  });

  it('should check user terms and conditions redirection link', () => {
    cy.get('new-login .terms a[href="https://dibtravel.com/terms-and-conditions/"]').should(
      'have.text',
      ' terms and conditions '
    );
  });

  it('should check data protection policy redirection link', () => {
    cy.get('new-login .terms a[href="https://dibtravel.com/privacy-policy/"]').should(
      'have.text',
      ' data protection policy '
    );
  });

  it('should display error message when empty form is submitted', () => {
    cy.get('new-login ui-button').click();

    cy.get('new-login ui-control-wrapper .error')
      .should('contain', 'Email is required')
      .should('contain', 'Password is required');
  });

  it('should display error message when wrong password is submitted', () => {
    cy.get('new-login ui-input input[name=email]').type(accounts.defaultAccount.email);
    cy.get('new-login ui-input input[name=password]').type(accounts.invalidAccount.password);
    cy.get('new-login ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Invalid Credentials');
  });

  it('should display error message when invalid email address is inserted', () => {
    const email = accounts.defaultAccount.email;
    const invalidEmail = email.replace('@', '');

    cy.get('new-login ui-input input[name=email]').type(invalidEmail);
    cy.get('new-login ui-input input[name=password]').type(accounts.defaultAccount.password);
    cy.get('new-login ui-button').click();

    cy.get('new-login ui-input[type="email"] .error').should(
      'contain',
      'The email should be in email@example.com format'
    );
  });

  it('should display pop up error message when user enters credential that does not exist', () => {
    cy.get('new-login ui-input input[name=email]').type(accounts.invalidAccount.email);
    cy.get('new-login ui-input input[name=password]').type(accounts.invalidAccount.password);
    cy.get('new-login ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Invalid Credentials');
  });

  it('should allow user to sign in with valid credentials', () => {
    cy.get('new-login ui-input input[name=email]').clear().type(accounts.defaultAccount.email);
    cy.get('new-login ui-input input[name=password]').clear().type(accounts.defaultAccount.password);
    cy.get('new-login ui-button').click();

    cy.get('[data-cy="navbar-my-travels-link"]').should('contain', 'My Travels');

    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Log Out');
  });
});
