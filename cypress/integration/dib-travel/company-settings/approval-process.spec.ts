import { ApprovalProcess, Group, TravelPolicy } from '../../../models';
import { addGroup, deleteGroup } from '../company-employees';
import {
  addApprovalProcessForGroupAndConfirm,
  cancelDeleteApprovalProcessAndConfirm,
  confirmApprovalProcess,
  deleteApprovalProcess,
  selectApprovalSettings,
  selectTraveler,
  selectTravelerGroup,
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
    addGroup(group.name, group.description, false);

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

    cy.waitForAngular();
  });

  it('should display "Approval Process" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Approval Process ').should('exist');
  });

  it('should display info about approval process', () => {
    cy.get('dib-company-management dib-approval-process .header__details__helptext').click();

    cy.get('.cdk-overlay-container dib-approval-process-helptext-dialog .modal-content').scrollTo('bottom');

    cy.get('.cdk-overlay-container dib-approval-process-helptext-dialog h2').should(
      'contain',
      'Setup an approval process'
    );
    cy.get('.cdk-overlay-container dib-approval-process-helptext-dialog p')
      .should('contain', 'A customized approval process controls who is allowed to book what.')
      .should(
        'contain',
        'Good to know: If a user is a member of multiple groups, the least restrictive group approval process will be applied'
      );

    cy.get('.cdk-overlay-container dib-dialog-wrapper i').click();
  });

  it('should add approval process (exception from travel policy)', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

    selectTraveler(approvalProcess.traveler);

    cy.get('.cdk-overlay-container dib-approval-process-dialog .radio-button-group label')
      .contains("Don't need approval (exception from travel policy)")
      .click();
    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    confirmApprovalProcess(approvalProcess);
  });

  it('should check if selected traveler already has approval process', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

    selectTraveler(approvalProcess.traveler);

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Selected traveler already has approval process!'
    );
  });

  it('should cancel the deleting approval setting for the group/person (exception from travel policy)', () => {
    cancelDeleteApprovalProcessAndConfirm(approvalProcess.traveler.firstName);
  });

  it('should delete approval process (exception from travel policy)', () => {
    deleteApprovalProcess(approvalProcess.traveler.firstName);
  });

  it('should check if selected traveler group already has approval process', () => {
    addApprovalProcessForGroupAndConfirm(approvalProcess);

    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

    selectTravelerGroup(approvalProcess);

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Selected traveler group already has approval process!'
    );
  });

  it('should delete approval process for traveler group (exception from travel policy)', () => {
    deleteApprovalProcess(approvalProcess.travelersGroupName);
  });

  it('should add approval process (only out of policy trips)', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

    selectTraveler(approvalProcess.traveler);

    selectApprovalSettings('Only out of policy trips', approvalProcess.travelersGroupName);

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    confirmApprovalProcess(approvalProcess);
  });

  it('should not be able to submit approval process form without approver (only out of policy trips)', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

    selectTraveler(approvalProcess.traveler);

    cy.get('.cdk-overlay-container dib-approval-process-dialog .radio-button-group label')
      .contains('Only out of policy trips')
      .click();

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Approver or approver group must be selected!'
    );
  });

  it('should cancel the deleting approval setting for the group/person (only out of policy trips)', () => {
    cancelDeleteApprovalProcessAndConfirm(approvalProcess.traveler.firstName);
  });

  it('should delete approval process (only out of policy trips)', () => {
    deleteApprovalProcess(approvalProcess.traveler.firstName);
  });

  it('should add approval process (all trips)', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

    selectTraveler(approvalProcess.traveler);

    selectApprovalSettings('All trips', approvalProcess.travelersGroupName);

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    confirmApprovalProcess(approvalProcess);
  });

  it('should not be able to submit approval process form without approver (all trips)', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

    selectTraveler(approvalProcess.traveler);

    cy.get('.cdk-overlay-container dib-approval-process-dialog .radio-button-group label')
      .contains('All trips')
      .click();

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Approver or approver group must be selected!'
    );
  });

  it('should cancel the deleting approval setting for the group/person (all trips)', () => {
    cancelDeleteApprovalProcessAndConfirm(approvalProcess.traveler.firstName);
  });

  it('should delete approval process (all trips)', () => {
    deleteApprovalProcess(approvalProcess.traveler.firstName);
  });

  it('should not be able to submit an empty approval process form', () => {
    cy.get('dib-company-management dib-approval-process ui-button[type=primary]').click();

    cy.get('.cdk-overlay-container dib-approval-process-dialog ui-button[type=success]').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'Traveler or group of travelers must be selected!'
    );
  });
});
