import { Groups } from '../../../models/company-employees/groups';

describe('Company Employees - Groups Page', () => {
  let groupsDetails: Groups;

  before(() => {
    cy.fixture('company-employees/groups').then((group) => {
      groupsDetails = group;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.get('dib-layout dib-hamburger-icon').click();
    cy.get('[href="/people-management/groups"]').click();
  });

  it('should allow regular user to add new group', () => {
    cy.get('dib-people-management dib-groups ui-button button').contains('Add Group').click();
    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]').type(groupsDetails.name);
    cy.get('.cdk-overlay-container dib-group-dialog dib-assign-members .members mat-checkbox').click();
    cy.get('.cdk-overlay-container dib-group-dialog ui-button button').contains('save').click();
    cy.get('dib-people-management dib-groups .body').should('contain', groupsDetails.name);
  });

  // TODO make better wait
  it.only('should allow regular user to edit created group', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.get('dib-expandable-item h2')
      .contains('asdf')
      .parent('dib-expandable-item')
      .within(() => {
        return cy.get('ui-button button').contains('edit').click();
      });
    //cy.get('dib-groups .body').find('dib-expandable-item').first().find('ui-button button').contains('edit').click();

    // cy.get('dib-people-management dib-groups dib-expandable-item ui-button button').contains('edit').click();
    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]')
      .clear()
      .type(groupsDetails.editName);
    cy.get('.cdk-overlay-container dib-group-dialog ui-button button').contains('save').click();
    cy.get('dib-people-management dib-groups .body').should('contain', groupsDetails.editName);
  });

  // TODO make better wait
  it('should allow regular user to delete created group', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.get('dib-people-management dib-groups dib-expandable-item ui-button button').contains('delete').click();
    cy.get('.cdk-overlay-container confirmation-dialog ui-button button').contains('Delete').click();
  });
});
