import { ApprovalProcess, TravelPolicy, Group } from '../../../models';
import { enterSharedDetails, deleteTravelPolicyAndConfirm } from './travel-policy/shared';

describe('Company Settings - Approval Process', () => {
  let approvalForm: ApprovalProcess;
  let group: Group;
  let travelPolicyDetails: TravelPolicy;

  const travelPolicyLink = '/company-management/travel-policy';
  const groupLink = '/people-management/groups';

  const deleteApprovalProcessAndConfirm = () => {
    cy.get('dib-company-management dib-approval-process dib-approval-process-item')
      .contains(approvalForm.approvalProcessFor)
      .parents('dib-approval-process-item')
      .find('ui-button')
      .contains('delete')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning]').click();

    cy.get('dib-company-management dib-approval-process dib-page dib-approval-process-item').should('not.exist');
  };

  before(() => {
    cy.fixture('company-settings/approval-form').then((approvalProcessFixture) => {
      approvalForm = approvalProcessFixture;
    });

    cy.fixture('company-employees/group').then((groupFixture) => {
      group = groupFixture;
    });

    cy.fixture('company-settings/travel-policy-details').then((travelPolicyFixture) => {
      travelPolicyDetails = travelPolicyFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/approval-process');
  });

  it('should display "Approval Process" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Approval Process ').should('exist');
  });

  it('should display info about approval process', () => {
    cy.get('dib-company-management dib-approval-process .header__details__helptext').click();
    cy.get('.cdk-overlay-container .modal-content').scrollTo('bottom');

    cy.get('.cdk-overlay-container dib-approval-process-helptext-dialog').should('be.visible');

    cy.get('.cdk-overlay-container dib-dialog-wrapper').contains('close').click();
  });

  it('should create group for approval process', () => {
    cy.visit(groupLink);

    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');

    cy.wait('@getCorporationsEmployees').then(() => {
      cy.get('dib-people-management dib-groups ui-button').contains('Add Group').click();

      cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]').type(group.name);
      cy.get('.cdk-overlay-container dib-group-dialog ui-button').contains('save').click();

      cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', group.name);
    });
  });

  it('should create travel policy for approval process', () => {
    cy.visit(travelPolicyLink);

    cy.get('dib-company-management dib-travel-policy ui-button[type=primary]').click();

    enterSharedDetails(travelPolicyDetails.hotel.type, travelPolicyDetails.sharedDetails);

    cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-travel-policy dib-expandable-item .section__header__title').should(
      'contain',
      travelPolicyDetails.sharedDetails.name
    );
  });

  it('should create approval process (exception from travel policy)', () => {
    cy.intercept('GET', '/api/secure/v1/travel-policy/approval-process').as('getApprovalProcessForm');

    cy.wait('@getApprovalProcessForm').then(() => {
      cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();
      cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input')
        .first()
        .type(approvalForm.approvalProcessFor);
      cy.get('.cdk-overlay-container dib-approval-process-dialog .members label')
        .contains(approvalForm.approvalProcessForContent)
        .click();
    });

    cy.get('.cdk-overlay-container dib-approval-process-dialog label')
      .contains("Don't need approval (exception from travel policy)")
      .click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left').should(
      'contain',
      approvalForm.approvalProcessFor
    );
  });

  it('should delete approval process (exception from travel policy)', () => {
    deleteApprovalProcessAndConfirm();
  });

  it('should create approval process (only out of policy trips)', () => {
    cy.intercept('GET', '/api/secure/v1/travel-policy/approval-process').as('getApprovalProcessForm');

    cy.wait('@getApprovalProcessForm').then(() => {
      cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();
      cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input')
        .first()
        .type(approvalForm.approvalProcessFor);
      cy.get('.cdk-overlay-container dib-approval-process-dialog .members label')
        .contains(approvalForm.approvalProcessForContent)
        .click();
    });

    cy.get('.cdk-overlay-container dib-approval-process-dialog label').contains('Only out of policy trips').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input').eq(2).type(approvalForm.approvedBy);
    cy.get('.cdk-overlay-container dib-approval-process-dialog .members label')
      .contains(approvalForm.approvedByContent)
      .clickAttached();
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left').should(
      'contain',
      approvalForm.approvalProcessFor
    );
  });

  it('should delete approval process (only out of policy trips)', () => {
    deleteApprovalProcessAndConfirm();
  });

  it('should create approval process (all trips)', () => {
    cy.intercept('GET', '/api/secure/v1/travel-policy/approval-process').as('getApprovalProcessForm');

    cy.wait('@getApprovalProcessForm').then(() => {
      cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();
      cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input')
        .first()
        .type(approvalForm.approvalProcessFor);
      cy.get('.cdk-overlay-container dib-approval-process-dialog .members label')
        .contains(approvalForm.approvalProcessForContent)
        .click();
    });

    cy.get('.cdk-overlay-container dib-approval-process-dialog label').contains('All trips').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog dib-input').last().type(approvalForm.approvedBy);
    cy.get('.cdk-overlay-container dib-approval-process-dialog .members label')
      .contains(approvalForm.approvedByContent)
      .clickAttached();
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left').should(
      'contain',
      approvalForm.approvalProcessFor
    );
  });

  it('should check cancellation of confirmation dialog', () => {
    cy.get('dib-company-management dib-approval-process dib-approval-process-item')
      .contains(approvalForm.approvalProcessFor)
      .parents('dib-approval-process-item')
      .find('ui-button')
      .contains('delete')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left').should(
      'contain',
      approvalForm.approvalProcessFor
    );
  });

  it('should delete approval process (all trips)', () => {
    deleteApprovalProcessAndConfirm();
  });

  it('should try to submit empty approval process form', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container dib-approval-process-dialog').should('be.visible');
  });

  it('should delete group for approval process', () => {
    cy.visit(groupLink);

    cy.get('dib-people-management dib-groups dib-expandable-item h2')
      .contains(group.name)
      .parent('.item__main')
      .next('[dib-column-right]')
      .find('ui-button button')
      .contains('delete')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains('Delete').click();

    cy.get('dib-people-management dib-groups [dib-empty-list-label]').should(
      'contain',
      'You have not yet created any groups.'
    );
  });

  it('should delete travel policy for approval process', () => {
    cy.visit(travelPolicyLink);

    deleteTravelPolicyAndConfirm(travelPolicyDetails.sharedDetails.name);
  });
});
