import { ApprovalProcess, Group, TravelPolicy } from '../../../models';
import { addGroup, deleteGroup } from '../company-employees';
import {
  confirmApprovalProcess,
  deleteApprovalProcess,
  selectApprovalSettings,
  selectTraveler,
} from './approval-process';
import { addHotelTravelPolicy, deleteTravelPolicy } from './travel-policy';

describe('Company Settings - Approval Process', () => {
  let group: Group;
  let travelPolicyDetails: TravelPolicy;

  let approvalProcess: ApprovalProcess;

  before(() => {
    cy.fixture('company-employees/group').then((groupFixture) => {
      group = groupFixture;
    });

    cy.fixture('company-settings/travel-policy-details').then((travelPolicyFixture) => {
      travelPolicyDetails = travelPolicyFixture;
    });

    cy.fixture('company-settings/approval-process').then((approvalProcessFixture) => {
      approvalProcess = approvalProcessFixture;
    });
  });

  before(() => {
    cy.login();

    cy.visit('/company-management/travel-policy');
    addHotelTravelPolicy(travelPolicyDetails); // TODO: Do we need to include other types (Flight, Train)?

    cy.visit('/people-management/groups');
    addGroup(group.name, false);

    cy.resetState();
  });

  after(() => {
    cy.resetState();

    cy.login();

    cy.visit('/company-management/travel-policy');
    deleteTravelPolicy(travelPolicyDetails.sharedDetails.name);

    cy.visit('/people-management/groups');
    deleteGroup(group.name);
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

    cy.get('.cdk-overlay-container dib-approval-process-helptext-dialog .modal-content').scrollTo('bottom');

    // TODO: Confirm dialog content (heading and paragraph) instead `.should('be.visible')`
    cy.get('.cdk-overlay-container dib-approval-process-helptext-dialog').should('be.visible');

    cy.get('.cdk-overlay-container dib-dialog-wrapper i').click();
  });

  it('should add approval process (exception from travel policy)', () => {
    cy.intercept('GET', '/api/secure/v1/travel-policy/approval-process').as('getApprovalProcessForm');

    cy.wait('@getApprovalProcessForm').then(() => {
      cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

      selectTraveler(approvalProcess.traveler);
    });

    cy.get('.cdk-overlay-container dib-approval-process-dialog .radio-button-group label')
      .contains("Don't need approval (exception from travel policy)")
      .click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    confirmApprovalProcess(approvalProcess);
  });

  // TODO: Additional test (`it`) for: "Selected traveler already has approval process!"

  it('should delete approval process (exception from travel policy)', () => {
    deleteApprovalProcess(approvalProcess.traveler.firstName);
  });

  it('should add approval process (only out of policy trips)', () => {
    cy.intercept('GET', '/api/secure/v1/travel-policy/approval-process').as('getApprovalProcessForm');

    cy.wait('@getApprovalProcessForm').then(() => {
      cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

      selectTraveler(approvalProcess.traveler);
    });

    selectApprovalSettings('Only out of policy trips', approvalProcess.travelersGroupName);

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    confirmApprovalProcess(approvalProcess);
  });

  it('should delete approval process (only out of policy trips)', () => {
    deleteApprovalProcess(approvalProcess.traveler.firstName);
  });

  it('should add approval process (all trips)', () => {
    cy.intercept('GET', '/api/secure/v1/travel-policy/approval-process').as('getApprovalProcessForm');

    cy.wait('@getApprovalProcessForm').then(() => {
      cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

      selectTraveler(approvalProcess.traveler);
    });

    selectApprovalSettings('All trips', approvalProcess.travelersGroupName);

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    confirmApprovalProcess(approvalProcess);
  });

  // TODO: Similar test should be added for all Approval Settings (think about reusable function)
  it('should confirm the cancellation in the confirmation dialog (all trips)', () => {
    cy.get('dib-company-management dib-approval-process dib-approval-process-item .item__left .item__content p')
      .contains(`${approvalProcess.traveler.firstName} ${approvalProcess.traveler.lastName}`)
      .parents('dib-approval-process-item')
      .find('[dib-column-right] ui-button')
      .contains('delete')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[cancel=true]').click();

    confirmApprovalProcess(approvalProcess);
  });

  it('should delete approval process (all trips)', () => {
    deleteApprovalProcess(approvalProcess.traveler.firstName);
  });

  it('should not be able to submit an empty approval process form', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    // TODO: Confirm snackbar message: "Traveler or group of travelers must be selected" (instead below c)
    cy.get('.cdk-overlay-container dib-approval-process-dialog').should('be.visible');
  });
});
