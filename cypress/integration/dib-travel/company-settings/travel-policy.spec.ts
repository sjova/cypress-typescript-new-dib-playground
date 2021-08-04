import { TravelPolicy } from '../../../models';

// TODO: Blocked by issue DT-8412
describe('Company Settings - Travel Policy', () => {
  let travelPolicyForm: TravelPolicy;

  const deleteTravelPolicyItem = () => {
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title')
      .contains(travelPolicyForm.travelPolicyName)
      .parents('dib-expandable-item')
      .within(() => {
        return cy.get('ui-button').contains('delete').clickAttached();
      });

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();
  };

  before(() => {
    cy.fixture('company-settings/travel-policy-form').then((travelPolicyFixture) => {
      travelPolicyForm = travelPolicyFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/travel-policy');
  });

  it('should display travel policy in sidebar menu', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Travel Policy ').should('exist');
  });

  it('should submit empty travel policy form', () => {
    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-travel-policy-dialog').should('be.visible');
  });

  it('should create flight travel policy', () => {
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
    cy.get('.cdk-overlay-container dib-travel-policy-dialog label .user')
      .contains(travelPolicyForm.employeeName)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyForm.travelPolicyName
    );
  });

  it('should delete flight travel policy', () => {
    deleteTravelPolicyItem();

    cy.get('dib-company-management dib-travel-policy .sections dib-expandable-item').should('not.exist');
  });

  it('should create hotel travel policy', () => {
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
    cy.get('.cdk-overlay-container dib-travel-policy-dialog label .user')
      .contains(travelPolicyForm.employeeName)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyForm.travelPolicyName
    );
  });

  it('should delete hotel travel policy', () => {
    deleteTravelPolicyItem();

    cy.get('dib-company-management dib-travel-policy .sections dib-expandable-item').should('not.exist');
  });

  it('should create train travel policy', () => {
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
    cy.get('.cdk-overlay-container dib-travel-policy-dialog label .user')
      .contains(travelPolicyForm.employeeName)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyForm.travelPolicyName
    );
  });

  it('should extend form of travel policy and display details', () => {
    cy.intercept('GET', '/api/secure/v1/travel-policy').as('getTravelPolicy');

    cy.wait('@getTravelPolicy').then(() => {
      cy.get('dib-company-management dib-travel-policy dib-expandable-item .button').click();

      cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__item').should(
        'contain',
        travelPolicyForm.employeeName
      );
    });
  });

  it('should update train travel policy', () => {
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title')
      .contains(travelPolicyForm.travelPolicyName)
      .parents('dib-expandable-item')
      .within(() => {
        return cy.get('ui-button').contains('edit').clickAttached();
      });

    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Name]')
      .clear()
      .type(travelPolicyForm.travelPolicyModifiedName);
    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyForm.travelPolicyModifiedName
    );
  });

  it('should check cancellation of confirmation dialog', () => {
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title')
      .contains(travelPolicyForm.travelPolicyModifiedName)
      .parents('dib-expandable-item')
      .within(() => {
        return cy.get('ui-button').contains('delete').clickAttached();
      });

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyForm.travelPolicyModifiedName
    );
  });

  it('should delete train travel policy', () => {
    deleteTravelPolicyItem();

    cy.get('dib-company-management dib-travel-policy .sections dib-expandable-item').should('not.exist');
  });
});
