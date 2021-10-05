import { ProfileDetails } from '@cy/models';
import { clickCtaInsideSection, getSection } from './helpers';

describe('Personal Settings - Profile', () => {
  let profileDetails: ProfileDetails;

  before(() => {
    cy.fixture('personal-settings/profile-details').then((profileDetailsFixture) => {
      profileDetails = profileDetailsFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/profile/account');
  });

  it('should display "Profile" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Profile');
  });

  it('should edit personal info', () => {
    clickCtaInsideSection('Personal info');

    cy.get('.cdk-overlay-container ui-form-dialog dib-radio-group').contains('Mrs').click();

    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="firstName"]')
      .clear()
      .type(profileDetails.personalInfo.firstName);
    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="lastName"]')
      .clear()
      .type(profileDetails.personalInfo.lastName);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.day').select(
      profileDetails.personalInfo.birthDay
    );
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.month').select(
      profileDetails.personalInfo.birthMonth
    );
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.year').select(
      profileDetails.personalInfo.birthYear
    );
    cy.get('.cdk-overlay-container ui-form-dialog ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');

    getSection('Personal info').within(() => {
      cy.get('.profile-info__row').should('contain', profileDetails.personalInfo.gender);
      cy.get('.profile-info__row').should('contain', profileDetails.personalInfo.firstName);
      cy.get('.profile-info__row').should('contain', profileDetails.personalInfo.lastName);
      cy.get('.profile-info__row').should('contain', profileDetails.personalInfo.birthDay);
      cy.get('.profile-info__row').should('contain', profileDetails.personalInfo.birthMonth);
      cy.get('.profile-info__row').should('contain', profileDetails.personalInfo.birthYear);
    });
  });

  it('should edit contact info', () => {
    cy.intercept('GET', '/api/public/v1/details/locations/countries').as('getCountries');

    cy.wait('@getCountries');

    clickCtaInsideSection('Contact info');

    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="address1"]')
      .clear()
      .type(profileDetails.contactInfo.address);
    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="city"]')
      .clear()
      .type(profileDetails.contactInfo.city);
    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="zipCode"]')
      .clear()
      .type(profileDetails.contactInfo.zipCode);
    cy.get('.cdk-overlay-container ui-form-dialog dib-searchable-select dib-input')
      .clear()
      .type(profileDetails.contactInfo.country);
    cy.get('.cdk-overlay-container ui-form-dialog ui-autocomplete-wrapper dib-searchable-select')
      .contains(profileDetails.contactInfo.country)
      .click();
    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="cellphone"]')
      .clear()
      .type(profileDetails.contactInfo.phoneNumber);
    cy.get('.cdk-overlay-container ui-form-dialog ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');

    getSection('Contact info').within(() => {
      cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.address);
      cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.city);
      cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.zipCode);
      cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.country);
      cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.phoneNumber);
    });
  });

  it('should edit localize (language & currency)', () => {
    clickCtaInsideSection('Localize');

    cy.get('.cdk-overlay-container ui-form-dialog language-picker').click();
    cy.get('.cdk-overlay-container ui-form-dialog language-picker .picker .opinional-language')
      .contains(profileDetails.localize.language)
      .click();
    cy.get('.cdk-overlay-container ui-form-dialog currency-picker')
      .click()
      .contains(profileDetails.localize.currency)
      .click();
    cy.get('.cdk-overlay-container ui-form-dialog ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');

    getSection('Localize').within(() => {
      cy.get('.profile-info__row').should('contain', profileDetails.localize.language);
      cy.get('.profile-info__row').should('contain', profileDetails.localize.currency);
    });
  });

  it('should display error that email address is not valid', () => {
    clickCtaInsideSection('email & password', 'edit email');

    cy.get('.cdk-overlay-container dib-change-email input[name="email"]')
      .clear()
      .type(profileDetails.emailAndPassword.email.replace('@', ''));
    cy.get('.cdk-overlay-container dib-change-email input[name="password"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container dib-change-email ui-button').click();

    cy.get('.cdk-overlay-container dib-change-email dib-input .dib-input-error').should('contain', 'Email not valid');
  });

  it('should display error that password is not correct when user try to change an email', () => {
    clickCtaInsideSection('email & password', 'edit email');

    cy.get('.cdk-overlay-container dib-change-email input[name="email"]')
      .clear()
      .type(profileDetails.emailAndPassword.email);
    cy.get('.cdk-overlay-container dib-change-email input[name="password"]')
      .clear()
      .type(profileDetails.emailAndPassword.password.replace(/\d/g, ''));
    cy.get('.cdk-overlay-container dib-change-email ui-button').click();

    cy.get('.cdk-overlay-container dib-change-email dib-input .dib-input-error').should(
      'contain',
      'Password is not correct'
    );
  });

  it('should change email address', () => {
    clickCtaInsideSection('email & password', 'edit email');

    cy.get('.cdk-overlay-container dib-change-email input[name="email"]')
      .clear()
      .type(profileDetails.emailAndPassword.email);
    cy.get('.cdk-overlay-container dib-change-email input[name="password"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container dib-change-email ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Email Successfully Updated');

    getSection('email & password').find('.profile-info__row').should('contain', profileDetails.emailAndPassword.email);
  });

  it('should display error that password must be equal', () => {
    clickCtaInsideSection('email & password', 'edit password');

    cy.get('.cdk-overlay-container change-password input[name="password"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container change-password input[name="newPassword"]')
      .clear()
      .type(profileDetails.emailAndPassword.password.replace(/\d/g, ''));
    cy.get('.cdk-overlay-container change-password input[name="confirmNewPassword"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container change-password ui-button').click();

    cy.get('.cdk-overlay-container change-password dib-input .dib-input-error').should(
      'contain',
      'Passwords must be equal'
    );
  });

  it('should display error that old password is not correct', () => {
    clickCtaInsideSection('email & password', 'edit password');

    cy.get('.cdk-overlay-container change-password input[name="password"]')
      .clear()
      .type(profileDetails.emailAndPassword.password.replace(/\d/g, ''));
    cy.get('.cdk-overlay-container change-password input[name="newPassword"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container change-password input[name="confirmNewPassword"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container change-password ui-button').click();

    cy.get('.cdk-overlay-container change-password dib-input .dib-input-error').should(
      'contain',
      'Old password is not correct'
    );
  });

  it('should display error that minimum length is 6 for password', () => {
    clickCtaInsideSection('email & password', 'edit password');

    cy.get('.cdk-overlay-container change-password input[name="password"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container change-password input[name="newPassword"]')
      .clear()
      .type(profileDetails.emailAndPassword.password.replace(/\D/g, ''));
    cy.get('.cdk-overlay-container change-password input[name="confirmNewPassword"]')
      .clear()
      .type(profileDetails.emailAndPassword.password.replace(/\D/g, ''));
    cy.get('.cdk-overlay-container change-password ui-button').click();

    cy.get('.cdk-overlay-container change-password dib-input .dib-input-error').should(
      'contain',
      'Minimum length is 6'
    );
  });

  it('should change password', () => {
    clickCtaInsideSection('email & password', 'edit password');

    cy.get('.cdk-overlay-container change-password input[name="password"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container change-password input[name="newPassword"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container change-password input[name="confirmNewPassword"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container change-password ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Password Successfully Updated');
  });

  it('should submit empty form for travel document', () => {
    cy.get('dib-profile dib-account dib-travel-documents ui-button').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button').click();

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input .dib-input-error').should(
      'contain',
      'Required'
    );
  });

  it('should add travel document', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getEmployees');
    cy.intercept('GET', 'api/public/v1/details/locations/countries/for-travel-documents').as(
      'getCountriesForTravelDocuments'
    );

    cy.wait(['@getEmployees', '@getCountriesForTravelDocuments']);

    cy.get('dib-profile dib-account dib-travel-documents ui-button').click();

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-select-wrapper')
      .contains('Document type')
      .parent('select')
      .select(profileDetails.travelDocuments.documentType);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-select-wrapper')
      .contains('Gender')
      .parent('select')
      .select(profileDetails.travelDocuments.gender);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="firstName"]').type(
      profileDetails.personalInfo.firstName
    );
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="lastName"]').type(
      profileDetails.personalInfo.lastName
    );

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input-label .dib-label')
      .contains('Date of birth*')
      .parent('dib-input-label')
      .next('ui-date-wrapper')
      .within(() => {
        cy.get('dib-select-dob select.day').select(profileDetails.personalInfo.birthDay);
        cy.get('dib-select-dob select.month').select(profileDetails.personalInfo.birthMonth);
        cy.get('dib-select-dob select.year').select(profileDetails.personalInfo.birthYear);
      });

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="idNumber"]').type(
      profileDetails.travelDocuments.documentNumber
    );

    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-searchable-select input[placeholder="Issuing country"]'
    )
      .click()
      .clear()
      .type(profileDetails.travelDocuments.issuingCountry);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profileDetails.travelDocuments.issuingCountry)
      .click();

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input-label .dib-label')
      .contains('Expiry date*')
      .parent('dib-input-label')
      .next('ui-date-wrapper')
      .within(() => {
        cy.get('dib-select-dob select.day').select(profileDetails.travelDocuments.expiryDay);
        cy.get('dib-select-dob select.month').select(profileDetails.travelDocuments.expiryMonth);
        cy.get('dib-select-dob select.year').select(profileDetails.travelDocuments.expiryYear);
      });

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[placeholder="Nationality"]').type(
      profileDetails.travelDocuments.nationality
    );
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profileDetails.travelDocuments.nationality)
      .click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-checkbox-wrapper').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button').click();

    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should(
      'contain',
      profileDetails.travelDocuments.issuingCountry
    );
  });

  it('should edit travel document', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getEmployees');
    cy.intercept('GET', 'api/public/v1/details/locations/countries/for-travel-documents').as(
      'getCountriesForTravelDocuments'
    );

    cy.wait(['@getEmployees', '@getCountriesForTravelDocuments']);

    cy.get('dib-profile dib-account dib-travel-documents')
      .contains(profileDetails.travelDocuments.issuingCountry)
      .next('td')
      .contains('Edit')
      .click();

    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-searchable-select input[placeholder="Issuing country"]'
    )
      .click()
      .clear()
      .type(profileDetails.travelDocuments.changeIssuingCountry);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profileDetails.travelDocuments.changeIssuingCountry)
      .click();

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-checkbox').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button').click();

    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should(
      'contain',
      profileDetails.travelDocuments.changeIssuingCountry
    );
  });

  it('should delete travel document', () => {
    cy.waitForAngular();

    cy.get('dib-profile dib-account .travel-documents')
      .contains(profileDetails.travelDocuments.changeIssuingCountry)
      .next('td')
      .contains('delete')
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    cy.get('dib-profile dib-account dib-travel-documents').should(
      'not.contain',
      profileDetails.travelDocuments.changeIssuingCountry
    );
  });

  it('should add flight loyalty program', () => {
    cy.waitForAngular();

    cy.get('dib-profile dib-account .loyalty-program ui-button').click();

    cy.get('.cdk-overlay-container dib-add-loyalty ui-button').click();
    cy.get('.cdk-overlay-container dib-add-loyalty dib-loyalty-auto-complete')
      .type(profileDetails.loyaltyProgram.flightProvider)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('.cdk-overlay-container dib-add-loyalty input[name="program"]').type(profileDetails.loyaltyProgram.number);
    cy.get('.cdk-overlay-container dib-add-loyalty ui-button').click();

    cy.waitForAngular();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program saved');

    cy.get('dib-profile dib-account .loyalty-name')
      .eq(0)
      .should('contain', profileDetails.loyaltyProgram.flightProvider);
    cy.get('dib-profile dib-account .loyalty-name').eq(1).should('contain', profileDetails.loyaltyProgram.number);
  });

  it('should delete flight loyalty program', () => {
    cy.waitForAngular();

    cy.get('dib-profile dib-account .loyalty-name')
      .contains(profileDetails.loyaltyProgram.flightProvider)
      .parent('.grid-data')
      .next('.grid-button')
      .find('button')
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type="warning"] button').click();

    cy.waitForAngular();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program successfully deleted');

    cy.get('dib-profile dib-account .profile-info .loyalty-program__grid').should('not.exist');
    cy.get('dib-profile dib-account .profile-info').should('not.contain', profileDetails.loyaltyProgram.flightProvider);
  });

  it('should add train loyalty program', () => {
    cy.waitForAngular();

    cy.get('dib-profile dib-account .loyalty-program ui-button').click();

    cy.get('.cdk-overlay-container dib-add-loyalty dib-radio-group').contains('Train').click();

    cy.get('.cdk-overlay-container dib-add-loyalty ui-button').click();
    cy.get('.cdk-overlay-container dib-add-loyalty dib-loyalty-auto-complete')
      .type(profileDetails.loyaltyProgram.trainProvider)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('.cdk-overlay-container dib-add-loyalty input[name="program"]').type(profileDetails.loyaltyProgram.number);
    cy.get('.cdk-overlay-container dib-add-loyalty ui-button').click();

    cy.waitForAngular();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program saved');

    cy.get('dib-profile dib-account .loyalty-name')
      .eq(0)
      .should('contain', profileDetails.loyaltyProgram.trainProvider);
    cy.get('dib-profile dib-account .loyalty-name').eq(1).should('contain', profileDetails.loyaltyProgram.number);
  });

  it('should delete train loyalty program', () => {
    cy.waitForAngular();

    cy.get('dib-profile dib-account .loyalty-name')
      .contains(profileDetails.loyaltyProgram.trainProvider)
      .parent('.grid-data')
      .next('.grid-button')
      .find('button')
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type="warning"] button').click();

    cy.waitForAngular();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program successfully deleted');

    cy.get('dib-profile dib-account .profile-info .loyalty-program__grid').should('not.exist');
    cy.get('dib-profile dib-account .profile-info').should('not.contain', profileDetails.loyaltyProgram.trainProvider);
  });
});
