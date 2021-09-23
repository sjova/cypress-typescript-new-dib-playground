export const searchAndSelectEmployee = (
  employeeEmail: string,
  employeeFirstName: string,
  employeeLastName: string
): void => {
  cy.get('.cdk-overlay-container dib-travel-policy-dialog input[placeholder=Search]').type(
    employeeEmail && employeeFirstName && employeeLastName
  );
  cy.get('.cdk-overlay-container dib-travel-policy-dialog dib-assign-members .members')
    .contains(employeeEmail || employeeFirstName || employeeLastName)
    .prev('.member')
    .click();
  cy.get('.cdk-overlay-container dib-travel-policy-dialog ui-button[type=success]').click();
};
