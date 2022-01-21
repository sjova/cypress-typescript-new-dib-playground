import { DibTravelAccounts, TravelSettings } from '@cy/models';
import {
  cancelDeleteDialogAndConfirm,
  closeEditDialogAndConfirm,
  deleteTravelPolicyAndConfirm,
  editTravelPolicy,
  enterSharedDetails,
  searchAndSelectEmployee,
} from './shared';

describe('Company Settings - Travel Settings - Travel Policy - Taxi', () => {
  let accounts: DibTravelAccounts;

  let travelPolicyDetails: TravelSettings;

  before(() => {
    cy.fixture('dib-travel-accounts').then((accountsFixture) => {
      accounts = accountsFixture;
    });

    cy.fixture('company-settings/travel-settings-details').then((travelPolicyDetailsFixture) => {
      travelPolicyDetails = travelPolicyDetailsFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visitAngularUrl('/company-management/travel-settings');
  });

  it('should add taxi travel policy', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();

    enterSharedDetails(travelPolicyDetails.taxi.type, travelPolicyDetails.sharedDetails);

    searchAndSelectEmployee(accounts.defaultAccount);

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'have.text',
      'Travel policy for taxi successfully created.'
    );
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.name
    );
  });

  it('should close edit form for taxi travel policy', () => {
    closeEditDialogAndConfirm(travelPolicyDetails);
  });

  it('should update taxi travel policy', () => {
    editTravelPolicy(travelPolicyDetails);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'have.text',
      'Travel policy for taxi successfully updated.'
    );
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.modifiedName
    );
  });

  it('should expand taxi travel policy and display all details', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .button').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__item')
      .should('contain', 'All destinations')
      .should('contain', travelPolicyDetails.sharedDetails.modifiedBudget)
      .should('contain', `${accounts.defaultAccount.firstName} ${accounts.defaultAccount.lastName}`);
  });

  it('should check cancellation of confirmation dialog', () => {
    cancelDeleteDialogAndConfirm(travelPolicyDetails);
  });

  it('should delete taxi travel policy', () => {
    deleteTravelPolicyAndConfirm(travelPolicyDetails.sharedDetails.modifiedName);
  });
});
