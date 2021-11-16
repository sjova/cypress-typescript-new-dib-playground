export const editGroup = (groupName: string, groupDescription: string): void => {
  cy.waitForAngular();

  cy.get('dib-people-management dib-groups dib-expandable-item h2')
    .contains(groupName)
    .parent('.item__main')
    .next('[dib-column-right]')
    .find('ui-button button')
    .contains(' Edit ')
    .click();

  cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="Group name*"]').clear().type(groupDescription);
  cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="Description"]').clear().type(groupDescription);
  cy.get('.cdk-overlay-container dib-group-dialog ui-button').contains('Save').click();

  cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', groupName);
  cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', groupDescription);
};
