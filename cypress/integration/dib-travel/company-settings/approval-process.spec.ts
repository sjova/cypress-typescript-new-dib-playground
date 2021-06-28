import { ApprovalProcess } from '../../../models';

describe('Approval Process Suite', () => {
  let aps: ApprovalProcess;

  before(() => {
    cy.fixture('company-settings/approval-process').then((approvalProcessFormData) => {
      aps = approvalProcessFormData;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.get('dib-layout dib-hamburger-icon').click();
    cy.get('[href="/company-management/approval-process"]').click();
  });

  it('submits empty approval process form', () => {
    cy.get('dib-approval-process ui-button[type=primary]').click();
    cy.get('dib-approval-process-dialog ui-button[type=success]').click({ force: true });
    cy.get('dib-dialog-wrapper dib-approval-process-dialog').should('be.visible');
  });

  it('displays info about approval process', () => {
    cy.get('dib-approval-process .header__details__helptext').click();
    cy.get('.cdk-overlay-container .modal-content').scrollTo('bottom');
    cy.get('dib-dialog-wrapper dib-approval-process-helptext-dialog').should('be.visible');
    cy.get('dib-dialog-wrapper .material-icons').click();
  });

  it('creates a new approval process', () => {
    cy.get('dib-approval-process ui-button[type=primary]').click();
    cy.get('dib-approval-process-dialog dib-input input[placeholder="Search people/groups"]')
      .eq(0)
      .type(aps.approvalProcessFor);
    cy.get('mat-checkbox .mat-checkbox-inner-container').eq(0).click({ force: true });
    cy.get('dib-approval-process-dialog dib-input input[placeholder="Search people/groups"]').eq(2).type(aps.approver);
    cy.get('mat-checkbox input[type=checkbox]').eq(2).click({ force: true });
    cy.get('dib-approval-process-dialog ui-button[type=success]').click();
    cy.get('dib-approval-process-item .item__content').should('contain', aps.approver);
  });

  it('Deletes approval process item', () => {
    cy.get('dib-approval-process dib-approval-process-item ui-button[type=warning]').eq(0).click();
    cy.get('mat-dialog-container confirmation-dialog ui-button[cancel=true').click();
    cy.get('dib-approval-process dib-approval-process-item ui-button[type=warning]').eq(0).click();
    cy.get('mat-dialog-container confirmation-dialog ui-button[type=warning').click();
  });
});
