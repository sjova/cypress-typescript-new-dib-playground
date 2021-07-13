import { TravelPolicy } from '../../../models';

describe('Company Settings - Travel Policy', () => {
  let travelPolicyForm: TravelPolicy;

  before(() => {
    cy.fixture('company-settings/travel-policy').then((travelPolicyFormDetails) => {
      travelPolicyForm = travelPolicyFormDetails;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.clearCookies();
    cy.visit('/company-management/travel-policy');
  });

  it('should display company settings/travel policy in navbar menu', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Travel Policy ');
  });

  it('submits empty travel policy form', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog').should('be.visible');
  });

  it('creates a new flight travel policy', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .dib-select').select(
      travelPolicyForm.travelPolicyTypeFlight
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=name]').type(travelPolicyForm.travelPolicyName);
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=numberOfDaysInAdvance]').type(
      travelPolicyForm.numberOfDaysInAdvance
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-checkbox').click({ multiple: true });
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=budget]').type(
      travelPolicyForm.travelPolicyBudget
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=budgetException]').type(
      travelPolicyForm.travelPolicyBudgetException
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=flightDurationBudgetException]').type(
      travelPolicyForm.flightDurationBudgetException
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .add-btn').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[data-placeholder=From]').type(
      travelPolicyForm.flightFrom
    );
    cy.get('.cdk-overlay-container .cdk-overlay-pane .flight-search__result__text')
      .contains(travelPolicyForm.flightFrom)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[data-placeholder=To]').type(
      travelPolicyForm.flightTo
    );
    cy.get('.cdk-overlay-container .cdk-overlay-pane .flight-search__result__text')
      .contains(travelPolicyForm.flightTo)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item select').select(travelPolicyForm.typeOfTrip);
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item input[name=budget]').type(
      travelPolicyForm.travelPolicyBudget
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Search]').type(
      travelPolicyForm.employeeName
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .members').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyForm.travelPolicyName
    );
  });

  it('creates a new hotel travel policy', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .dib-select').select(
      travelPolicyForm.travelPolicyTypeHotel
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=name]').type(travelPolicyForm.travelPolicyName);
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=numberOfDaysInAdvance]').type(
      travelPolicyForm.numberOfDaysInAdvance
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog star-rating').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=budget]').type(
      travelPolicyForm.travelPolicyBudget
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .add-btn').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=City]').type(travelPolicyForm.city);
    cy.get('.light-background .pac-container').contains(travelPolicyForm.city).click();
    cy.get('.cdk-overlay-container dib-list-item input[name=budget]').type(travelPolicyForm.travelPolicyBudget);
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Search]').type(
      travelPolicyForm.employeeName
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .members').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyForm.travelPolicyName
    );
  });

  it('creates a new train travel policy', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .dib-select').select(
      travelPolicyForm.travelPolicyTypeTrain
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=name]').type(travelPolicyForm.travelPolicyName);
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=numberOfDaysInAdvance]').type(
      travelPolicyForm.numberOfDaysInAdvance
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-checkbox').click({ multiple: true });
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=budget]').type(
      travelPolicyForm.travelPolicyBudget
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .add-btn').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item input[placeholder=from]').type(
      travelPolicyForm.trainFrom
    );
    cy.get('.cdk-overlay-container .cdk-overlay-pane').contains(travelPolicyForm.trainFrom).click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item input[placeholder=to]').type(
      travelPolicyForm.trainTo
    );
    cy.get('.cdk-overlay-container .cdk-overlay-pane').contains(travelPolicyForm.trainTo).click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item input[placeholder="Budget per train"]').type(
      travelPolicyForm.travelPolicyBudget
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Search]').type(
      travelPolicyForm.employeeName
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .members').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyForm.travelPolicyName
    );
  });

  it('should extend form of travel policy tests and display details', () => {
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .collapsed .button').first().dblclick();
  });

  it('updates travel policy test', () => {
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title')
      .contains(travelPolicyForm.travelPolicyName)
      .first()
      .parents('dib-expandable-item')
      .within(() => {
        return cy.get('ui-button').contains('edit').click();
      });
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Name')
      .clear()
      .type(travelPolicyForm.travelPolicyNameUpdate);
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success').click();
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyForm.travelPolicyNameUpdate
    );
  });

  it('deletes travel policy test', () => {
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title')
      .contains(travelPolicyForm.travelPolicyNameUpdate)
      .parents('dib-expandable-item')
      .within(() => {
        return cy.get('ui-button').contains('delete').click();
      });
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning').click();
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'not.contain',
      travelPolicyForm.travelPolicyNameUpdate
    );
  });
});
