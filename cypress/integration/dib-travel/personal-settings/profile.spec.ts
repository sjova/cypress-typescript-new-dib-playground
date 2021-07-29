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
      .type(profileDetails.firstName);
    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="lastName"]')
      .clear()
      .type(profileDetails.lastName);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.day').select(profileDetails.birthDay);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.month').select(profileDetails.birthMonth);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.year').select(profileDetails.birthYear);
    cy.get('.cdk-overlay-container ui-form-dialog ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Personal info')
      .parent('.profile-info__section')
      .within(() => {
        cy.get('.profile-info__row').should('contain', profileDetails.firstName);
        cy.get('.profile-info__row').should('contain', profileDetails.lastName);
        cy.get('.profile-info__row').should('contain', profileDetails.birthDay);
        cy.get('.profile-info__row').should('contain', profileDetails.birthMonth);
        cy.get('.profile-info__row').should('contain', profileDetails.birthYear);
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
      .type(profileDetails.homeAddress);
    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="city"]').clear().type(profileDetails.city);
    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="zipCode"]')
      .clear()
      .type(profileDetails.zipCode);
    cy.get('.cdk-overlay-container ui-form-dialog dib-searchable-select dib-input')
      .clear()
      .type(profileDetails.country);
    cy.get('.cdk-overlay-container ui-form-dialog ui-autocomplete-wrapper dib-searchable-select')
      .contains(profileDetails.country)
      .click();
    cy.get('.cdk-overlay-container ui-form-dialog dib-input input[name="cellphone"]')
      .clear()
      .type(profileDetails.mobileNumber);
    cy.get('.cdk-overlay-container ui-form-dialog ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Contact info')
      .parent('.profile-info__section')
      .within(() => {
        cy.get('.profile-info__row').should('contain', profileDetails.homeAddress);
        cy.get('.profile-info__row').should('contain', profileDetails.city);
        cy.get('.profile-info__row').should('contain', profileDetails.zipCode);
        cy.get('.profile-info__row').should('contain', profileDetails.country);
        cy.get('.profile-info__row').should('contain', profileDetails.mobileNumber);
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
      .contains(profileDetails.language)
      .click();
    cy.get('.cdk-overlay-container ui-form-dialog currency-picker').click().contains(profileDetails.currency).click();
    cy.get('.cdk-overlay-container ui-form-dialog ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Localize')
      .parent('.profile-info__section')
      .within(() => {
        cy.get('.profile-info__row').should('contain', profileDetails.language);
        cy.get('.profile-info__row').should('contain', profileDetails.currency);
      });
  });

  it('should change email address', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .find('ui-button')
      .contains('edit email')
      .click();

    cy.get('.cdk-overlay-container dib-change-email input[name="email"]').clear().type(profileDetails.email);
    cy.get('.cdk-overlay-container dib-change-email input[name="password"]').clear().type(profileDetails.password);
    cy.get('.cdk-overlay-container dib-change-email ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Email Successfully Updated');

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .find('.profile-info__row')
      .should('contain', profileDetails.email);
  });

  it('should change password', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .find('ui-button')
      .contains('edit password')
      .click();

    cy.get('.cdk-overlay-container change-password input[name="password"]').clear().type(profileDetails.password);
    cy.get('.cdk-overlay-container change-password input[name="newPassword"]').clear().type(profileDetails.password);
    cy.get('.cdk-overlay-container change-password input[name="confirmNewPassword"]')
      .clear()
      .type(profileDetails.password);
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
      .select(profileDetails.documentType);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-select-wrapper')
      .contains('Gender')
      .parent('select')
      .select(profileDetails.title);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="firstName"]').type(
      profileDetails.firstName
    );
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="lastName"]').type(
      profileDetails.lastName
    );

    cy.get('.cdk-overlay-container dib-travel-document-dialog  dib-input-label .dib-label')
      .contains('Date of birth*')
      .parent('dib-input-label')
      .next('ui-date-wrapper')
      .within(() => {
        cy.get('dib-select-dob select.day').select(profileDetails.birthDay);
        cy.get('dib-select-dob select.month').select(profileDetails.birthMonth);
        cy.get('dib-select-dob select.year').select(profileDetails.birthYear);
      });

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="idNumber"]').type(
      profileDetails.documentNumber
    );

    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-searchable-select input[placeholder="Issuing country"]'
    )
      .click()
      .clear()
      .type(profileDetails.issuingCountry);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profileDetails.issuingCountry)
      .click();

    cy.get('.cdk-overlay-container dib-travel-document-dialog  dib-input-label .dib-label')
      .contains('Expiry date*')
      .parent('dib-input-label')
      .next('ui-date-wrapper')
      .within(() => {
        cy.get('dib-select-dob select.day').select(profileDetails.expiryDay);
        cy.get('dib-select-dob select.month').select(profileDetails.expiryMonth);
        cy.get('dib-select-dob select.year').select(profileDetails.expiryYear);
      });

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[placeholder="Nationality"]').type(
      profileDetails.nationality
    );
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profileDetails.nationality)
      .click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-checkbox-wrapper').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button').click();

    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', profileDetails.issuingCountry);
  });

  it('should edit travel document', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getEmployees');
    cy.intercept('GET', 'api/public/v1/details/locations/countries/for-travel-documents').as(
      'getCountriesForTravelDocuments'
    );

    cy.wait(['@getEmployees', '@getCountriesForTravelDocuments']);

    cy.get('dib-profile dib-account dib-travel-documents')
      .contains(profileDetails.issuingCountry)
      .next('td')
      .contains('Edit')
      .click();

    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-searchable-select input[placeholder="Issuing country"]'
    )
      .click()
      .clear()
      .type(profileDetails.newIssuingCountry);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profileDetails.newIssuingCountry)
      .click();

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-checkbox').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button').click();

    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', profileDetails.newIssuingCountry);
  });

  it('should delete travel document', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getEmployees');

    cy.wait('@getEmployees');

    cy.get('dib-profile dib-account .travel-documents')
      .contains(profileDetails.newIssuingCountry)
      .next('td')
      .contains('delete')
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    cy.get('dib-profile dib-account dib-travel-documents').should('not.contain', profileDetails.newIssuingCountry);
  });

  // TODO: Add missing user via shared fn
  // Please use following structure for shared group
  // dib-travel/<feature-name>/shared/<shared-group-of-commands>.ts - please be descriptive
  // dib-travel/<feature-name>/index.ts - please export shared test command
  it('should add Internal travel agent', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getEmployees');
    cy.intercept('POST', '/api/secure/v1/customers/*/internal-travel-agents').as('postInternalTravelAgents');

    cy.wait('@getEmployees');

    // Fix custom delay in implementation
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get('dib-profile dib-account dib-internal-agents ui-button').contains('Add').click();

    cy.get('.cdk-overlay-container dib-internal-agents-dialog dib-assign-members .member .user')
      .contains(profileDetails.employee)
      .click();
    cy.get('.cdk-overlay-container dib-internal-agents-dialog ui-button').contains('Add').click();

    cy.wait('@postInternalTravelAgents');

    cy.get('dib-profile dib-account dib-internal-agents .--first').should('contain', profileDetails.employee);
  });

  // TODO: Add missing user via shared fn
  // Please use following structure for shared group
  // dib-travel/<feature-name>/shared/<shared-group-of-commands>.ts - please be descriptive
  // dib-travel/<feature-name>/index.ts - please export shared test command
  it('should delete Internal travel agent', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getEmployees');
    cy.intercept('POST', '/api/secure/v1/customers/*/internal-travel-agents').as('postInternalTravelAgents');

    cy.wait('@getEmployees');

    cy.get('dib-profile dib-account dib-internal-agents .--first')
      .contains(profileDetails.employee)
      .next('.--middle')
      .next('.--last')
      .find('ui-button')
      .click();

    cy.wait('@postInternalTravelAgents');

    cy.get('dib-profile dib-account dib-internal-agents').should('not.contain', profileDetails.employee);
  });

  it('should add loyalty program', () => {
    cy.get('dib-profile dib-account .loyalty-program ui-button').click();

    cy.get('.cdk-overlay-container dib-add-loyalty ui-button').click();
    cy.get('.cdk-overlay-container dib-add-loyalty dib-loyalty-auto-complete')
      .type(profileDetails.loyaltyProgram)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('.cdk-overlay-container dib-add-loyalty input[name="program"]').type(profileDetails.loyaltyNumber);
    cy.get('.cdk-overlay-container dib-add-loyalty ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program saved');

    cy.get('dib-profile dib-account .loyalty-name').eq(0).should('contain', profileDetails.loyaltyProgram);
    cy.get('dib-profile dib-account .loyalty-name').eq(1).should('contain', profileDetails.loyaltyNumber);
  });

  it('should delete loyalty program', () => {
    cy.intercept('GET', '/api/secure/v1/customers/*/memberships').as('getMemberships');

    cy.wait('@getMemberships');

    cy.get('dib-profile dib-account .loyalty-name')
      .contains(profileDetails.loyaltyProgram)
      .parent('.grid-data')
      .next('.grid-button')
      .find('button')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type="warning"] button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program successfully deleted');

    // TODO: Revisit this later
    cy.get('dib-profile dib-account .profile-info').should('not.contain', profileDetails.loyaltyProgram);
    // cy.get('dib-profile dib-account .profile-info').should('not.contain', profileDetails.loyaltyNumber);
  });
});
