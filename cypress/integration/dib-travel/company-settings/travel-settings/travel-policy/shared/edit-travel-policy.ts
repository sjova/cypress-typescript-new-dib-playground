import { TravelPolicy } from '@cy/models';
import { clickTravelPolicyCtaButton } from './click-travel-policy-cta-button';

export const editTravelPolicy = (travelPolicyDetails: TravelPolicy): void => {
  clickTravelPolicyCtaButton(travelPolicyDetails.sharedDetails.name, 'Edit');

  cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=name]')
    .clear()
    .type(travelPolicyDetails.sharedDetails.modifiedName);
  cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=numberOfDaysInAdvance]')
    .clear()
    .type(travelPolicyDetails.sharedDetails.modifiedNumberOfDaysInAdvance);
  cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Budget]')
    .clear()
    .type(travelPolicyDetails.sharedDetails.modifiedBudget);
  cy.get('.cdk-overlay-container dib-travel-policy-dialog currency-picker .currency').click();
  cy.get('.cdk-overlay-container dib-travel-policy-dialog currency-picker .symbol').contains('€').click();
};