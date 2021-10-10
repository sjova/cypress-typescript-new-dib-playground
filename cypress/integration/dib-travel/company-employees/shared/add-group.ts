export const addGroup = (name: string, description: string, includeAssertion = true): void => {
  cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');

  cy.wait('@getCorporationsEmployees').then(() => {
    cy.get('dib-people-management dib-groups .header ui-button').contains('Add Group').click();

    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="Group name*"]').type(name);
    cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="Description"]').type(description);

    cy.get('.cdk-overlay-container dib-group-dialog dib-assign-members .member').click();

    cy.get('.cdk-overlay-container dib-group-dialog ui-button').contains('Save').click();

    if (includeAssertion) {
      cy.get('dib-people-management dib-groups dib-page dib-expandable-item .item__main h2').should('contain', name);
      cy.get('dib-people-management dib-groups dib-page dib-expandable-item .item__main p').should(
        'contain',
        description
      );
    }
  });
};
