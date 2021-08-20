import { TravelPolicy } from '../../../../models';
import { deleteTravelPolicyAndConfirm, enterSharedDetails, searchAndSelectEmployee } from './shared';

describe('Company Settings - Travel Policy - Flight', () => {
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

  it('should add flight travel policy', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();

    enterSharedDetails(travelPolicyDetails.flight.type, travelPolicyDetails.sharedDetails);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-checkbox').click({ multiple: true });
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=budgetException]').type(
      travelPolicyDetails.flight.budgetException
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=flightDurationBudgetException]').type(
      travelPolicyDetails.flight.durationBudgetException
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .add-btn').click();

    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[data-placeholder=From]').type(
      travelPolicyDetails.flight.from
    );
    cy.get('.cdk-overlay-container .cdk-overlay-pane .flight-search__result__text')
      .contains(travelPolicyDetails.flight.from)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[data-placeholder=To]').type(
      travelPolicyDetails.flight.to
    );
    cy.get('.cdk-overlay-container .cdk-overlay-pane .flight-search__result__text')
      .contains(travelPolicyDetails.flight.to)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item select').select(
      travelPolicyDetails.flight.ticketType
    );
    // TODO: Should be used different property `.budgetPerFlight` (smaller then `.budget`)
    cy.get(
      '.cdk-overlay-container dib-travel-policy-dialog .item dib-list-item input[placeholder="Budget per flight"]'
    ).type(travelPolicyDetails.sharedDetails.budget);
    searchAndSelectEmployee(travelPolicyDetails.employee.email);

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.name
    );
  });

  // TODO: This should be covered
  // it('should update flight travel policy', () => {});

  it('should delete flight travel policy', () => {
    cy.waitForAngular();

    deleteTravelPolicyAndConfirm(travelPolicyDetails.sharedDetails.name);
  });
});
