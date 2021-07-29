import { getEmailWithHash } from '../../../helpers';
import { Employee } from '../../../models';
import { addNewEmployee, deleteAddedEmployee } from './shared';

describe('Company Employees - Employees (User)', () => {
  let employee: Employee;

  before(() => {
    cy.fixture('company-employees/employee').then((employeeFixture) => {
      employee = { ...employeeFixture, email: getEmailWithHash(employeeFixture.email) };
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/people-management/employees');
  });

  it('should "Employees" be displayed in side bar', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Employees').should('exist');
  });

  it('should allow user to add new employee', () => {
    addNewEmployee();
  });

  it('should allow user to edit added employee', () => {
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell h4')
      .contains(employee.firstName)
      .parent('.name-cell')
      .next('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .find('ui-button button')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="firstName"]')
      .clear()
      .type(employee.modifiedFirstName);
    cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="lastName"]')
      .clear()
      .type(employee.modifiedLastName);
    cy.get('.cdk-overlay-container dib-employee-dialog ui-button').contains('Save').click();

    cy.get('dib-people-management dib-employees dib-page .grid .name-cell h4').should(
      'contain',
      employee.modifiedFirstName
    );
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell h4').should(
      'contain',
      employee.modifiedLastName
    );
  });

  it('should not allow user to add new employee with existing email', () => {
    cy.get('dib-people-management dib-employees .table-pref ui-button').click();

    cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="firstName"]').type(employee.firstName);
    cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[name="lastName"]').type(employee.lastName);
    cy.get('.cdk-overlay-container dib-employee-dialog ui-input input[type="email"]').type(employee.email);
    cy.get('.cdk-overlay-container dib-employee-dialog ui-button').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'A user with this email already exists.'
    );
    cy.get('.cdk-overlay-container simple-snack-bar button').contains('ok').click();
  });

  it('should allow user to delete added employee', () => {
    deleteAddedEmployee();
  });
});
