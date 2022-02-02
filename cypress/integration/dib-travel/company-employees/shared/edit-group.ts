import { Group } from '@cy/models';

export const editGroup = (group: Group): void => {
  cy.get('dib-people-management dib-groups dib-expandable-item h2')
    .contains(group.name)
    .parent('.item__main')
    .next('[dib-column-right]')
    .find('ui-button button')
    .contains(' Edit ')
    .click();

  cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="Group name*"]').clear().type(group.modifiedName);
  cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="Description"]')
    .clear()
    .type(group.modifiedDescription);
  cy.get('.cdk-overlay-container dib-group-dialog ui-button').contains('Save').click();

  cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', group.modifiedName);
  cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', group.modifiedDescription);
};
