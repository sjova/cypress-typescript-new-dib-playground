export const searchAndSelectEmployee = (employeeEmail: string): void => {
  cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Search]').type(employeeEmail);
  cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-assign-members .members .user-email')
    // TODO: Implement `.contains` based on first and last name
    .contains(employeeEmail)
    .prev('.member')
    .click();
  cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();
};
