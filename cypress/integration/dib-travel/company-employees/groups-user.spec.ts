import { Group } from '../../../models';

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

  it('should "Groups" be displayed in side bar', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Groups').should('exist');
  });

  it('should allow user to add new group', () => {
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');

    cy.wait('@getCorporationsEmployees').then(() => {
      cy.get('dib-people-management dib-groups ui-button').contains('Add Group').click();

      cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]').type(group.name);
      cy.get('.cdk-overlay-container dib-group-dialog dib-assign-members .member').click();
      cy.get('.cdk-overlay-container dib-group-dialog ui-button').contains('save').click();

      cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', group.name);
    });
  });

  it('should allow user to edit created group', () => {
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
  });

  it('should allow user to delete created group', () => {
    cy.get('dib-people-management dib-groups dib-expandable-item h2')
      .contains(group.modifiedName)
      .parent('.item__main')
      .next('[dib-column-right]')
      .find('ui-button button')
      .contains('delete')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains('Delete').click();
  });

  it('should confirm that the group no longer exists', () => {
    cy.get('dib-people-management dib-groups [dib-empty-list-label]').should(
      'contain',
      'You have not yet created any groups.'
    );
  });
});
