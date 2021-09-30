import { getEmailWithHash } from '../../../helpers';
import { EmployeeExtended } from '../../../models';
import { addEmployee, archiveEmployee } from './shared';

describe('Company Employees - Employees (User)', () => {
  let employee: EmployeeExtended;

  before(() => {
    cy.fixture('company-employees/employee').then((employeeFixture) => {
      employee = { ...employeeFixture, email: getEmailWithHash(employeeFixture.email) };
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/people-management/employees');
    cy.waitForAngular();
  });

  it('should display "Employees" in the sidebar navigation', () => {
    cy.get('dib-navbar dib-hamburger-icon').click();

    cy.get('.cdk-overlay-container dib-navbar-panel').contains('Employees').should('exist');
  });

  it('should display Employees page', () => {
    cy.get('dib-people-management dib-employees dib-page .header__title').should('contain', 'Employees');
    cy.get('dib-people-management dib-employees dib-page button').should('contain', 'Add Employee');
  });

  it('should allow user to add new employee with sending invitation to employee', () => {
    addEmployee(employee.firstName, employee.lastName, employee.email);

    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', employee.firstName);
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', employee.lastName);
    cy.get('dib-people-management dib-employees dib-page .grid .table-cell').should('contain', employee.email);
  });

  it('should allow user to search a certain employee', () => {
    cy.get('dib-people-management dib-employees dib-page ui-input input[name="undefined"]').type(employee.firstName);

    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', employee.firstName);
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should(
      'not.contain',
      employee.modifiedFirstName
    );
  });

  it('should display only invited users', () => {
    cy.get('dib-people-management dib-employees dib-page ui-dropdown').click();
    cy.waitForAngular();

    cy.get('.cdk-overlay-container .cdk-overlay-pane ui-panel .item').contains('Invited').click();

    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', employee.firstName);
    cy.get('dib-people-management dib-employees .grid .table-cell').should('contain', 'Invited');
    cy.get('dib-people-management dib-employees').should('not.contain', 'Not invited');
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('not.contain', 'QA Bot');
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

  it('should allow a user to archive invited employee', () => {
    archiveEmployee(employee);
  });

  it('should allow user to add new employee with not sending invitation to employee', () => {
    addEmployee(employee.firstName, employee.lastName, employee.email, true);

    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', employee.firstName);
    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', employee.lastName);
    cy.get('dib-people-management dib-employees dib-page .grid .table-cell').should('contain', employee.email);
    cy.get('dib-people-management dib-employees').should('contain', 'Not invited');
  });

  it('should display only not invited users', () => {
    cy.get('dib-people-management dib-employees dib-page ui-dropdown').click();
    cy.waitForAngular();

    cy.get('.cdk-overlay-container .cdk-overlay-pane ui-panel .item').contains('Not invited').click();

    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', employee.firstName);
    cy.get('dib-people-management dib-employees').should('contain', 'Not invited');
    cy.get('dib-people-management dib-employees .grid .table-cell').should('not.contain', 'Invited');
  });

  it('should display only admins', () => {
    cy.get('dib-people-management dib-employees ui-radio').contains('Show admins only').click();

    cy.get('dib-people-management dib-employees dib-page .grid .name-cell').should('contain', 'Admin');
  });

  it('should display only activated users', () => {
    cy.get('dib-people-management dib-employees dib-page ui-dropdown').click();
    cy.waitForAngular();

    cy.get('.cdk-overlay-container .cdk-overlay-pane ui-panel .item').contains('Activated').click();

    cy.get('dib-people-management dib-employees dib-page .grid').should('contain', 'Activated');
    cy.get('dib-people-management dib-employees dib-page .grid').should('not.contain', 'Invited');
    cy.get('dib-people-management dib-employees dib-page .grid').should('not.contain', 'Not invited');
  });

  it('should not allow user to add new employee with existing email', () => {
    addEmployee(employee.firstName, employee.lastName, employee.email);

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'A user with this email already exists.'
    );
    cy.get('.cdk-overlay-container simple-snack-bar button').contains('ok').click();
  });

  it('should allow a user to archive not-invited employee', () => {
    archiveEmployee(employee);
  });
});
