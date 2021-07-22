import { DibTravelAccounts, RegistrationUserDetails } from '../../../models';
import { getEmailWithHash } from '../../../helpers';

describe('Sign-up', () => {
  let accounts: DibTravelAccounts;
  let registrationUserDetails: RegistrationUserDetails;

  before(() => {
    cy.fixture('dib-travel-accounts').then((accountFixture) => {
      accounts = accountFixture;
    });
    cy.fixture('sign-up/registration-user-details').then((registrationFixture) => {
      registrationUserDetails = registrationFixture;
    });
  });

  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('should display error messages when empty sign-up form is submitted', () => {
    cy.get('dib-signup ui-button button').contains('Sign up').click();
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
    const email = accounts.defaultAccount.email;
    const invalidEmail = email.replace('@', '');
    cy.get('dib-signup ui-input input[name="firstName"]').type(registrationUserDetails.firstName);
    cy.get('dib-signup ui-input input[name="lastName"]').type(registrationUserDetails.lastName);
    cy.get('dib-signup ui-input input[name="email"]').type(invalidEmail);
    cy.get('dib-signup ui-phone-picker ui-autocomplete').click();
    cy.get('.cdk-overlay-container ui-panel cdk-virtual-scroll-viewport')
      .scrollTo(0, 8000)
      .contains(registrationUserDetails.companyCountry)
      .click();
    cy.get('dib-signup ui-input input[type="number"]').type(registrationUserDetails.phoneNumber);
    cy.get('dib-signup ui-input input[name="password"]').eq(0).type(accounts.signUpAccount.password);
    cy.get('dib-signup ui-input input[name="password"]').eq(1).type(accounts.signUpAccount.password);
    cy.get('dib-signup ui-input input[name="companyName"]').type(registrationUserDetails.companyName);
    cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(
      registrationUserDetails.companyRegistrationNumber
    );
    cy.get('dib-signup ui-button button').contains('Sign up').click();

    cy.get('dib-signup ui-input .error').should('contain', 'The email should be in email@example.com format');
  });

  it('should display pop up error message when existing email address is inserted', () => {
    cy.get('dib-signup ui-input input[name="firstName"]').type(registrationUserDetails.firstName);
    cy.get('dib-signup ui-input input[name="lastName"]').type(registrationUserDetails.lastName);
    cy.get('dib-signup ui-input input[name="email"]').type(accounts.defaultAccount.email);
    cy.get('dib-signup ui-phone-picker ui-autocomplete').click();
    cy.get('.cdk-overlay-container ui-panel cdk-virtual-scroll-viewport')
      .scrollTo(0, 8000)
      .contains(registrationUserDetails.companyCountry)
      .click();
    cy.get('dib-signup ui-input input[type="number"]').type(registrationUserDetails.phoneNumber);
    cy.get('dib-signup ui-input input[name="password"]').eq(0).type(accounts.signUpAccount.password);
    cy.get('dib-signup ui-input input[name="password"]').eq(1).type(accounts.signUpAccount.password);
    cy.get('dib-signup ui-input input[name="companyName"]').type(registrationUserDetails.companyName);
    cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(
      registrationUserDetails.companyRegistrationNumber
    );
    cy.get('dib-signup ui-button button').contains('Sign up').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'E-mail address does already exist or is not valid'
    );
  });

  it('should display error message when password is not 6 characters long', () => {
    const password = accounts.signUpAccount.password;
    const shortPassword = password.slice(0, 5);
    cy.get('dib-signup ui-input input[name="firstName"]').type(registrationUserDetails.firstName);
    cy.get('dib-signup ui-input input[name="lastName"]').type(registrationUserDetails.lastName);
    cy.get('dib-signup ui-input input[name="email"]').type(accounts.defaultAccount.email);
    cy.get('dib-signup ui-phone-picker ui-autocomplete').click();
    cy.get('.cdk-overlay-container ui-panel cdk-virtual-scroll-viewport')
      .scrollTo(0, 8000)
      .contains(registrationUserDetails.companyCountry)
      .click();
    cy.get('dib-signup ui-input input[type="number"]').type(registrationUserDetails.phoneNumber);
    cy.get('dib-signup ui-input input[name="password"]').eq(0).type(shortPassword);
    cy.get('dib-signup ui-input input[name="password"]').eq(1).type(shortPassword);
    cy.get('dib-signup ui-input input[name="companyName"]').type(registrationUserDetails.companyName);
    cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(
      registrationUserDetails.companyRegistrationNumber
    );
    cy.get('dib-signup ui-button button').contains('Sign up').click();

    cy.get('dib-signup ui-input .error').should('contain', 'Must be at least 6 characters long');
  });

  it('should display successful message after user signs up with valid data', () => {
    const signUpEmail = getEmailWithHash(accounts.signUpAccount.email);

    cy.get('dib-signup ui-input input[name="firstName"]').type(registrationUserDetails.firstName);
    cy.get('dib-signup ui-input input[name="lastName"]').type(registrationUserDetails.lastName);
    cy.get('dib-signup ui-input input[name="email"]').type(signUpEmail);
    cy.get('dib-signup ui-phone-picker ui-autocomplete').click();
    cy.get('.cdk-overlay-container ui-panel cdk-virtual-scroll-viewport')
      .scrollTo(0, 8000)
      .contains(registrationUserDetails.companyCountry)
      .click();
    cy.get('dib-signup ui-input input[type="number"]').type(registrationUserDetails.phoneNumber);
    cy.get('dib-signup ui-input input[name="password"]').eq(0).type(accounts.signUpAccount.password);
    cy.get('dib-signup ui-input input[name="password"]').eq(1).type(accounts.signUpAccount.password);
    cy.get('dib-signup ui-input input[name="companyName"]').type(registrationUserDetails.companyName);
    cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(
      registrationUserDetails.companyRegistrationNumber
    );
    cy.get('dib-signup ui-button button').contains('Sign up').click();

    cy.get('dib-register-email-sent div').should('contain', 'Check your e-mail and activate your account');
  });
});
