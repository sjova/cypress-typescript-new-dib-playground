import { deleteTravelPolicy } from './delete-travel-policy';

export const deleteTravelPolicyAndConfirm = (travelPolicyName: string): void => {
  deleteTravelPolicy(travelPolicyName);

  cy.get('dib-company-management dib-travel-policy dib-expandable-item').contains(travelPolicyName).should('not.exist');
};
