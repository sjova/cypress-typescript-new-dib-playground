import { Group } from '@cy/models';
import { addGroup, cancelDeleteGroupAndConfirm, deleteGroup, editGroup } from './shared';

describe('Company Employees - Groups (User)', () => {
  let group: Group;

  before(() => {
    cy.fixture('company-employees/group').then((groupFixture) => {
      group = groupFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/people-management/groups');
  });

  it('should display "Groups" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Groups').should('exist');
  });

  it('should display Groups page', () => {
    cy.get('dib-people-management dib-groups .header__title').should('contain', 'Groups');
    cy.get('dib-people-management dib-groups .header__details').should(
      'contain',
      'You can create groups of employees in order to simplify on- and off-boarding in in the company. When assigning functions and authorization (e.g. Cost Centers, Billing profiles etc) you can do that to a group instead of every employee.'
    );
  });

  it('should allow user to add new group', () => {
    addGroup(group.name, group.description);
  });

  // TODO: This is blocked by bug ticket (DT-7943)
  /* it('should not alow user to add new group with existing name ', () => {
    cy.get('dib-people-management dib-groups .header ui-button').contains('Add Group').click();

    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="Group name*"]').type(group.name);

    cy.get('.cdk-overlay-container dib-group-dialog ui-button').contains('Save').click();
  }); */

  // TODO: This test is blocked by bug ticket (DT-11016)
  /*it('should display added employee in created group', () => {
    cy.waitForAngular();

    cy.get('dib-people-management dib-groups dib-page dib-expandable-item .button').click();

    cy.get('dib-people-management dib-groups dib-page dib-expandable-item div[dib-column-350] h4').should(
      'contain',
      `${group.employee.firstName} ${group.employee.lastName}`
    );
    cy.get('dib-people-management dib-groups dib-page dib-expandable-item div[dib-column-700] h4').should(
      'contain',
      group.employee.email
    );
  });*/

  it('should allow user to edit created group', () => {
    editGroup(group);
  });

  it('should cancel confirmation dialog for deleting group', () => {
    cancelDeleteGroupAndConfirm(group.modifiedName, group.modifiedDescription);
  });

  it('should allow user to delete created group', () => {
    deleteGroup(group.modifiedName);
  });

  it('should confirm that the group no longer exists', () => {
    cy.get('dib-people-management dib-groups dib-page [dib-empty-list-label]').should(
      'contain',
      'You have not yet created any groups.'
    );
  });
});
