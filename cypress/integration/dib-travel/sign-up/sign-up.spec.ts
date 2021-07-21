import { DibTravelAccounts, RegistrationUserDetails } from '../../../models';
import { getSignUpEmailWithHash } from '../../../helpers';

describe('Sign-up Page', () => {
  let userSignUpUpEmailPassword: DibTravelAccounts;
  let registrationUserDetails: RegistrationUserDetails;

  before(() => {
    cy.fixture('dib-travel-accounts').then((userSignUpEmailPasswordData) => {
      userSignUpUpEmailPassword = userSignUpEmailPasswordData;
    });
    cy.fixture('sign-up/registration-user-details').then((registrationData) => {
      registrationUserDetails = registrationData;
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
    const email = userSignUpUpEmailPassword.defaultAccount.email;
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
    cy.get('dib-signup ui-input input[name="password"]').eq(0).type(userSignUpUpEmailPassword.signUpAccount.password);
    cy.get('dib-signup ui-input input[name="password"]').eq(1).type(userSignUpUpEmailPassword.signUpAccount.password);
    cy.get('dib-signup ui-input input[name="companyName"]').type(registrationUserDetails.companyName);
    cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(
      registrationUserDetails.companyRegistrationNumber
    );
    cy.get('dib-signup ui-button button').contains('Sign up').click();
    cy.get('dib-signup ui-input .error').should('contain', 'The email should be in email@example.com format');
  });

  it('should display successful message after user signs up with valid data', () => {
    const signUpEmail = getSignUpEmailWithHash(userSignUpUpEmailPassword.signUpAccount.email);
    cy.intercept('GET', '/api/public/v1/details/locations/countries').as('getCountries');

    cy.wait('@getCountries').then(() => {
      cy.get('dib-signup ui-input input[name="firstName"]').type(registrationUserDetails.firstName);
      cy.get('dib-signup ui-input input[name="lastName"]').type(registrationUserDetails.lastName);
      cy.get('dib-signup ui-input input[name="email"]').type(signUpEmail);
      cy.get('dib-signup ui-phone-picker ui-autocomplete').click();
      cy.get('.cdk-overlay-container ui-panel cdk-virtual-scroll-viewport')
        .scrollTo(0, 8000)
        .contains(registrationUserDetails.companyCountry)
        .click();
      cy.get('dib-signup ui-input input[type="number"]').type(registrationUserDetails.phoneNumber);
      cy.get('dib-signup ui-input input[name="password"]').eq(0).type(userSignUpUpEmailPassword.signUpAccount.password);
      cy.get('dib-signup ui-input input[name="password"]').eq(1).type(userSignUpUpEmailPassword.signUpAccount.password);
      cy.get('dib-signup ui-input input[name="companyName"]').type(registrationUserDetails.companyName);
      cy.get('dib-signup ui-input input[name="companyRegistrationNumber"]').type(
        registrationUserDetails.companyRegistrationNumber
      );
      cy.get('dib-signup ui-button button').contains('Sign up').click();
    });
    cy.get('dib-register-email-sent div').should('contain', 'Check your e-mail and activate your account');
  });
});
