/**
 * Add employee
 *
 * @param {string} firstName - Employee first name
 * @param {string} lastName - Employee last name
 * @param {string} email - Employee email
 */
export const addEmployee = (firstName: string, lastName: string, email: string): void => {
  cy.get('dib-people-management dib-employees .table-pref ui-button').click();

  cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="firstName"]').type(firstName);
  cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="lastName"]').type(lastName);
  cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[type="email"]').type(email);

  cy.get('.cdk-overlay-container dib-employee-dialog ui-button').click();
};
