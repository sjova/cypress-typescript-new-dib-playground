import { ApprovalProcess } from '../../../models';

describe('Company Settings - Approval Process', () => {
  let approvalForm: ApprovalProcess;

  before(() => {
    cy.fixture('company-settings/approval-form').then((approvalProcessFormDetails) => {
      approvalForm = approvalProcessFormDetails;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.clearCookies();
    cy.visit('/company-management/approval-process');
  });

  it('should display company settings/approval process in navbar menu', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Approval Process ');
  });

  it('submits empty approval process form', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog').should('be.visible');
  });

  it('display info about approval process', () => {
    cy.get('dib-company-management dib-approval-process .header__details__helptext').click();
    cy.get('.cdk-overlay-container .modal-content').scrollTo('bottom');
    cy.get('.cdk-overlay-container dib-approval-process-helptext-dialog').should('be.visible');
    cy.get('.cdk-overlay-container dib-dialog-wrapper').contains('close').click();
  });

  it('creates a new approval process (exception from travel policy)', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input input')
      .first()
      .type(approvalForm.approvalProcessFor);
    cy.get('.cdk-overlay-container dib-approval-process-dialog .members .user')
      .contains(approvalForm.approvalProcessForContent)
      .click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog #mat-radio-1').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left').should(
      'contain',
      approvalForm.approvedBy
    );
  });

  it('creates a new approval process (only out of policy trips)', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input input')
      .first()
      .type(approvalForm.approvalProcessFor);
    cy.get('.cdk-overlay-container dib-approval-process-dialog .members .user')
      .contains(approvalForm.approvalProcessForContent)
      .click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog #mat-radio-2').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input input').eq(2).type(approvalForm.approvedBy);
    cy.get('.cdk-overlay-container dib-approval-process-dialog .members .group')
      .contains(approvalForm.approvedByContent)
      .click({ force: true });
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left').should(
      'contain',
      approvalForm.approvedBy
    );
  });

  it('creates a new approval process (all trips)', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input input')
      .first()
      .type(approvalForm.approvalProcessFor);
    cy.get('.cdk-overlay-container dib-approval-process-dialog .members .user')
      .contains(approvalForm.approvalProcessForContent)
      .click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog #mat-radio-3').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input input').eq(3).type(approvalForm.approvedBy);
    cy.get('.cdk-overlay-container dib-approval-process-dialog .members .group')
      .contains(approvalForm.approvedByContent)
      .click({ force: true });
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();
    cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left').should(
      'contain',
      approvalForm.approvedBy
    );
  });

  it('closes confirmation-dialog for deleting approval process item (cancellation the delete action)', () => {
    cy.get('dib-company-management dib-approval-process-item')
      .contains('QA')
      .parents('dib-approval-process-item')
      .within(() => {
        return cy.get('ui-button').contains('delete').click();
      });
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();
  });

  it('deletes approval process item', () => {
    cy.get('dib-company-management dib-approval-process-item')
      .contains('QA')
      .parents('dib-approval-process-item')
      .within(() => {
        return cy.get('ui-button').contains('delete').click();
      });
    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();
  });
});
