import { TravelPolicy } from '@cy/models';
import { clickTravelPolicyCtaButton } from './click-travel-policy-cta-button';

export const closeEditDialogAndConfirm = (travelPolicyDetails: TravelPolicy): void => {
  clickTravelPolicyCtaButton(travelPolicyDetails.sharedDetails.name, 'edit');

  cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

  cy.get('.cdk-overlay-container dib-dialog-wrapper').should('not.exist');
};
