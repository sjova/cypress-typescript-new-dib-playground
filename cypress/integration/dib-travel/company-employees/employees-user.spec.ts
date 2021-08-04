import { getEmailWithHash } from '../../../helpers';
import { Employee } from '../../../models';

import { addEmployee, archiveEmployee } from './shared';

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
    cy.intercept('GET', '/api/secure/v1/corporations/*/employees').as('getCorporationsEmployees');

    addEmployee(employee.firstName, employee.lastName, employee.email);

    cy.wait('@getCorporationsEmployees').then(() => {
      cy.reload();

      cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', employee.firstName);
      cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', employee.lastName);
      cy.get('dib-people-management dib-employees dib-page .grid .table-cell').should('contain', employee.email);
    });
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
    addEmployee(employee.firstName, employee.lastName, employee.email);

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'A user with this email already exists.'
    );
    cy.get('.cdk-overlay-container simple-snack-bar button').contains('ok').click();
  });

  it('should allow user to archive previously added employee', () => {
    archiveEmployee(employee.email);

    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('not.contain', employee.firstName);
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('not.contain', employee.lastName);
    cy.get('dib-people-management dib-employees dib-page .grid .table-cell').should('not.contain', employee.email);
  });
});
