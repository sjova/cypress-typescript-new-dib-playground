import { Profile } from '../../../../models';

describe('Personal settings - Profile page', () => {
  let profileDetails: Profile;

  before(() => {
    cy.fixture('profile/profile').then((profile) => {
      profileDetails = profile;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('[routerlink="/profile/account"]').click();
  });

  it('should edit personal info', () => {
    cy.get('dib-account .profile-info .profile-info__title')
      .contains('Personal info')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').click();
      });
    cy.get('dib-input input[name="firstName"]').clear().type(profileDetails.name);
    cy.get('dib-input input[name="lastName"]').clear().type(profileDetails.lastName);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.day').select(profileDetails.birthDay);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.month').select(profileDetails.birthMonth);
    cy.get('.cdk-overlay-container ui-form-dialog dib-select-dob select.year').select(profileDetails.birthYear);
    cy.get('ui-button-wrapper ui-button ').click();
    cy.get('.cdk-overlay-container').should('contain', 'Profile Successfully Updated');
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.name);
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.lastName);
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.birthDay);
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.birthMonth);
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.birthYear);
  });

  it('should edit contact info', () => {
    cy.get('dib-account .profile-info .profile-info__title')
      .contains('Contact info')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').click();
      });
    cy.get('dib-input input[name="address1"]').clear().type(profileDetails.homeAddress);
    cy.get('dib-input input[name="city"]').clear().type(profileDetails.city);
    cy.get('dib-input input[name="zipCode"]').clear().type(profileDetails.zipCode);
    cy.get('dib-searchable-select dib-input').clear().type(profileDetails.country);
    cy.get('ui-autocomplete-wrapper dib-searchable-select').contains(profileDetails.country).click();
    cy.get('dib-input input[name="cellphone"]').clear().type(profileDetails.mobileNumber);
    cy.get('ui-button-wrapper ui-button ').click();
    cy.get('.cdk-overlay-container').should('contain', 'Profile Successfully Updated');
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.homeAddress);
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.city);
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.zipCode);
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.country);
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.mobileNumber);
  });

  it('should edit localize (language & currency)', () => {
    cy.get('dib-account .profile-info .profile-info__title')
      .contains('Localize')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').click();
      });
    cy.get('ui-language-wrapper language-picker').click();
    cy.get('div.picker.ng-star-inserted').contains(profileDetails.language).click();
    cy.get('ui-currency-wrapper currency-picker').click().contains(profileDetails.currency).click();
    cy.get('ui-button-wrapper ui-button ').click();
    cy.get('.cdk-overlay-container').should('contain', 'Profile Successfully Updated');
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.language);
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.currency);
  });

  it('should change email address', () => {
    cy.get('dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').contains('edit email').click();
      });
    cy.get('dib-change-email input[name="email"]').clear().type(profileDetails.email);
    cy.get('dib-change-email input[name="password"]').clear().type(profileDetails.password);
    cy.get('dib-change-email ui-button').click();
    cy.get('.cdk-overlay-container').should('contain', 'Email Successfully Updated');
    cy.get('dib-account .profile-info .profile-info__rows').should('contain', profileDetails.email);
  });

  it('should change password', () => {
    cy.get('dib-account .profile-info .profile-info__title')
      .contains('email & password')
      .parent('.profile-info__section')
      .within(() => {
        return cy.get('ui-button button').contains('edit password').click();
      });
    cy.get('change-password input[name="password"]').clear().type(profileDetails.password);
    cy.get('change-password input[name="newPassword"]').clear().type(profileDetails.password);
    cy.get('change-password input[name="confirmNewPassword"]').clear().type(profileDetails.password);
    cy.get('change-password ui-button').click();
    cy.get('.cdk-overlay-container').should('contain', 'Password Successfully Updated');
  });

  it('should add travel document and delete it', () => {
    cy.get('dib-account  dib-travel-documents button').click();
    cy.get('dib-travel-document-dialog dib-select-wrapper:nth-child(2) select').select(profileDetails.documentType);
    cy.get('dib-travel-document-dialog dib-select-wrapper:nth-child(4) select').select(profileDetails.title);
    cy.get('dib-travel-document-dialog dib-input input[name="firstName"]').type(profileDetails.name);
    cy.get('dib-travel-document-dialog dib-input input[name="lastName"]').type(profileDetails.lastName);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="dateOfBirth"] select.day'
    ).select(profileDetails.birthDay);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="dateOfBirth"] select.month'
    ).select(profileDetails.birthMonth);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="dateOfBirth"] select.year'
    ).select(profileDetails.birthYear);
    cy.get('dib-travel-document-dialog dib-input input[name="idNumber"]').type(profileDetails.documentNumber);
    cy.get('dib-travel-document-dialog dib-input input[placeholder="Issuing country"]').type(
      profileDetails.issuingCountry
    );
    cy.get('dib-travel-document-dialog dib-searchable-select div').contains(profileDetails.issuingCountry).click();
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="expiryDate"] select.day'
    ).select(profileDetails.expiryDay);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="expiryDate"] select.month'
    ).select(profileDetails.expiryMonty);
    cy.get(
      '.cdk-overlay-container dib-travel-document-dialog dib-select-dob[ng-reflect-name="expiryDate"] select.year'
    ).select(profileDetails.expiryYear);
    cy.get('dib-travel-document-dialog dib-input input[placeholder="Nationality"]').type(profileDetails.nationality);
    cy.get('dib-travel-document-dialog dib-searchable-select div').contains(profileDetails.nationality).click();
    cy.get('dib-travel-document-dialog ui-checkbox-wrapper').click();
    cy.get('dib-travel-document-dialog ui-button').click();
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', 'PASSPORT');
    cy.get('dib-profile dib-account dib-travel-documents').should('contain', profileDetails.issuingCountry);
    cy.get('dib-account dib-travel-documents dib-simple-button.btn').click();
    cy.get('confirmation-dialog ui-button.button.ng-star-inserted').click();
  });

  it('should add loyalty program and delete it', () => {
    cy.get('dib-profile  dib-account  div.profile-info__section.loyalty-program button').click();
    cy.get('dib-add-loyalty button').click();
    cy.get('dib-add-loyalty dib-loyalty-auto-complete')
      .type(profileDetails.loyaltyProgram)
      .type('{downarrow}')
      .type('{enter}');
    cy.get('dib-dialog-wrapper dib-add-loyalty input[name="program"]').type(profileDetails.loyaltyNumber);
    cy.get('dib-dialog-wrapper  dib-add-loyalty button').click();
    cy.get('.cdk-overlay-container').should('contain', 'Loyalty program saved');
    cy.get('dib-profile dib-account .loyalty-program__grid').should('contain', profileDetails.loyaltyProgram);
    cy.get('dib-profile dib-account .loyalty-program__grid').should('contain', profileDetails.loyaltyNumber);
    cy.get('dib-account  div.grid-button button').click();
    cy.get('confirmation-dialog ui-button.button.ng-star-inserted').click();
    cy.get('.cdk-overlay-container').should('contain', 'Loyalty program successfully deleted');
  });
});
