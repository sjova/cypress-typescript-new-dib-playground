import { TravelPolicy } from '@cy/models';
import {
  cancelDeleteDialogAndConfirm,
  closeEditDialogAndConfirm,
  deleteTravelPolicyAndConfirm,
  editTravelPolicy,
  enterSharedDetails,
  searchAndSelectEmployee,
} from './shared';

describe('Company Settings - Travel Settings - Travel Policy - Train', () => {
  let travelPolicyDetails: TravelPolicy;

  before(() => {
    cy.fixture('company-settings/travel-settings-details').then((travelPolicyDetailsFixture) => {
      travelPolicyDetails = travelPolicyDetailsFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/travel-settings');
  });

  it('should add train travel policy', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();

    enterSharedDetails(travelPolicyDetails.train.type, travelPolicyDetails.sharedDetails);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-checkbox').click({ multiple: true });
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .add-btn').click();

    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item input[placeholder=from]').type(
      travelPolicyDetails.train.from
    );
    cy.get('.cdk-overlay-container .cdk-overlay-pane .select .option .option__name')
      .contains(travelPolicyDetails.train.from)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item input[placeholder=to]').type(
      travelPolicyDetails.train.to
    );
    cy.get('.cdk-overlay-container .cdk-overlay-pane .select .option .option__name')
      .contains(travelPolicyDetails.train.to)
      .click();
    cy.get(
      '.cdk-overlay-container dib-travel-policy-dialog .item dib-list-item input[placeholder="Budget per train"]'
    ).type(travelPolicyDetails.train.budgetPerTrain);
    searchAndSelectEmployee(travelPolicyDetails.employee);

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Travel policy for trains successfully created.'
    );
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.name
    );
  });

  it('should close edit form for train travel policy', () => {
    closeEditDialogAndConfirm(travelPolicyDetails);
  });

  it('should update train travel policy', () => {
    editTravelPolicy(travelPolicyDetails);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog .container-text').contains('1st class ').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .item dib-list-item input[placeholder="Budget per train"]')
      .clear()
      .type(travelPolicyDetails.train.modifiedBudgetPerTrain);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Travel policy for trains successfully updated.'
    );
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.modifiedName
    );
  });

  it('should expand train travel policy and display all details', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .button').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__item')
      .should(
        'contain',
        'Trains should be booked more than ' +
          `${travelPolicyDetails.sharedDetails.modifiedNumberOfDaysInAdvance}` +
          ' days before departure date'
      )
      .should('contain', travelPolicyDetails.sharedDetails.modifiedBudget)
      .should('contain', travelPolicyDetails.train.from)
      .should('contain', travelPolicyDetails.train.to)
      .should('contain', travelPolicyDetails.train.modifiedBudgetPerTrain)
      .should('contain', '1st Class' || '2nd Class')
      .should('contain', `${travelPolicyDetails.employee.firstName} ${travelPolicyDetails.employee.lastName}`);
  });

  it('should check cancellation of confirmation dialog', () => {
    cancelDeleteDialogAndConfirm(travelPolicyDetails);
  });

  it('should delete train travel policy', () => {
    cy.waitForAngular();

    deleteTravelPolicyAndConfirm(travelPolicyDetails.sharedDetails.modifiedName);
  });
});