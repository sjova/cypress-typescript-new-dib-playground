import { ProfileDetails } from '../../../models';

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

  it('should "Profile" be displayed in side bar', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').should('contain', 'Profile');
  });

  it('should edit personal info', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Personal info')
      .parent('.profile-info__section')
      .find('ui-button')
      .click();

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

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Personal info')
      .parent('.profile-info__section')
      .within(() => {
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

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Contact info')
      .parent('.profile-info__section')
      .find('ui-button')
      .click();

    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="address1"]')
      .clear()
      .type(profileDetails.contactInfo.homeAddress);
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
      .type(profileDetails.contactInfo.mobileNumber);
    cy.get('.cdk-overlay-container ui-form-dialog ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Contact info')
      .parent('.profile-info__section')
      .within(() => {
        cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.homeAddress);
        cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.city);
        cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.zipCode);
        cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.country);
        cy.get('.profile-info__row').should('contain', profileDetails.contactInfo.mobileNumber);
      });
  });

  it('should edit localize (language & currency)', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Localize')
      .parent('.profile-info__section')
      .find('ui-button')
      .click();

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

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Localize')
      .parent('.profile-info__section')
      .within(() => {
        cy.get('.profile-info__row').should('contain', profileDetails.localize.language);
        cy.get('.profile-info__row').should('contain', profileDetails.localize.currency);
      });
  });

  it('should change email address', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .find('ui-button')
      .contains('edit email')
      .click();

    cy.get('.cdk-overlay-container dib-change-email input[name="email"]')
      .clear()
      .type(profileDetails.personalInfo.email);
    cy.get('.cdk-overlay-container dib-change-email input[name="password"]')
      .clear()
      .type(profileDetails.emailAndPassword.password);
    cy.get('.cdk-overlay-container dib-change-email ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Email Successfully Updated');

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .find('.profile-info__row')
      .should('contain', profileDetails.personalInfo.email);
  });

  it('should change password', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .find('ui-button')
      .contains('edit password')
      .click();

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
      .select(profileDetails.travelDocuments.title);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="firstName"]').type(
      profileDetails.personalInfo.firstName
    );
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="lastName"]').type(
      profileDetails.personalInfo.lastName
    );

    cy.get('.cdk-overlay-container dib-travel-document-dialog  dib-input-label .dib-label')
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

    cy.get('.cdk-overlay-container dib-travel-document-dialog  dib-input-label .dib-label')
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
      .type(profileDetails.travelDocuments.newIssuingCountry);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profileDetails.travelDocuments.newIssuingCountry)
      .click();

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-checkbox').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button').click();

    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should(
      'contain',
      profileDetails.travelDocuments.newIssuingCountry
    );
  });

  it('should delete travel document', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getEmployees');

    cy.wait('@getEmployees');

    cy.get('dib-profile dib-account .travel-documents')
      .contains(profileDetails.travelDocuments.newIssuingCountry)
      .next('td')
      .contains('delete')
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    cy.get('dib-profile dib-account dib-travel-documents').should(
      'not.contain',
      profileDetails.travelDocuments.newIssuingCountry
    );
  });

  it('should add loyalty program', () => {
    cy.get('dib-profile dib-account .loyalty-program ui-button').click();

    cy.get('.cdk-overlay-container dib-add-loyalty ui-button').click();
    cy.get('.cdk-overlay-container dib-add-loyalty dib-loyalty-auto-complete')
      .type(profileDetails.loyaltyProgram.loyaltyProgramProvider)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('.cdk-overlay-container dib-add-loyalty input[name="program"]').type(
      profileDetails.loyaltyProgram.loyaltyNumber
    );
    cy.get('.cdk-overlay-container dib-add-loyalty ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program saved');

    cy.get('dib-profile dib-account .loyalty-name')
      .eq(0)
      .should('contain', profileDetails.loyaltyProgram.loyaltyProgramProvider);
    cy.get('dib-profile dib-account .loyalty-name')
      .eq(1)
      .should('contain', profileDetails.loyaltyProgram.loyaltyNumber);
  });

  it('should delete loyalty program', () => {
    cy.intercept('GET', '/api/secure/v1/customers/*/memberships').as('getMemberships');

    cy.wait('@getMemberships');

    cy.get('dib-profile dib-account .loyalty-name')
      .contains(profileDetails.loyaltyProgram.loyaltyProgramProvider)
      .parent('.grid-data')
      .next('.grid-button')
      .find('button')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type="warning"] button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program successfully deleted');

    // TODO: Revisit this later
    cy.get('dib-profile dib-account .profile-info .loyalty-program').should(
      'not.contain',
      profileDetails.loyaltyProgram.loyaltyProgramProvider
    );
    // cy.get('dib-profile dib-account .profile-info').should('not.contain', profileDetails.loyaltyNumber);
  });
});
