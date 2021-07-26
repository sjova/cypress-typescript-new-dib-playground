import { Profile } from '../../../models';

describe('Personal Settings - Profile', () => {
  let profile: Profile;

  before(() => {
    cy.fixture('personal-settings/profile').then((profileFixture) => {
      profile = profileFixture;
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
      .within(() => {
        return cy.get('ui-button button').click();
      });

    cy.get('.cdk-overlay-container dib-input input[name="firstName"]').clear().type(profile.name);
    cy.get('.cdk-overlay-container dib-input input[name="lastName"]').clear().type(profile.lastName);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.day').select(profile.birthDay);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.month').select(profile.birthMonth);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.year').select(profile.birthYear);
    cy.get('.cdk-overlay-container ui-button-wrapper ui-button ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.name);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.lastName);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.birthDay);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.birthMonth);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.birthYear);
  });

  it('should edit contact info', () => {
    cy.intercept('GET', '/api/public/v1/details/locations/countries').as('getCountries');
    cy.wait('@getCountries');

    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Contact info')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').click();
      });

    cy.get('.cdk-overlay-container dib-input input[name="address1"]').clear().type(profile.homeAddress);
    cy.get('.cdk-overlay-container dib-input input[name="city"]').clear().type(profile.city);
    cy.get('.cdk-overlay-container dib-input input[name="zipCode"]').clear().type(profile.zipCode);
    cy.get('.cdk-overlay-container dib-searchable-select dib-input').clear().type(profile.country);
    cy.get('.cdk-overlay-container ui-autocomplete-wrapper dib-searchable-select').contains(profile.country).click();
    cy.get('.cdk-overlay-container dib-input input[name="cellphone"]').clear().type(profile.mobileNumber);
    cy.get('.cdk-overlay-container ui-button-wrapper ui-button ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.homeAddress);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.city);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.zipCode);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.country);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.mobileNumber);
  });

  it('should edit localize (language & currency)', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Localize')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').click();
      });

    cy.get('.cdk-overlay-container ui-language-wrapper language-picker').click();
    cy.get('.cdk-overlay-container language-picker .picker').contains(profile.language).click();
    cy.get('.cdk-overlay-container ui-currency-wrapper currency-picker').click().contains(profile.currency).click();
    cy.get('.cdk-overlay-container ui-button-wrapper ui-button ').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');

    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.language);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.currency);
  });

  it('should change email address', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').contains('edit email').click();
      });

    cy.get('.cdk-overlay-container dib-change-email input[name="email"]').clear().type(profile.email);
    cy.get('.cdk-overlay-container dib-change-email input[name="password"]').clear().type(profile.password);
    cy.get('.cdk-overlay-container dib-change-email ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Email Successfully Updated');

    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profile.email);
  });

  it('should change password', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').contains('edit password').click();
      });

    cy.get('.cdk-overlay-container change-password input[name="password"]').clear().type(profile.password);
    cy.get('.cdk-overlay-container change-password input[name="newPassword"]').clear().type(profile.password);
    cy.get('.cdk-overlay-container change-password input[name="confirmNewPassword"]').clear().type(profile.password);
    cy.get('.cdk-overlay-container change-password ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Password Successfully Updated');
  });

  it('should add travel document', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');
    cy.intercept('GET', 'api/public/v1/details/locations/countries/for-travel-documents').as(
      'getCountriesForTravelDocuments'
    );
    cy.wait(['@getCorporationsEmployees', '@getCountriesForTravelDocuments']);

    cy.get('dib-profile dib-account dib-travel-documents button').click();

    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-select-wrapper')
      .contains('Document type')
      .parents('dib-select')
      .within(() => {
        return cy.get('select').select(profile.documentType);
      });
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-select-wrapper')
      .contains('Gender')
      .parents('dib-select')
      .within(() => {
        return cy.get('select').select(profile.title);
      });
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="firstName"]').type(profile.name);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="lastName"]').type(profile.lastName);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="dateOfBirth"] select.day'
    ).select(profile.birthDay);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="dateOfBirth"] select.month'
    ).select(profile.birthMonth);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="dateOfBirth"] select.year'
    ).select(profile.birthYear);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="idNumber"]').type(
      profile.documentNumber
    );

    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-searchable-select input[placeholder="Issuing country"]'
    )
      .click()
      .clear()
      .type(profile.issuingCountry);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profile.issuingCountry)
      .click();

    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="expiryDate"] select.day'
    ).select(profile.expiryDay);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="expiryDate"] select.month'
    ).select(profile.expiryMonth);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="expiryDate"] select.year'
    ).select(profile.expiryYear);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[placeholder="Nationality"]').type(
      profile.nationality
    );
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profile.nationality)
      .click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-checkbox-wrapper').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button').click();

    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', profile.issuingCountry);
  });

  it('should edit travel document', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');
    cy.intercept('GET', 'api/public/v1/details/locations/countries/for-travel-documents').as(
      'getCountriesForTravelDocuments'
    );
    cy.wait(['@getCorporationsEmployees', '@getCountriesForTravelDocuments']);

    cy.get('dib-profile dib-account .travel-documents')
      .contains(profile.issuingCountry)
      .next()
      .contains('Edit')
      .click();

    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-searchable-select input[placeholder="Issuing country"]'
    )
      .click()
      .clear()
      .type(profile.newIssuingCounty);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select .select-list')
      .contains(profile.newIssuingCounty)
      .click();

    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-checkbox-wrapper dib-checkbox').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button button').click();

    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', profile.newIssuingCounty);
  });
  it('should delete travel document', () => {
    cy.intercept('/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');
    cy.wait('@getCorporationsEmployees');

    cy.get('dib-profile dib-account .travel-documents')
      .contains(profile.newIssuingCounty)
      .next()
      .contains('delete')
      .click();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    cy.get('dib-profile dib-account dib-travel-documents').should('not.contain', profile.newIssuingCounty);
  });

  // TODO: Internal travel agent is not added
  // it.only('should add Internal travel agent', () => {
  //   cy.intercept('/api/secure/v1/customers/*/internal-travel-agents').as('getInternalTravelAgents');

  //   cy.get('dib-profile dib-account .internal-agents button').contains('Add').click();

  //   cy.get('.cdk-overlay-container dib-internal-agents-dialog dib-assign-members .members')
  //     .contains('QA Test Bot')
  //     .click();

  //   cy.get('.cdk-overlay-container dib-internal-agents-dialog ui-button button').contains('Add').click();
  //   cy.wait('@getInternalTravelAgents');
  // });

  it('should add loyalty program', () => {
    cy.get('dib-profile dib-account .profile-info__section.loyalty-program button').click();

    cy.get('.cdk-overlay-container dib-add-loyalty button').click();
    cy.get('.cdk-overlay-container dib-add-loyalty dib-loyalty-auto-complete')
      .type(profile.loyaltyProgram)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-loyalty input[name="program"]').type(
      profile.loyaltyNumber
    );
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-loyalty button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program saved');

    cy.get('dib-profile dib-account .loyalty-program__grid').should('contain', profile.loyaltyProgram);
    cy.get('dib-profile dib-account .loyalty-program__grid').should('contain', profile.loyaltyNumber);
  });

  it('should delete loyalty program', () => {
    cy.intercept('/api/secure/v1/customers/*/memberships').as('getMemberships');
    cy.wait('@getMemberships');

    cy.get('dib-profile dib-account .loyalty-name')
      .contains(profile.loyaltyProgram)
      .parent()
      .parent()
      .within(() => {
        return cy.get('button').clickAttached();
      });
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program successfully deleted');

    cy.get('dib-profile dib-account .profile-info__section.loyalty-program').should(
      'not.contain',
      profile.loyaltyNumber
    );
  });
});
