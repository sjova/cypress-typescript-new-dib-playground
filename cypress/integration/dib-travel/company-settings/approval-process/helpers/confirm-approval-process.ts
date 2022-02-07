import { User } from '@cy/models';

export const confirmApprovalProcess = (traveler: User): void => {
  cy.get('.cdk-overlay-container simple-snack-bar > span').should(
    'have.text',
    'Approval process successfully created.'
  );
  cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left').should(
    'contain',
    `${traveler.firstName} ${traveler.lastName}`
  );
};
