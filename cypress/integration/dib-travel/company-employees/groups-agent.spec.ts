import { GroupName } from '../../../models';

describe('Company Employees - Groups Page', () => {
  let groupName: GroupName;

  before(() => {
    cy.fixture('company-employees/group-name').then((groupNameFixture) => {
      groupName = groupNameFixture;
    });
  });

  beforeEach(() => {
    cy.loginAgent();
    cy.visit('/people-management/groups');
  });

  it('should "Groups" be displayed in side bar', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();
    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Groups');
  });

  it('should allow agent to add new group', () => {
    cy.intercept('/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');

    cy.wait('@getCorporationsEmployees').then(() => {
      cy.get('dib-people-management dib-groups ui-button button').contains('Add Group').click();
      cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]').type(groupName.initialName);
      cy.get('.cdk-overlay-container dib-group-dialog dib-assign-members .member').click();
      cy.get('.cdk-overlay-container dib-group-dialog ui-button button').contains('save').click();

      cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', groupName.initialName);
    });
  });

  it('should allow agent to edit created group', () => {
    cy.get('dib-people-management dib-groups dib-expandable-item h2')
      .contains(groupName.initialName)
      .parent('.item__main')
      .next('[dib-column-right]')
      .get('ui-button button')
      .contains('edit')
      .clickAttached();
    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]')
      .clear()
      .type(groupName.changedName);
    cy.get('.cdk-overlay-container dib-group-dialog ui-button button').contains('save').click();

    cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', groupName.changedName);
  });

  it('should allow agent to delete created group', () => {
    cy.get('dib-people-management dib-groups dib-expandable-item h2')
      .contains(groupName.changedName)
      .parent('.item__main')
      .next('[dib-column-right]')
      .get('ui-button button')
      .contains('delete')
      .clickAttached();
    cy.get('.cdk-overlay-container confirmation-dialog ui-button button').contains('Delete').click();

    cy.get('dib-people-management dib-groups [dib-empty-list-label]').should(
      'contain',
      'You have not yet created any groups.'
    );
  });
});
