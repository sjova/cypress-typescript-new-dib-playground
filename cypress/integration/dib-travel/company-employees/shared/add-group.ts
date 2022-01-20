export const addGroup = (name: string, description: string, employee: string, includeAssertion = true): void => {
  cy.get('dib-people-management dib-groups .header ui-button').contains('Add Group').click();

  cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="Group name*"]').type(name);
  cy.get('.cdk-overlay-container dib-group-dialog input[placeholder="Description"]').type(description);

  cy.get('.cdk-overlay-container dib-group-dialog  ui-control-wrapper .container').click();

  // TODO: We have a randomly blocker by ticket (DT-11016) - We should discussed together about this issue.
  cy.get('.cdk-overlay-container ui-dropdown-panel .checkbox-label').contains(employee).click();

  cy.get('.cdk-overlay-container dib-group-dialog ui-button').contains('Save').click();

  if (includeAssertion) {
    cy.get('dib-people-management dib-groups dib-page dib-expandable-item .item__main h2').should('contain', name);
    cy.get('dib-people-management dib-groups dib-page dib-expandable-item .item__main p').should(
      'contain',
      description
    );
  }
};
