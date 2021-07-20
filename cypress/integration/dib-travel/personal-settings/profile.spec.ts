import { Profile } from '../../../models';

describe('Personal settings - Profile page', () => {
  let profileDetails: Profile;

  before(() => {
    cy.fixture('personal-settings/profile').then((profile) => {
      profileDetails = profile;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/profile/account');
  });

  it('should "Profile" be displayed in side bar', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Profile');
  });

  it('should edit personal info', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Personal info')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').click();
      });
    cy.get('.cdk-overlay-container dib-input input[name="firstName"]').clear().type(profileDetails.name);
    cy.get('.cdk-overlay-container dib-input input[name="lastName"]').clear().type(profileDetails.lastName);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.day').select(profileDetails.birthDay);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.month').select(profileDetails.birthMonth);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.year').select(profileDetails.birthYear);
    cy.get('.cdk-overlay-container ui-button-wrapper ui-button ').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.name);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.lastName);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.birthDay);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.birthMonth);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.birthYear);
  });

  it('should edit contact info', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Contact info')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').click();
      });
    cy.get('.cdk-overlay-container dib-input input[name="address1"]').clear().type(profileDetails.homeAddress);
    cy.get('.cdk-overlay-container dib-input input[name="city"]').clear().type(profileDetails.city);
    cy.get('.cdk-overlay-container dib-input input[name="zipCode"]').clear().type(profileDetails.zipCode);
    cy.get('.cdk-overlay-container dib-searchable-select dib-input').clear().type(profileDetails.country);
    cy.get('.cdk-overlay-container ui-autocomplete-wrapper dib-searchable-select')
      .contains(profileDetails.country)
      .click();
    cy.get('.cdk-overlay-container dib-input input[name="cellphone"]').clear().type(profileDetails.mobileNumber);
    cy.get('.cdk-overlay-container ui-button-wrapper ui-button ').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.homeAddress);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.city);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.zipCode);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.country);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.mobileNumber);
  });

  it('should edit localize (language & currency)', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('Localize')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').click();
      });
    cy.get('.cdk-overlay-container ui-language-wrapper language-picker').click();
    cy.get('.cdk-overlay-container language-picker .picker').contains(profileDetails.language).click();
    cy.get('.cdk-overlay-container ui-currency-wrapper currency-picker')
      .click()
      .contains(profileDetails.currency)
      .click();
    cy.get('.cdk-overlay-container ui-button-wrapper ui-button ').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Profile Successfully Updated');
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.language);
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.currency);
  });

  it('should change email address', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').contains('edit email').click();
      });
    cy.get('.cdk-overlay-container dib-change-email input[name="email"]').clear().type(profileDetails.email);
    cy.get('.cdk-overlay-container dib-change-email input[name="password"]').clear().type(profileDetails.password);
    cy.get('.cdk-overlay-container dib-change-email ui-button').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Email Successfully Updated');
    cy.get('dib-profile dib-account .profile-info .profile-info__rows').should('contain', profileDetails.email);
  });

  it('should change password', () => {
    cy.get('dib-profile dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').contains('edit password').click();
      });
    cy.get('.cdk-overlay-container change-password input[name="password"]').clear().type(profileDetails.password);
    cy.get('.cdk-overlay-container change-password input[name="newPassword"]').clear().type(profileDetails.password);
    cy.get('.cdk-overlay-container change-password input[name="confirmNewPassword"]')
      .clear()
      .type(profileDetails.password);
    cy.get('.cdk-overlay-container change-password ui-button').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Password Successfully Updated');
  });

  // This test runs only when Console is open
  it('should add travel document and delete it', () => {
    cy.get('dib-profile dib-account dib-travel-documents button').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-select-wrapper')
      .contains('Document type')
      .parents('dib-select')
      .within(() => {
        return cy.get('select').select(profileDetails.documentType);
      });
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-select-wrapper')
      .contains('Gender')
      .parents('dib-select')
      .within(() => {
        return cy.get('select').select(profileDetails.title);
      });
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="firstName"]').type(
      profileDetails.name
    );
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="lastName"]').type(
      profileDetails.lastName
    );
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="dateOfBirth"] select.day'
    ).select(profileDetails.birthDay);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="dateOfBirth"] select.month'
    ).select(profileDetails.birthMonth);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="dateOfBirth"] select.year'
    ).select(profileDetails.birthYear);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[name="idNumber"]').type(
      profileDetails.documentNumber
    );
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[placeholder="Issuing country"]')
      .click()
      .type(profileDetails.issuingCountry);
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-travel-document-dialog dib-searchable-select')
      .contains(profileDetails.issuingCountry)
      .click();
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="expiryDate"] select.day'
    ).select(profileDetails.expiryDay);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="expiryDate"] select.month'
    ).select(profileDetails.expiryMonth);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="expiryDate"] select.year'
    ).select(profileDetails.expiryYear);
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[placeholder="Nationality"]').type(
      profileDetails.nationality
    );
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-searchable-select div')
      .contains(profileDetails.nationality)
      .click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-checkbox-wrapper').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button').click();
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', profileDetails.issuingCountry);
    cy.get('dib-profile dib-account .travel-documents')
      .contains(profileDetails.issuingCountry)
      .next()
      .contains('Edit')
      .click({ force: true });
    cy.get('.cdk-overlay-container dib-travel-document-dialog dib-input input[placeholder="Issuing country"]')
      .clear()
      .type(profileDetails.newIssuingCounty);
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-travel-document-dialog dib-searchable-select')
      .contains(profileDetails.newIssuingCounty)
      .click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-checkbox-wrapper').click();
    cy.get('.cdk-overlay-container dib-travel-document-dialog ui-button').click();
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', profileDetails.newIssuingCounty);
    cy.get('dib-profile dib-account .travel-documents')
      .contains(profileDetails.newIssuingCounty)
      .next()
      .contains('delete')
      .clickAttached();
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning').click();
  });

  it('should add loyalty program and delete it', () => {
    cy.get('dib-profile dib-account div.profile-info__section.loyalty-program button').click();
    cy.get('.cdk-overlay-container dib-add-loyalty button').click();
    cy.get('.cdk-overlay-container dib-add-loyalty dib-loyalty-auto-complete')
      .type(profileDetails.loyaltyProgram)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-loyalty input[name="program"]').type(
      profileDetails.loyaltyNumber
    );
    cy.get('.cdk-overlay-container dib-dialog-wrapper dib-add-loyalty button').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program saved');
    cy.get('dib-profile dib-account .loyalty-program__grid').should('contain', profileDetails.loyaltyProgram);
    cy.get('dib-profile dib-account .loyalty-program__grid').should('contain', profileDetails.loyaltyNumber);
    cy.get('dib-profile dib-account .loyalty-name')
      .contains(profileDetails.loyaltyProgram)
      .parent()
      .parent()
      .within(() => {
        return cy.get('.grid-button').click();
      });
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning').click();
    cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Loyalty program successfully deleted');
  });
});
