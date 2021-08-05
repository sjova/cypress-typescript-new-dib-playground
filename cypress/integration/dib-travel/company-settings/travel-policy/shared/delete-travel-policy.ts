import { clickSingleTravelPolicyCtaButton } from './click-single-travel-policy-cta-button';

export const deleteTravelPolicy = (travelPolicyName: string): void => {
  clickSingleTravelPolicyCtaButton(travelPolicyName, 'delete');

  cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();
};
