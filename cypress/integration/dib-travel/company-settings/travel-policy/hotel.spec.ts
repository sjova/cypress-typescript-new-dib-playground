import { TravelPolicy } from '../../../../models';
import { enterSharedDetails, searchAndSelectEmployee, deleteTravelPolicyAndConfirm } from './shared';

describe('Company Settings - Travel Policy - Hotel', () => {
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

  it('should add hotel travel policy', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();

    enterSharedDetails(travelPolicyDetails.hotel.type, travelPolicyDetails.sharedDetails);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog star-rating').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .add-btn').click();

    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=City]').type(
      travelPolicyDetails.hotel.city
    );
    cy.get('.pac-container .pac-item').contains(travelPolicyDetails.hotel.city).click();
    // TODO: Should be used different property `.budgetPerNight` (smaller then `.budget`)
    cy.get(
      '.cdk-overlay-container dib-travel-policy-dialog .item dib-list-item input[placeholder="Budget per night"]'
    ).type(travelPolicyDetails.sharedDetails.budget);
    searchAndSelectEmployee(travelPolicyDetails.employee.email);

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.name
    );
  });

  // TODO: This should be covered
  // it('should update hotel travel policy', () => {});

  it('should delete hotel travel policy', () => {
    deleteTravelPolicyAndConfirm(travelPolicyDetails.sharedDetails.name);
  });
});
