import { TravelSettings } from '@cy/models';
import { clickTravelPolicyCtaButton } from './click-travel-policy-cta-button';

export const cancelDeleteDialogAndConfirm = (travelPolicyDetails: TravelSettings): void => {
  cy.waitForAngular();

  clickTravelPolicyCtaButton(travelPolicyDetails.sharedDetails.modifiedName, 'Delete');

  cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

  cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
    'contain',
    travelPolicyDetails.sharedDetails.modifiedName
  );

  cy.get('.cdk-overlay-container confirmation-dialog').should('not.exist');
};
