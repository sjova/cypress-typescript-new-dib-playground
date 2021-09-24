import { ApprovalProcess } from '../../../../../models';

export const confirmApprovalProcess = (approvalProcess: ApprovalProcess): void => {
  cy.get('.cdk-overlay-container simple-snack-bar > span').should('contain', 'Approval process successfully created.');
  cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left')
    .first()
    .find('.item__content p')
    .should('contain', `${approvalProcess.traveler.firstName} ${approvalProcess.traveler.lastName}`);
};
