import { TravelPolicy } from '../../../models';

describe('Travel Policy Suite', () => {
  let tpd: TravelPolicy;

  before(() => {
    cy.fixture('company-settings/travel-policy').then((travelPolicyFormData) => {
      tpd = travelPolicyFormData;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.get('dib-layout dib-hamburger-icon').click();
    cy.get('[href="/company-management/travel-policy"]').click();
  });

  it('submits empty travel policy form', () => {
    cy.get('dib-travel-policy ui-button[type=primary]').click();
    cy.get('dib-travel-policy-dialog ui-button button').click({ force: true });
    cy.get('dib-dialog-wrapper dib-travel-policy-dialog').should('be.visible');
  });

  it('creates a new flight travel policy', () => {
    cy.get('dib-travel-policy ui-button[type=primary]').click();
    cy.get('dib-travel-policy-dialog .dib-select').select(tpd.travelPolicyTypeFlight);
    cy.get('dib-travel-policy-dialog dib-input input[name=name]').type(tpd.travelPolicyName);
    cy.get('dib-travel-policy-dialog dib-input input[name=numberOfDaysInAdvance]').type(tpd.numberOfDaysInAdvance);
    cy.get('dib-travel-policy-dialog dib-checkbox').click({ multiple: true });
    cy.get('dib-travel-policy-dialog dib-input input[name=budget]').type(tpd.travelPolicyBudget);
    cy.get('dib-travel-policy-dialog dib-input input[name=budgetException]').type(tpd.travelPolicyBudgetExeption);
    cy.get('dib-travel-policy-dialog dib-input input[name=flightDurationBudgetException]').type(
      tpd.flightDurationBudgetException
    );
    cy.get('dib-travel-policy-dialog form .add-btn').click({ force: true });
    cy.get('dib-list-item dib-flight-search-input input[data-placeholder=From]').type(tpd.flightFrom);
    cy.get('.cdk-overlay-connected-position-bounding-box .mat-option-text').contains(tpd.flightFrom).click();
    cy.get('dib-list-item dib-flight-search-input input[data-placeholder=To]').type(tpd.flightTo);
    cy.get('.cdk-overlay-connected-position-bounding-box .mat-option-text').contains(tpd.flightTo).click();
    cy.get('dib-travel-policy-dialog dib-list-item select').select(tpd.typeOfTrip);
    cy.get('dib-list-item dib-input input[name=budget]').type(tpd.travelPolicyBudget);
    cy.get('dib-travel-policy-dialog dib-input input[placeholder=Search]').type(tpd.employeeName);
    cy.get('dib-travel-policy-dialog mat-checkbox').click();
    cy.get('dib-travel-policy-dialog ui-button button').click({ force: true });
    cy.get('dib-travel-policy dib-expandable-item .section__header__title').should('contain', tpd.travelPolicyName);
  });

  it('creates a new hotel travel policy', () => {
    cy.get('dib-travel-policy ui-button[type=primary]').click();
    cy.get('dib-travel-policy-dialog .dib-select').select(tpd.travelPolicyTypeHotel);
    cy.get('dib-travel-policy-dialog dib-input input[name=name]').type(tpd.travelPolicyName);
    cy.get('dib-travel-policy-dialog dib-input input[name=numberOfDaysInAdvance]').type(tpd.numberOfDaysInAdvance);
    cy.get('dib-travel-policy-dialog star-rating').click();
    cy.get('dib-travel-policy-dialog dib-input input[name=budget]').type(tpd.travelPolicyBudget);
    cy.get('dib-travel-policy-dialog form .add-btn').click({ force: true });
    cy.get('dib-travel-policy-dialog dib-location-search input[placeholder=City]').type(tpd.city);
    cy.get('.light-background .pac-container').contains(tpd.city).click();
    cy.get('dib-list-item dib-input input[name=budget]').type(tpd.travelPolicyBudget);
    cy.get('dib-travel-policy-dialog dib-input input[placeholder=Search]').type(tpd.employeeName);
    cy.get('dib-travel-policy-dialog mat-checkbox').click();
    cy.get('dib-travel-policy-dialog ui-button button').click({ force: true });
    cy.get('dib-travel-policy dib-expandable-item .section__header__title').should('contain', tpd.travelPolicyName);
  });

  it('creates a new train travel policy', () => {
    cy.get('dib-travel-policy ui-button[type=primary]').click();
    cy.get('dib-travel-policy-dialog .dib-select').select(tpd.travelPolicyTypeTrain);
    cy.get('dib-travel-policy-dialog dib-input input[name=name]').type(tpd.travelPolicyName);
    cy.get('dib-travel-policy-dialog dib-input input[name=numberOfDaysInAdvance]').type(tpd.numberOfDaysInAdvance);
    cy.get('dib-travel-policy-dialog dib-checkbox').click({ multiple: true });
    cy.get('dib-travel-policy-dialog dib-input input[name=budget]').type(tpd.travelPolicyBudget);
    cy.get('dib-travel-policy-dialog form .add-btn').click({ force: true });
    cy.get('dib-travel-policy-dialog dib-list-item input[placeholder=from]').type(tpd.trainFrom);
    cy.get('.cdk-overlay-connected-position-bounding-box .cdk-overlay-pane').contains(tpd.trainFrom).click();
    cy.get('dib-travel-policy-dialog dib-list-item input[placeholder=to]').type(tpd.trainTo);
    cy.get('.cdk-overlay-connected-position-bounding-box .cdk-overlay-pane').contains(tpd.trainTo).click();
    cy.get('dib-travel-policy-dialog dib-list-item input[placeholder="Budget per train"]').type(tpd.travelPolicyBudget);
    cy.get('dib-travel-policy-dialog dib-input input[placeholder=Search]').type(tpd.employeeName);
    cy.get('dib-travel-policy-dialog mat-checkbox').click();
    cy.get('dib-travel-policy-dialog ui-button button').click({ force: true });
    cy.get('dib-travel-policy dib-expandable-item .section__header__title').should('contain', tpd.travelPolicyName);
  });

  it('should extend form of travel policy tests and display details', () => {
    cy.get('dib-expandable-item .collapsed .material-icons').eq(0).dblclick({ force: true });
  });

  it('updates travel policy test', () => {
    cy.get('dib-expandable-item ui-button[type=primary] button').eq(0).click();
    cy.get('dib-travel-policy-dialog dib-input input[name=name]').clear();
    cy.get('dib-travel-policy-dialog dib-input input[name=name]').type(tpd.travelPolicyNameUpdate);
    cy.get('dib-travel-policy-dialog ui-button[type=success]').click();
    cy.get('dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      tpd.travelPolicyNameUpdate
    );
  });

  it('deletes travel policy test', () => {
    cy.get('dib-expandable-item ui-button[type=warning] button').eq(0).click({ force: true });
    cy.get('mat-dialog-container confirmation-dialog ui-button[cancel=true]').click();
    cy.get('dib-expandable-item ui-button[type=warning] button').eq(0).click({ force: true });
    cy.get('mat-dialog-container confirmation-dialog ui-button[type=warning] button').click({ force: true });
    cy.get('dib-travel-policy dib-expandable-item .section__header__title').should(
      'not.contain',
      tpd.travelPolicyNameUpdate
    );
  });
});
