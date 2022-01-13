import { User } from '@cy/models';

export const selectTraveler = (traveler: Pick<User, 'firstName' | 'lastName'>): void => {
  cy.waitForAngular();
  cy.get('.cdk-overlay-container dib-approval-process-dialog-v2 .container').click();
  cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label')
    .contains(`${traveler.firstName} ${traveler.lastName}`, { matchCase: false })
    .click();
};
