import { SharedDetails } from '@cy/models';

export const enterSharedDetails = (policyType: string, sharedDetails: SharedDetails): void => {
  cy.get('.cdk-overlay-container dib-travel-policy-dialog .dib-select').select(policyType);

  cy.get('.cdk-overlay-container dib-travel-policy-dialog input[name=name]').type(sharedDetails.name);
  cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder="Budget"]').type(sharedDetails.budget);
};
