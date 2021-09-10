import { Group } from '../../../models';
import { addGroup, deleteGroup } from './shared';

describe('Company Employees - Groups (Agent)', () => {
  let group: Group;

  before(() => {
    cy.fixture('company-employees/group').then((groupFixture) => {
      group = groupFixture;
    });
  });

  beforeEach(() => {
    cy.loginAgent();
    cy.visit('/people-management/groups');
  });

  it('should display "Groups" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Groups').should('exist');
  });

  it('should display Groups page', () => {
    cy.get('dib-people-management dib-groups .header').should('contain', 'Groups');
    cy.get('dib-people-management dib-groups .header').should(
      'contain',
      'You can create groups of employees in order to simplify on- and off-boarding in in the company. When assigning functions and authorization (e.g. Cost Centers, Billing profiles etc) you can do that to a group instead of every employee.'
    );
  });

  it('should allow agent to add new group', () => {
    addGroup(group.name, group.description);
  });

  it('should allow agent to edit created group', () => {
    cy.get('dib-people-management dib-groups dib-expandable-item h2')
      .contains(group.name)
      .parent('.item__main')
      .next('[dib-column-right]')
      .find('ui-button button')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]').clear().type(group.modifiedName);
    cy.get('.cdk-overlay-container dib-group-dialog ui-button').contains('save').click();

    cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', group.modifiedName);
    cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', group.modifiedDescription);
  });

  it('should allow agent to delete created group', () => {
    deleteGroup(group.modifiedName);
  });

  it('should confirm that the group no longer exists', () => {
    cy.get('dib-people-management dib-groups [dib-empty-list-label]').should(
      'contain',
      'You have not yet created any groups.'
    );
  });
});
