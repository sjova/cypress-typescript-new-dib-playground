export const addGroup = (groupName: string, description: string, includeAssertion = true): void => {
  cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');

  cy.wait('@getCorporationsEmployees').then(() => {
    cy.get('dib-people-management dib-groups ui-button').contains('Add Group').click();

    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="group name*"]').type(groupName);
    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="description"]').type(description);
    cy.get('.cdk-overlay-container dib-group-dialog dib-assign-members .member').click();
    cy.get('.cdk-overlay-container dib-group-dialog ui-button').contains('save').click();

    if (includeAssertion) {
      cy.get('dib-people-management dib-groups dib-expandable-item').should('contain', groupName);
    }
  });
};
