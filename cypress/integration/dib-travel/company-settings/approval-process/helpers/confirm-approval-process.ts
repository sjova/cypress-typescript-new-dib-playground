import { ApprovalProcessGroup } from '@cy/models';

export const confirmApprovalProcess = (approvalProcessGroup: ApprovalProcessGroup): void => {
  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Approval process successfully created.');
  cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left')
    .first()
    .find('.item__content p')
    .should('contain', `${approvalProcessGroup.traveler.firstName} ${approvalProcessGroup.traveler.lastName}`);
};
