export const cancelDeleteGroupAndConfirm = (groupName: string, groupDescription: string): void => {
  cy.waitForAngular();

  cy.get('dib-people-management dib-groups dib-expandable-item h2')
    .contains(groupName)
    .parent('.item__main')
    .next('[dib-column-right]')
    .find('ui-button button')
    .contains(' Delete ')
    .click();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains(' No ').click();
  cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', groupName);
  cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', groupDescription);
};
