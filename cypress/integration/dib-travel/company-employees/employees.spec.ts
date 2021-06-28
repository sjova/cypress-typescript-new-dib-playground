import { Employee } from '../../../models/employee/employee';

describe('Company Employees - Employees Page', () => {
  let employeeDetails: Employee;

  before(() => {
    cy.fixture('company-employees/employees').then((employee) => {
      employeeDetails = employee;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.get('dib-layout dib-hamburger-icon').click();
    cy.get('[routerLink="/people-management/employees"]').click();
  });

  //Regular User
  it('should allow regular user to add new employee', () => {
    cy.get('dib-people-management new-dib-employees ui-button button').click();
    cy.get('dib-employee-dialog ui-input  input[name="firstName"]').type(employeeDetails.firstName);
    cy.get('dib-employee-dialog ui-input  input[name="lastName"]').type(employeeDetails.lastName);
    cy.get('dib-employee-dialog ui-input  input[type="email"]').type(employeeDetails.email);
    cy.get('dib-employee-dialog ui-button button').click();
    // TODO Replace with waiting specific API call
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    // cy.intercept('/api/secure/v1/corporations/').as('getEmployees');
    // cy.log('@getEmployees');
    // cy.wait('@getEmployees').should('be.visible');

    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.firstName);
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.lastName);
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.email);
  });

  it('should allow user to edit added employee', () => {
    // TODO Replace with waiting specific API call
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    cy.get('new-dib-employees dib-page ui-button button').contains('edit').click();
    cy.get('dib-employee-dialog ui-input  input[name="firstName"]').clear();
    cy.get('dib-employee-dialog ui-input  input[name="firstName"]').type(employeeDetails.editFirstName);
    cy.get('dib-employee-dialog ui-input  input[name="lastName"]').clear();
    cy.get('dib-employee-dialog ui-input  input[name="lastName"]').type(employeeDetails.editLastName);
    cy.get('dib-employee-dialog ui-input  input[type="email"]').clear();
    cy.get('dib-employee-dialog ui-input  input[type="email"]').type(employeeDetails.editEmail);
    cy.get('dib-employee-dialog ui-button button').contains('Save').click();
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.editFirstName);
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.editLastName);
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.editEmail);
  });

  it('should not allow regular user to add new employee with existing email', () => {
    cy.get('dib-people-management new-dib-employees ui-button button').contains('Add Employee').click();
    cy.get('dib-employee-dialog ui-input  input[name="firstName"]').type(employeeDetails.firstName);
    cy.get('dib-employee-dialog ui-input  input[name="lastName"]').type(employeeDetails.lastName);
    cy.get('dib-employee-dialog ui-input  input[type="email"]').type(employeeDetails.email);
    cy.get('dib-employee-dialog ui-button button').click();
    cy.get('snack-bar-container simple-snack-bar').should('contain', 'A user with this email already exits.');
    cy.get('.dib-dialog-panel .material-icons').contains('close').click();
  });

  it('should allow user to delete added employee', () => {
    // TODO Replace with waiting specific API call
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    cy.get('new-dib-employees dib-page ui-button button').contains('archive').click();
    cy.get('.cdk-overlay-pane confirmation-dialog .button-container ui-button[type="warning"]')
      .contains('archive')
      .click();
    cy.get('new-dib-employees dib-page .grid').should('not.contain', employeeDetails.firstName);
    cy.get('new-dib-employees dib-page .grid').should('not.contain', employeeDetails.lastName);
    cy.get('new-dib-employees dib-page .grid').should('not.contain', employeeDetails.email);
  });

  //Agent
  it('should allow agent to add new employee', () => {
    cy.get('dib-people-management new-dib-employees ui-button button').click();
    cy.get('dib-employee-dialog ui-input  input[name="firstName"]').type(employeeDetails.firstName);
    cy.get('dib-employee-dialog ui-input  input[name="lastName"]').type(employeeDetails.lastName);
    cy.get('dib-employee-dialog ui-input  input[type="email"]').type(employeeDetails.email);
    cy.get('dib-employee-dialog ui-button button').click();
    // TODO Replace with waiting specific API call
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.firstName);
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.lastName);
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.email);
  });

  it('should allow agent to edit added employee', () => {
    // TODO Replace with waiting specific API call
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    cy.get('new-dib-employees dib-page ui-button button').contains('edit').click();
    cy.get('dib-employee-dialog ui-input  input[name="firstName"]').clear();
    cy.get('dib-employee-dialog ui-input  input[name="firstName"]').type(employeeDetails.editFirstName);
    cy.get('dib-employee-dialog ui-input  input[name="lastName"]').clear();
    cy.get('dib-employee-dialog ui-input  input[name="lastName"]').type(employeeDetails.editLastName);
    cy.get('dib-employee-dialog ui-input  input[type="email"]').clear();
    cy.get('dib-employee-dialog ui-input  input[type="email"]').type(employeeDetails.editEmail);
    cy.get('dib-employee-dialog ui-button button').contains('Save').click();
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.editFirstName);
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.editLastName);
    cy.get('new-dib-employees dib-page .grid').should('contain', employeeDetails.editEmail);
  });

  it('should not allow agent to add new employee with existing email', () => {
    cy.get('dib-people-management new-dib-employees ui-button button').contains('Add Employee').click();
    cy.get('dib-employee-dialog ui-input  input[name="firstName"]').type(employeeDetails.firstName);
    cy.get('dib-employee-dialog ui-input  input[name="lastName"]').type(employeeDetails.lastName);
    cy.get('dib-employee-dialog ui-input  input[type="email"]').type(employeeDetails.email);
    cy.get('dib-employee-dialog ui-button button').click();
    cy.get('snack-bar-container simple-snack-bar').should('contain', 'A user with this email already exits.');
    cy.get('.dib-dialog-panel .material-icons').contains('close').click();
  });

  it('should allow agent to delete added employee', () => {
    // TODO Replace with waiting specific API call
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    cy.get('new-dib-employees dib-page ui-button button').contains('archive').click();
    cy.get('.cdk-overlay-pane confirmation-dialog .button-container ui-button[type="warning"]')
      .contains('archive')
      .click();
    cy.get('new-dib-employees dib-page .grid').should('not.contain', employeeDetails.firstName);
    cy.get('new-dib-employees dib-page .grid').should('not.contain', employeeDetails.lastName);
    cy.get('new-dib-employees dib-page .grid').should('not.contain', employeeDetails.email);
  });
});
