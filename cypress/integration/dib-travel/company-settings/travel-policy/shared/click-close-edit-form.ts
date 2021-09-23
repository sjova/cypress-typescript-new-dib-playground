import { clickTravelPolicyCtaButton } from '.';
import { TravelPolicy } from '../../../../../models';

export const closeEditFormAndConfirm = (travelPolicyDetails: TravelPolicy): void => {
  clickTravelPolicyCtaButton(travelPolicyDetails.sharedDetails.name, 'edit');

  cy.get('.cdk-overlay-container dib-dialog-wrapper i').contains('close').click();

  cy.get('.cdk-overlay-container dib-dialog-wrapper').should('not.exist');
};
