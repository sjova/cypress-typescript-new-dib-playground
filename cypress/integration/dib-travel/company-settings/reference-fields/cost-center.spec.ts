import { ReferenceFields } from '../../../../models';

describe('Company Settings - Reference Fields - Cost Center', () => {
  let referenceFields: ReferenceFields;

  before(() => {
    cy.fixture('company-settings/reference-fields').then((referenceFixture) => {
      referenceFields = referenceFixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/company-management/reference-fields/cost-center');
  });

  it('should both check-boxes be checked', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center ui-checkbox input[type="checkbox"]')
      // Computed size is zero, and we need to use `{ force: true }`
      .uncheck({ force: true })
      .check({ force: true });

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.costCenter.confirmationMessage
    );
  });

  it('should uncheck "Make cost centres visible to all employees" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
      .contains('Make cost centres visible to all employees')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.costCenter.confirmationMessage
    );

    cy.get('dib-company-management dib-reference-fields dib-cost-center .warning-message')
      .should('be.visible')
      .contains(
        'If you uncheck this box, and have not assigned any cost center to an employee, they will not be able to complete their trip booking if cost centers are set as mandatory '
      );
  });

  it('should verify that error message is displayed', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .warning-message')
      .should('be.visible')
      .contains(
        'If you uncheck this box, and have not assigned any cost center to an employee, they will not be able to complete their trip booking if cost centers are set as mandatory '
      );
  });

  it('should uncheck "Make cost centers mandatory in each travel booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
      .contains('Make cost centers mandatory in each travel booking')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.costCenter.confirmationMessage
    );
  });

  it('should check "Make cost centers mandatory in each travel booking" check-box', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .checkbox-label')
      .contains('Make cost centers mandatory in each travel booking')
      .click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      referenceFields.costCenter.confirmationMessage
    );
  });

  it('should add new cost center', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-reference-fields dib-cost-center ui-button[size="large"]')
      .contains(referenceFields.costCenter.addActionCtaButton)
      .click();

    cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost Center Name*"]').type(
      referenceFields.costCenter.name
    );
    cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost Center Description"]').type(
      referenceFields.costCenter.description
    );

    cy.get('.cdk-overlay-container dib-cost-center-dialog dib-assign-members .members').contains('QA Bot').click();
    cy.get('.cdk-overlay-container dib-cost-center-dialog ui-button').contains('save').click();

    cy.waitForAngular();

    cy.get('dib-company-management dib-reference-fields dib-cost-center').should(
      'contain',
      referenceFields.costCenter.name
    );
  });

  it('should sort cost center by name', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center dib-sort-icons').click();

    cy.get('dib-company-management dib-reference-fields dib-cost-center .table-cell:first').should(
      'have.text',
      referenceFields.costCenter.name
    );
    cy.get('dib-company-management dib-reference-fields dib-cost-center .table-cell:last')
      .prev()
      .prev()
      .prev()
      .should('have.text', 'AAA');

    cy.get('dib-company-management dib-reference-fields dib-cost-center dib-sort-icons').click();

    cy.get('dib-company-management dib-reference-fields dib-cost-center .table-cell:first').should('have.text', 'AAA');
  });

  it('should edit cost center', () => {
    cy.get('dib-company-management dib-reference-fields dib-cost-center .table-cell h4')
      .contains(referenceFields.costCenter.name)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains('edit')
      .clickAttached();

    cy.get('.cdk-overlay-container dib-cost-center-dialog input[placeholder="Cost Center Name*"]')
      .clear()
      .type(referenceFields.costCenter.modifiedName);
    cy.get('.cdk-overlay-container dib-cost-center-dialog ui-button').contains('save').click();

    cy.get('dib-company-management dib-reference-fields dib-cost-center .grid').should(
      'contain',
      referenceFields.costCenter.modifiedName
    );
  });

  it('should delete cost center', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-reference-fields dib-cost-center .table-cell h4')
      .contains(referenceFields.costCenter.modifiedName)
      .parent('.table-cell')
      .next('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains(' archive ')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning').click();

    cy.waitForAngular();

    cy.get('dib-company-management dib-reference-fields dib-cost-center .grid').should(
      'not.contain',
      referenceFields.costCenter.modifiedName
    );
  });

  it.only('should verify that last const center is not able to delete', () => {
    cy.waitForAngular();

    cy.get('dib-company-management dib-reference-fields dib-cost-center .table-cell h4')
      .contains('AAA')
      .parent('.table-cell')
      .next('.table-cell')
      .next('.table-cell')
      .next('.button-cell')
      .contains(' archive ')
      .clickAttached();

    cy.get('.cdk-overlay-container confirmation-dialog ui-button[type=warning').click();

    cy.get('.cdk-overlay-container simple-snack-bar > span').should(
      'contain',
      'There is billing profile which is splitted by cost center. You must first change split type on billing profile.'
    );

    cy.waitForAngular();
  });
});
