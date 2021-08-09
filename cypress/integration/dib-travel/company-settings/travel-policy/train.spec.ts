import { TravelPolicy } from '../../../../models';
import {
  searchAndSelectEmployee,
  enterSharedDetails,
  deleteTravelPolicyAndConfirm,
  clickSingleTravelPolicyCtaButton,
} from './shared';

describe('Company Settings - Travel Policy - Train', () => {
  let travelPolicyDetails: TravelPolicy;

  before(() => {
    cy.fixture('company-settings/travel-policy-details').then((travelPolicyDetailsFixture) => {
      travelPolicyDetails = travelPolicyDetailsFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/travel-policy');
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
    // TODO: Should be used different property `.budgetPerTrain` (smaller then `.budget`)
    cy.get(
      '.cdk-overlay-container dib-travel-policy-dialog .item dib-list-item input[placeholder="Budget per train"]'
    ).type(travelPolicyDetails.sharedDetails.budget);
    searchAndSelectEmployee(travelPolicyDetails.employee.email);

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.name
    );
  });

  // TODO: Should be extended to confirm added data (also this test should be added for flight and hotel)
  it('should expand train travel policy and display all details', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .button').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__item .policyEmployee').should(
      'contain',
      `${travelPolicyDetails.employee.firstName} ${travelPolicyDetails.employee.lastName}`
    );
  });

  it('should update train travel policy', () => {
    clickSingleTravelPolicyCtaButton(travelPolicyDetails.sharedDetails.name, 'edit');

    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Name]')
      .clear()
      .type(travelPolicyDetails.sharedDetails.modifiedName);
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.modifiedName
    );
  });

  // TODO: This should be added for other types and inner test should be shared fn
  it('should check cancellation of confirmation dialog', () => {
    clickSingleTravelPolicyCtaButton(travelPolicyDetails.sharedDetails.modifiedName, 'delete');

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.modifiedName
    );
  });

  it('should delete train travel policy', () => {
    deleteTravelPolicyAndConfirm(travelPolicyDetails.sharedDetails.modifiedName);
  });
});
