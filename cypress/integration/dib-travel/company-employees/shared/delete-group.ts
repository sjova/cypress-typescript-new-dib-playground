export const deleteGroup = (groupName: string): void => {
  cy.get('dib-people-management dib-groups dib-expandable-item h2')
    .contains(groupName)
    .parent('.item__main')
    .next('[dib-column-right]')
    .find('ui-button button')
    .contains('delete')
    .clickAttached();

  cy.get('.cdk-overlay-container confirmation-dialog ui-button').contains('Delete').click();
};
