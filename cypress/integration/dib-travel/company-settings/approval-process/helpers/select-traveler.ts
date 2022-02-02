import { User } from '@cy/models';

export const selectTraveler = (traveler: User): void => {
  cy.get('.cdk-overlay-container dib-approval-process-dialog-v2 .container').click();

  cy.waitForAngular();

  cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label')
    .contains(`${traveler.firstName} ${traveler.lastName}`, { matchCase: false })
    .click();
};
