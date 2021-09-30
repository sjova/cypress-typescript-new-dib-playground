import { TravelPolicy } from '../../../../models';
import {
  cancelDeleteDialogAndConfirm,
  closeEditDialogAndConfirm,
  deleteTravelPolicyAndConfirm,
  editTravelPolicy,
  enterSharedDetails,
  searchAndSelectEmployee,
} from './shared';

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
    cy.get('.cdk-overlay-container .cdk-overlay-pane .flight-search__result')
      .contains(travelPolicyDetails.flight.from)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[data-placeholder=To]').type(
      travelPolicyDetails.flight.to
    );
    cy.get('.cdk-overlay-container .cdk-overlay-pane .flight-search__result')
      .contains(travelPolicyDetails.flight.to)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item select').select(
      travelPolicyDetails.flight.ticketType
    );
    cy.get(
      '.cdk-overlay-container dib-travel-policy-dialog .item dib-list-item input[placeholder="Budget per flight"]'
    ).type(travelPolicyDetails.flight.budgetPerFlight);
    searchAndSelectEmployee(travelPolicyDetails.employee);

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Travel policy for flights successfully created.'
    );
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.name
    );
  });

  it('should close edit form for flight travel policy', () => {
    closeEditDialogAndConfirm(travelPolicyDetails);
  });

  it('should update flight travel policy', () => {
    editTravelPolicy(travelPolicyDetails);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-checkbox').click({ multiple: true });
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-checkbox label .container-text')
      .contains('Economy')
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=budgetException]')
      .clear()
      .type(travelPolicyDetails.modifiedFlight.budgetException);
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=flightDurationBudgetException]')
      .clear()
      .type(travelPolicyDetails.modifiedFlight.durationBudgetException);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[data-placeholder=From]')
      .clear()
      .type(travelPolicyDetails.modifiedFlight.from);
    cy.get('.cdk-overlay-container .cdk-overlay-pane .flight-search__result')
      .contains(travelPolicyDetails.modifiedFlight.from)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog input[data-placeholder=To]')
      .clear()
      .type(travelPolicyDetails.modifiedFlight.to);
    cy.get('.cdk-overlay-container .cdk-overlay-pane .flight-search__result')
      .contains(travelPolicyDetails.modifiedFlight.to)
      .click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-list-item select').select(
      travelPolicyDetails.modifiedFlight.ticketType
    );
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .item dib-list-item input[placeholder="Budget per flight"]')
      .clear()
      .type(travelPolicyDetails.modifiedFlight.budgetPerFlight);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Travel policy for flights successfully updated.'
    );
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.modifiedName
    );
  });

  it('should expand flight travel policy and display all details', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .button').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__item')
      .should(
        'contain',
        'Flights should be booked more than ' +
          `${travelPolicyDetails.sharedDetails.modifiedNumberOfDaysInAdvance}` +
          ' days before departure date'
      )
      .should('contain', travelPolicyDetails.sharedDetails.modifiedBudget)
      .should('contain', travelPolicyDetails.modifiedFlight.from)
      .should('contain', travelPolicyDetails.modifiedFlight.to)
      .should('contain', travelPolicyDetails.modifiedFlight.budgetPerFlight)
      .should('contain', 'Economy')
      .should(
        'contain',
        'A maximum of EUR ' +
          `${travelPolicyDetails.modifiedFlight.budgetException}` +
          ' is allowed for flights longer than ' +
          `${travelPolicyDetails.modifiedFlight.durationBudgetException}` +
          ' hours'
      )
      .should('contain', `${travelPolicyDetails.employee.firstName} ${travelPolicyDetails.employee.lastName}`);
  });

  it('should check cancellation of confirmation dialog', () => {
    cancelDeleteDialogAndConfirm(travelPolicyDetails);
  });

  it('should delete flight travel policy', () => {
    cy.waitForAngular();

    deleteTravelPolicyAndConfirm(travelPolicyDetails.sharedDetails.modifiedName);
  });
});
