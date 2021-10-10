import { getEmailWithHash } from '@cy/helpers';
import { DibTravelAccounts, SignUpUser } from '@cy/models';

describe('Sign Up', () => {
  let accounts: DibTravelAccounts;
  let signUpUser: SignUpUser;

  before(() => {
    cy.fixture('dib-travel-accounts').then((accountsFixture) => {
      accounts = accountsFixture;
    });

    cy.fixture('sign-up/user').then((signUpUserFixture) => {
      signUpUser = { ...accounts.signUpAccount, ...signUpUserFixture };
    });
  });

  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('should check user terms and conditions redirection link', () => {
    cy.get('dib-signup .terms a[href="https://dibtravel.com/terms-and-conditions/"]').should(
      'have.text',
      ' terms and conditions '
    );
  });

  it('should check data protection policy redirection link', () => {
    cy.get('dib-signup .terms a[href="https://dibtravel.com/privacy-policy/"]').should(
      'have.text',
      ' data protection policy '
    );
  });

  it('should check back login redirection link', () => {
    cy.get('dib-signup .login-link a[href="/login"]').should('have.text', 'Already have an account?\n');
  });

  it('should display error messages when empty sign-up form is submitted', () => {
    cy.get('dib-signup ui-button').contains('Sign up').click();

    cy.get('dib-signup ui-input .error')
      .should('contain', 'First name is required')
      .should('contain', 'Last name is required')
      .should('contain', 'Email is required')
      .should('contain', 'Password is required')
      .should('contain', 'Company name is required')
      .should('contain', 'Company registration number is required');

    cy.get('dib-signup ui-phone-picker .error').should('contain', 'Phone number is required.');
    cy.get('dib-signup ui-autocomplete .error').should('contain', 'Country is required');
  });

  it('should display error message when invalid email address is inserted', () => {
    cy.waitForAngular();

    const invalidEmail = signUpUser.email.replace('@', '');

    cy.get('dib-signup ui-input input[name="firstName"]').type(signUpUser.firstName);
    cy.get('dib-signup ui-input input[name="lastName"]').type(signUpUser.lastName);
    cy.get('dib-signup ui-input input[name="email"]').type(invalidEmail);
    cy.get('dib-signup ui-phone-picker ui-autocomplete').click();

    cy.get('dib-signup ui-phone-picker ui-autocomplete input').type(signUpUser.companyCountry);
    cy.get('.cdk-overlay-container .item .country-name').contains(signUpUser.companyCountry).click();

    cy.get('dib-signup ui-input input[type="number"]').type(signUpUser.phoneNumber);
    cy.get('dib-signup ui-input input[name="password"]').eq(0).type(signUpUser.password);
    cy.get('dib-signup ui-input input[name="password"]').eq(1).type(signUpUser.password);
    cy.get('dib-signup ui-input input[name="companyName"]').type(signUpUser.companyName);
    cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(signUpUser.companyRegistrationNumber);
    cy.get('dib-signup ui-button button').contains('Sign up').click();

    cy.get('dib-signup ui-input .error').should('contain', 'The email should be in email@example.com format');
  });

  it('should display pop up error message when existing email address is inserted', () => {
    cy.get('dib-signup ui-input input[name="firstName"]').type(signUpUser.firstName);
    cy.get('dib-signup ui-input input[name="lastName"]').type(signUpUser.lastName);
    cy.get('dib-signup ui-input input[name="email"]').type(accounts.defaultAccount.email);
    cy.get('dib-signup ui-phone-picker ui-autocomplete').click();

    cy.get('dib-signup ui-phone-picker ui-autocomplete input').type(signUpUser.companyCountry);
    cy.get('.cdk-overlay-container .item .country-name').contains(signUpUser.companyCountry).click();

    cy.get('dib-signup ui-input input[type="number"]').type(signUpUser.phoneNumber);
    cy.get('dib-signup ui-input input[name="password"]').eq(0).type(signUpUser.password);
    cy.get('dib-signup ui-input input[name="password"]').eq(1).type(signUpUser.password);
    cy.get('dib-signup ui-input input[name="companyName"]').type(signUpUser.companyName);
    cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(signUpUser.companyRegistrationNumber);
    cy.get('dib-signup ui-button').contains('Sign up').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'E-mail address does already exist or is not valid'
    );
  });

  it('should display error message when password is not 6 characters long', () => {
    const shortPassword = signUpUser.password.slice(0, 5);

    cy.get('dib-signup ui-input input[name="firstName"]').type(signUpUser.firstName);
    cy.get('dib-signup ui-input input[name="lastName"]').type(signUpUser.lastName);
    cy.get('dib-signup ui-input input[name="email"]').type(accounts.defaultAccount.email);
    cy.get('dib-signup ui-phone-picker ui-autocomplete').click();

    cy.get('dib-signup ui-phone-picker ui-autocomplete input').type(signUpUser.companyCountry);
    cy.get('.cdk-overlay-container .item .country-name').contains(signUpUser.companyCountry).click();

    cy.get('dib-signup ui-input input[type="number"]').type(signUpUser.phoneNumber);
    cy.get('dib-signup ui-input input[name="password"]').eq(0).type(shortPassword);
    cy.get('dib-signup ui-input input[name="password"]').eq(1).type(shortPassword);
    cy.get('dib-signup ui-input input[name="companyName"]').type(signUpUser.companyName);
    cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(signUpUser.companyRegistrationNumber);
    cy.get('dib-signup ui-button').contains('Sign up').click();

    cy.get('dib-signup ui-input .error').should('contain', 'Must be at least 6 characters long');
  });

  it('should display successful message after user signs up with valid data', () => {
    const signUpEmailWithHash = getEmailWithHash(signUpUser.email);

    cy.get('dib-signup ui-input input[name="firstName"]').type(signUpUser.firstName);
    cy.get('dib-signup ui-input input[name="lastName"]').type(signUpUser.lastName);
    cy.get('dib-signup ui-input input[name="email"]').type(signUpEmailWithHash);
    cy.get('dib-signup ui-phone-picker ui-autocomplete').click();

    cy.get('dib-signup ui-phone-picker ui-autocomplete input').type(signUpUser.companyCountry);
    cy.get('.cdk-overlay-container .item .country-name').contains(signUpUser.companyCountry).click();

    cy.get('dib-signup ui-input input[type="number"]').type(signUpUser.phoneNumber);
    cy.get('dib-signup ui-input input[name="password"]').eq(0).type(signUpUser.password);
    cy.get('dib-signup ui-input input[name="password"]').eq(1).type(signUpUser.password);
    cy.get('dib-signup ui-input input[name="companyName"]').type(signUpUser.companyName);
    cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(signUpUser.companyRegistrationNumber);
    cy.get('dib-signup ui-button').contains('Sign up').click();

    cy.get('dib-register-email-sent').should('contain', 'Check your e-mail and activate your account');
  });
});
