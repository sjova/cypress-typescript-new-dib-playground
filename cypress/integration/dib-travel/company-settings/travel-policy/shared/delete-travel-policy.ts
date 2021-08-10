import { clickTravelPolicyCtaButton } from './click-travel-policy-cta-button';

export const deleteTravelPolicy = (travelPolicyName: string): void => {
  clickTravelPolicyCtaButton(travelPolicyName, 'delete');

  cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();
};
