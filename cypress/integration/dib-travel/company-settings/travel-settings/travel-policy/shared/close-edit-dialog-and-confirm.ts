import { TravelSettings } from '@cy/models';
import { clickTravelPolicyCtaButton } from './click-travel-policy-cta-button';

export const closeEditDialogAndConfirm = (travelPolicyDetails: TravelSettings): void => {
  cy.waitForAngular();

  clickTravelPolicyCtaButton(travelPolicyDetails.sharedDetails.name, 'Edit');

  cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

  cy.get('.cdk-overlay-container dib-dialog-wrapper').should('not.exist');
};
