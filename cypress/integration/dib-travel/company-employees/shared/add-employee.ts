export const addEmployee = (
  firstName: string,
  lastName: string,
  email: string,
  uncheckSendInvitation = false
): void => {
  cy.get('dib-people-management dib-employees .table-pref ui-button').contains('Add Employee').click();

  cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="firstName"]').type(firstName);
  cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="lastName"]').type(lastName);
  cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[type="email"]').type(email);

  if (uncheckSendInvitation) {
    cy.get('.cdk-overlay-container dib-employee-dialog ui-checkbox')
      .contains('Send invitation immediately to employee')
      .click();
  }

  cy.get('.cdk-overlay-container dib-employee-dialog ui-button').click();
};
