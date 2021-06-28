import { Groups } from '../../../models/company-employees/groups';

describe('Company Employees - Groups Page', () => {
  let groupsDetails: Groups;

  before(() => {
    cy.fixture('company-employees/groups').then((group) => {
      groupsDetails = group;
    });
  });

  // Regular User
  it('should allow regular user to add new group', () => {
    cy.login();
    cy.get('dib-layout dib-hamburger-icon').click();
    cy.get('[routerLink="/people-management/groups"]').click();
    cy.get('dib-people-management dib-groups ui-button button').contains('Add Group').click();
    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]').type(groupsDetails.name);
    cy.get('.cdk-overlay-container dib-group-dialog dib-assign-members .members mat-checkbox').click();
    cy.get('.cdk-overlay-container dib-group-dialog ui-button button').contains('save').click();
    cy.get('dib-people-management dib-groups .body').should('contain', groupsDetails.name);
  });

  it('should allow regular user to edit created group', () => {
    cy.login();
    cy.get('dib-layout dib-hamburger-icon').click();
    cy.get('[routerLink="/people-management/groups"]').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('dib-people-management dib-groups dib-expandable-item ui-button button').contains('edit').click();
    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]')
      .clear()
      .type(groupsDetails.editName);
    cy.get('.cdk-overlay-container dib-group-dialog ui-button button').contains('save').click();
    cy.get('dib-people-management dib-groups .body').should('contain', groupsDetails.editName);
  });

  // TODO add delete group test

  // Agent
  it('should allow agent to add new group', () => {
    cy.loginAgent();
    cy.get('dib-layout dib-hamburger-icon').click();
    cy.get('[routerLink="/people-management/groups"]').click();
    cy.get('dib-people-management dib-groups ui-button button').contains('Add Group').click();
    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]').type(groupsDetails.name);
    cy.get('.cdk-overlay-container dib-group-dialog dib-assign-members .members mat-checkbox').click();
    cy.get('.cdk-overlay-container dib-group-dialog ui-button button').contains('save').click();
    cy.get('dib-people-management dib-groups .body').should('contain', groupsDetails.name);
  });

  it('should allow agent to edit created group', () => {
    cy.loginAgent();
    cy.get('dib-layout dib-hamburger-icon').click();
    cy.get('[routerLink="/people-management/groups"]').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('dib-people-management dib-groups dib-expandable-item ui-button button').contains('edit').click();
    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]')
      .clear()
      .type(groupsDetails.editName);
    cy.get('.cdk-overlay-container dib-group-dialog ui-button button').contains('save').click();
    cy.get('dib-people-management dib-groups .body').should('contain', groupsDetails.editName);
  });

  // TODO add delete group test
});
