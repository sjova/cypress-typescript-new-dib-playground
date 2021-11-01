import { deleteTravelPolicy } from './delete-travel-policy';

export const deleteTravelPolicyAndConfirm = (travelPolicyName: string): void => {
  deleteTravelPolicy(travelPolicyName);

  cy.waitForAngular();

  cy.get('dib-company-management dib-travel-policy dib-expandable-item').should('not.exist');
};
