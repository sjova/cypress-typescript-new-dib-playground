import { TravelPolicy } from '@cy/models';
import {
  addHotelTravelPolicy,
  cancelDeleteDialogAndConfirm,
  closeEditDialogAndConfirm,
  deleteTravelPolicyAndConfirm,
  editTravelPolicy,
} from './shared';

describe('Company Settings - Travel Settings - Travel Policy - Hotel', () => {
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

  it('should add hotel travel policy', () => {
    addHotelTravelPolicy(travelPolicyDetails);

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Travel policy for hotel successfully created.'
    );
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.name
    );
  });

  it('should close edit form for hotel travel policy', () => {
    closeEditDialogAndConfirm(travelPolicyDetails);
  });

  it('should update hotel travel policy', () => {
    editTravelPolicy(travelPolicyDetails);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog star-rating').next().click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .google-places-autocomplete-input')
      .clear()
      .type(travelPolicyDetails.hotel.modifiedCity);
    cy.get('.pac-container .pac-item').contains(travelPolicyDetails.hotel.modifiedCity).click();
    cy.get('.cdk-overlay-container dib-travel-policy-dialog .item dib-list-item input[placeholder="Budget per night"]')
      .clear()
      .type(travelPolicyDetails.hotel.modifiedBudgetPerNight);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Travel policy for hotel successfully updated.'
    );
    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.modifiedName
    );
  });

  it('should expand hotel travel policy and display all details', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .button').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__item')
      .should(
        'contain',
        'Hotels should be booked more than ' +
          `${travelPolicyDetails.sharedDetails.modifiedNumberOfDaysInAdvance}` +
          ' days in advance of check-in date'
      )
      .should('contain', travelPolicyDetails.sharedDetails.modifiedBudget)
      .should('contain', travelPolicyDetails.hotel.modifiedBudgetPerNight)
      .should('contain', `${travelPolicyDetails.employee.firstName} ${travelPolicyDetails.employee.lastName}`);
    cy.get('dib-company-management dib-expandable-item dib-star-rating i').should('have.length', 5);
  });

  it('should check cancellation of confirmation dialog', () => {
    cancelDeleteDialogAndConfirm(travelPolicyDetails);
  });

  it('should delete hotel travel policy', () => {
    cy.waitForAngular();

    deleteTravelPolicyAndConfirm(travelPolicyDetails.sharedDetails.modifiedName);
  });
});
