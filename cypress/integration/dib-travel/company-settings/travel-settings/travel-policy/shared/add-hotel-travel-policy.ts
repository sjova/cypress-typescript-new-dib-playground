import { TravelSettings } from '@cy/models';
import { enterSharedDetails } from './enter-shared-details';
import { searchAndSelectEmployee } from './search-and-select-employee';

export const addHotelTravelPolicy = (travelPolicyDetails: TravelSettings): void => {
  cy.waitForAngular();

  cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();

  enterSharedDetails(travelPolicyDetails.hotel.type, travelPolicyDetails.sharedDetails);

  cy.get('.cdk-overlay-container dib-travel-policy-dialog star-rating').click();
  cy.get('.cdk-overlay-container dib-travel-policy-dialog .add-btn').click();

  cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=City]').type(
    travelPolicyDetails.hotel.city
  );
  cy.get('.pac-container .pac-item').contains(travelPolicyDetails.hotel.city).click();
  cy.get(
    '.cdk-overlay-container dib-travel-policy-dialog .item dib-list-item input[placeholder="Budget per night"]'
  ).type(travelPolicyDetails.hotel.budgetPerNight);

  searchAndSelectEmployee(travelPolicyDetails.employee);
};
